# Отчёт по итерации 1

Дата сборки: 2026-11-22. Версия контента: `2026.11.22-it1`.

## Исходные файлы из ТЗ
| Файл | Статус |
|---|---|
| vocab-app (ZIP) | использован: дизайн, механика 6 уровней и итоговой проверки, перенос прогресса |
| Building_Effective_AI_Agents_123_out_of_123.html | использован: та же словарная механика; словарь из 123 терминов сохранён (исправлены испорченные clozeAnswers) |
| `Тренировошная 50 out of 50.html` | **не предоставлен**; механика перенесена по версии на 123 слова, итоговая проверка 50/50 работает для наборов по 50 |
| `Case-Based Multiple-Choice Questions(1).md` | **не предоставлен**; кейсы составлены по описанию в ТЗ |
| `Вставленный Markdown(...).md` (система времён) | **не предоставлен**; теория времён написана заново по описанной структуре |

## Покрытие контента (вывод `node tools/validate.mjs`)
```
модуль | уроков | теория | практика в банке | вопросов в контроле | покрытие
tenses | 10 | 30 | 86 | 26 | 10/10 уроков
irregular | 9 | 24 | 388 | 26 | 9/9 уроков
modals | 9 | 27 | 80 | 26 | 9/9 уроков
conditionals | 9 | 27 | 80 | 26 | 9/9 уроков
theory | — | 108 в банке | 54 | Theory Check: итоговый тест по теории
cases | — | 68 в банке | 34 | Контрольная Case Lab
mixed | — | 108+290+68 в банке | 40 | Смешанный экзамен B2 → C1
словарь general | 200 слов | наборов 4
словарь business | 100 слов | наборов 2
словарь irregular | 120 слов | наборов 3
словарь agents | 123 слов | наборов 1
Case Lab по форматам: {"single":18,"multi":10,"match":10,"order":10,"fix":10,"branch":10} всего 68

Ошибок: 0, предупреждений: 0
```
Банк контрольной каждого блока превышает её длину в 3–15 раз. Theory Check выбирает 54 из 108 вопросов, минимум по 6 на блок. Case Lab — 34 из 68, все 6 форматов, минимум 3 на формат.

## Выполненные проверки

### 1. Автоматический валидатор: 0 ошибок, 0 предупреждений
Проверяется:
- уникальность ID и отсутствие дубликатов заданий;
- ровно 1 верный ответ в single и 2–3 в multi;
- объяснение у каждого варианта и тег причины у каждого дистрактора;
- контрпример у каждого теоретического вопроса;
- контекст у кейсов;
- реальное ветвление и длина траекторий 3–5 шагов в branch;
- правила ввода не помечают допустимый ответ как ошибку;
- минимумы по блокам (уроки ≥ 8, теория ≥ 20 для крупных блоков, практика ≥ 80 для крупных);
- 3–5 мини-проверок на урок;
- банк каждого теста не меньше 2× его длины;
- однозначность RU-подсказок в каждом словаре и `wrongRussian ≠ russian`.

### 2. Unit-тесты: `node --test tests/*.test.mjs` — 23/23 пройдены
```
ok 1 - content validator: no errors on the shipped bank
ok 2 - scoring: case single — correct option and annotated distractor tag
ok 3 - scoring: case multi — full set only, no 'select all' credit
ok 4 - scoring: matching — every mapping checked
ok 5 - scoring: ordering — canonical order, alternatives, partial prefix
ok 6 - scoring: hotspot — segment + correction, classification of misses
ok 7 - scoring: branching — trajectory scored against best path, real branching
ok 8 - scoring: typed answers — contractions, spelling slip, rule-based tags, raw text kept
ok 9 - exam: no duplicate questionIds, blueprint size and balance
ok 10 - exam: consecutive attempts differ substantially (fresh questions first)
ok 11 - exam: finish() scores from the snapshot and emits one event per question
ok 12 - learning: wrong answers are requeued once, 3–5 items later
ok 13 - CSV: BOM, quotes, commas, newlines, apostrophes, Cyrillic, formula guard
ok 14 - CSV: four exports are produced from real events and match analytics
ok 15 - JSON backup: validation rejects broken files and accepts real dumps
ok 16 - mastery: re-answering the same question cannot inflate accuracy
ok 17 - streak counts consecutive active days only
ok 18 - norm keeps meaning-relevant text and strips punctuation/case
ok 19 - migration v1 creates all stores and is idempotent on reopen
ok 20 - progress survives closing and reopening the database (app restart)
ok 21 - finishing an exam is atomic: attempt + events + exposure saved, session removed
ok 22 - JSON backup round-trip: export → validate → import into a fresh database
ok 23 - legacy vocab-app progress is migrated with remapped ids
```

### 3. Браузерные сценарии (Playwright, Chromium, мобильный экран 390×844, touch)
| Сценарий | Результат |
|---|---|
| Все 5 вкладок открываются без ошибок в консоли | ✔ |
| Урок → мини-проверка: разбор сразу после ответа; урок отмечен пройденным в IndexedDB | ✔ |
| Неверный выбор в Learning Mode подсвечивается красным, верный — зелёным | ✔ |
| Exam Mode: после 5 ответов нет ни объяснений, ни подсветки верных вариантов | ✔ |
| Перезагрузка страницы посреди экзамена: на «Сегодня» есть «Продолжить», восстановлено 5/26 ответов | ✔ |
| Завершение → результат, карта причин, слабые темы, разбор каждого вопроса | ✔ |
| Ретест: пересечение с предыдущей попыткой — 0 из 26 вопросов | ✔ |
| Контрольная Case Lab, 34 задания, все 6 форматов, включая ветвление: ответы без подсказок, после завершения — пошаговый разбор траектории | ✔ |
| Уровень словаря «Выбери перевод»: события записываются | ✔ |
| Dashboard: карта блок × причина, детализация до конкретных ответов | ✔ |
| «Экспорт CSV»: скачаны 4 файла с BOM; `answer_events` = 33 строки = 33 события в базе; сумма `error_map` совпадает с картой на экране | ✔ |
| Офлайн: после первого открытия сеть отключена → приложение, уроки, Dashboard и шрифты работают | ✔ |

## Что НЕ проверено
- Реальные iPhone и Android. Проверено в Chromium с эмуляцией мобильного экрана. Web Share с файлами (`navigator.share({files})`) в автотесте не вызывается: Chromium на Linux его не поддерживает, сработал запасной путь через Blob и скачивание. Поведение Safari на iOS нужно проверить вручную.
- Установка PWA на домашний экран и работа после перезагрузки телефона.
- Проверка английского носителем языка. Задания проверены автором и валидатором; около 35 спорных дистракторов исправлены вручную. Где проверяется британская норма, это прямо указано в задании.

## Не выполнено в этой итерации (требования ТЗ)
- Блоки 5–18 (14 блоков) отсутствуют. На маршруте «30 дней» соответствующие пункты прямо помечены как отсутствующие в сборке.
- В Case Lab 68 кейсов из требуемых 180–240; кейсы есть по 4 тематическим блокам из требуемых ≥ 8. В каждом формате 10–18 кейсов вместо 20. Контрольная Case Lab — 34 задания (требование 30–40 соблюдено).
- Theory Check охватывает 4 доступных блока, а не 18.
- Частотность General 200 не сверена с корпусом: список составлен вручную и так и помечен в приложении.
- Диктовка и проверка произношения не реализованы: надёжного офлайн-распознавания речи в браузере нет. В приложении об этом сказано прямо.
