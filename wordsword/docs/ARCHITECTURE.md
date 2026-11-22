# Архитектура

```
index.html, manifest.webmanifest, sw.js (генерируется tools/build.mjs), icons/, vendor/ (React, ReactDOM, htm, шрифты)
src/content/   — ТОЛЬКО данные: blocks/*.js (уроки + вопросы), vocab/*.js, cases/*.js, plan30.js, index.js (реестр, blueprints)
src/engine/    — логика без DOM (тестируется в Node):
   util.js      нормализация, ISO-недели, PRNG, Левенштейн
   scoring.js   оценка 7 форматов, таксономия причин ошибок, классификация ввода
   selector.js  сбалансированная выборка с приоритетом невиданных вопросов
   exam.js      попытки Exam Mode, сессии Learning Mode, события ответов
   analytics.js карта ошибок, топ-проблемы, динамика, mastery, статистика словарей
   csv.js       4 CSV + проверка резервной копии JSON
   db.js        IndexedDB + миграции; store.js — API сохранения и перенос из старого vocab-app
   validate.js  валидатор контента
src/ui/        — экраны (React + htm): core, question, course, exam, vocab, dashboard, today; src/main.js — роутер и контекст
tests/         — node:test (engine, storage на fake-indexeddb) и e2e (Playwright)
```

Вопросы не «зашиты» в компоненты: экраны получают объект вопроса и отрисовывают его по `type`. Оценка ответа не знает ничего о конкретных вопросах.

## Схемы (JSDoc)

```js
/** @typedef {{
 *  id:string, v:number, module:string, sub:string, lesson:string, kind:'theory'|'practice'|'case',
 *  type:'single'|'multi'|'input'|'match'|'order'|'fix'|'branch', level:'B2'|'C1', diff:1|2|3, goal:string,
 *  prompt:string, ctx?:string, explain:string, ce?:string, tag?:ErrorTag, note?:string,
 *  options?:{t:string, ok?:true, why:string, tag?:ErrorTag}[],          // single, multi
 *  accept?:string[], rules?:[string|string[], ErrorTag, string][],        // input
 *  cats?:string[], items?:{t:string, cat:number, tag?:ErrorTag}[],       // match
 *  tokens?:string[], alts?:string[],                                       // order (tokens в верном порядке)
 *  segments?:{t:string, bad?:true, fix?:string[], tag?:ErrorTag}[],      // fix
 *  start?:string, pass?:number, nodes?:Record<string,{text:string, choices:{t,pts,next|null,fb,tag?}[]}> // branch
 * }} Question */
/** @typedef {{id,english,russian,testPrompt,acceptedEnglishAnswers:string[],acceptedRussianAnswers?:string[],
 *  exampleSentence:string /* с [[цель]] *\/, exampleTranslation, category, group:string|null, wrongRussian, clozeAnswers:string[],
 *  v1?,v2?:string[],v3?:string[], collocations?:string[], usageNotes?, level, tags:string[], irregularId?}} VocabularyEntry */
/** @typedef {{id,title,goal,body:Block[],checkIds:string[]}} Lesson  // Block: p|h|f|tip|warn|tb|ex|tl */
/** @typedef {{id,testId,title,kind,mode:'exam',contentVersion,startedAt,finishedAt,durationMs,
 *  items:{qid,v,perm}[], snapshot:Record<qid,Question>, responses, timeSpent, results, score,total,pct}} Attempt */
/** @typedef {{id,attemptId,testId,questionId,questionVersion,moduleId,subtopicId,lessonId,kind,format,level,difficulty,
 *  mode:'learning'|'exam', ts:number, timestamp:string /*ISO UTC*\/, userAnswer /*сырой текст*\/, userAnswerNorm, correctAnswer,
 *  isCorrect, score, timeSpentMs, errorTags:ErrorTag[], explanationId, firstAttempt, retry}} AnswerEvent */
/** @typedef {{n:number, ok:number, firstOk:boolean, last:number}} MasteryRecord  // kv "qstats"[questionId] */
```

`ErrorTag`: MEANING, FORM, TIMELINE, AUXILIARY, AGREEMENT, MODALITY, STRUCTURE, ARTICLE_DETERMINER, PREPOSITION, VOCAB_MEANING, COLLOCATION, REGISTER, SPELLING, THEORY, CONTEXT, UNCLASSIFIED.

## Хранилище (IndexedDB `wordsword`, схема v1)

| Store | Содержимое |
|---|---|
| `kv` | `meta`, `prefs`, `course` (уроки, маршрут), `qstats`, `exposure` (сколько раз вопрос показан в каждом тесте), `vocab:<set>`, `vocabfull:<dict>` |
| `attempts` | завершённые попытки со снимком вопросов |
| `events` | все ответы (индексы `attemptId`, `ts`) |
| `sessions` | незавершённые экзамены и тренировки |

Миграции — функции `MIGRATIONS[n]`; они только добавляют структуры и ничего не удаляют. Версия банка (`CONTENT_VERSION`) не связана с версией БД: при изменении вопросов старые попытки воспроизводятся из своего снимка.

## Правила, важные для честной аналитики
- **Mastery** учитывает только первый ответ на каждый вопрос (`qstats.firstOk`). Повторы видны в `retry`, но процент не повышают.
- **Причина ошибки:**
  - для выбора — из разметки выбранного дистрактора;
  - для ввода — сначала по явным правилам, затем по близости к правильному ответу (`SPELLING`);
  - иначе — `UNCLASSIFIED`.
- **Exam Mode:** вопросы не повторяются (тест это проверяет), подсказок нет, ответы можно менять, а сессия сохраняется после каждого действия.
