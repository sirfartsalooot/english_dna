# Отчёт о проверках

Версия контента: `2026.11.23-v2`. Сборка: 23.11.2026.

## Исправление «вечной загрузки»
| Причина | Исправление | Проверка |
|---|---|---|
| ES-модули блокируются браузером при открытии `index.html` с диска (CORS для `file://`) | Весь код собирается esbuild в один классический скрипт `app.bundle.js` (target ES2017 / Safari 12 / Chrome 70) | Chromium, `file://` — приложение запускается |
| GitHub Pages обрабатывает сайт через Jekyll, и папка `vendor/` не публикуется (React не загружался) | Папка переименована в `lib/`, добавлен `.nojekyll` | Chromium, HTTP из подпапки (как на GitHub Pages) — приложение запускается |
| При ошибке экран навсегда оставался на «Загрузка…» | Диагностика в `index.html`: показывается, какой файл не найден | Сборка без `lib/` выдаёт «Не найден файл: …/lib/react.production.min.js» |

## Исходные файлы из ТЗ
Не были предоставлены: `Тренировошная 50 out of 50.html`, `Case-Based Multiple-Choice Questions(1).md` и Markdown по системе времён. Словарная механика перенесена по версии на 123 слова (та же механика). Теория времён и кейсы написаны по описанию в ТЗ.

## Покрытие контента (вывод `node tools/validate.mjs`)
```
модуль | уроков | теория | практика в банке | вопросов в контроле | покрытие
tenses | 10 | 30 | 86 | 26 | 10/10 уроков
irregular | 9 | 24 | 388 | 26 | 9/9 уроков
modals | 9 | 27 | 80 | 26 | 9/9 уроков
conditionals | 9 | 27 | 80 | 26 | 9/9 уроков
passive | 8 | 24 | 40 | 24 | 8/8 уроков
gerund | 8 | 24 | 42 | 24 | 8/8 уроков
articles | 8 | 24 | 80 | 24 | 8/8 уроков
prepositions | 8 | 24 | 42 | 24 | 8/8 уроков
reported | 8 | 24 | 40 | 24 | 8/8 уроков
relative | 8 | 24 | 40 | 24 | 8/8 уроков
structure | 8 | 24 | 40 | 24 | 8/8 уроков
linking | 8 | 24 | 40 | 24 | 8/8 уроков
phrasal | 8 | 24 | 40 | 24 | 8/8 уроков
collocations | 8 | 24 | 40 | 24 | 8/8 уроков
wordform | 8 | 24 | 40 | 24 | 8/8 уроков
quantifiers | 8 | 24 | 40 | 24 | 8/8 уроков
advanced | 8 | 24 | 40 | 24 | 8/8 уроков
register | 8 | 24 | 40 | 24 | 8/8 уроков
theory | — | 444 в банке | 60 | Theory Check: итоговый тест по теории
cases | — | 182 в банке | 40 | Контрольная Case Lab
mixed | — | 444+894+182 в банке | 40 | Смешанный экзамен B2 → C1
словарь general | 200 слов | наборов 4
словарь business | 100 слов | наборов 2
словарь irregular | 120 слов | наборов 3
словарь agents | 123 слов | наборов 1
Case Lab по форматам: {"single":40,"multi":30,"match":30,"order":30,"fix":30,"branch":22} всего 182

Ошибок: 0, предупреждений: 0
```
Блоки 1, 3, 4 и 7 считаются крупными: в них ≥ 80 практических заданий и ≥ 20 теоретических вопросов. Банк каждой контрольной больше её длины минимум в 1,7 раза: 40 практических заданий на 18 мест в тесте. Для общих тестов банк больше ≥ 2×.

## 1. Валидатор контента: 0 ошибок, 0 предупреждений
Проверяется:
- уникальность ID и отсутствие дублей;
- ключи ответов: 1 верный в single, 2–3 в multi;
- объяснение у каждого варианта и тег причины у каждого дистрактора;
- контрпример у каждого теоретического вопроса;
- контекст кейсов (не менее двух предложений);
- в ветвящихся сценариях — реальное ветвление и траектории длиной 3–5 шагов;
- правила ввода не помечают допустимый ответ как ошибку;
- минимумы блоков: 8 уроков, 3–5 мини-проверок на урок, ≥ 40 практических заданий;
- достаточность банков для каждого теста;
- однозначность подсказок RU→EN в словарях.

## 2. Unit-тесты: 23 из 23 пройдены (`node --test tests/*.test.mjs`)
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
Дополнительно в тесте контрольных проверяется: 18 блоков на месте, банк Case Lab в пределах 180–240, в каждом формате ≥ 20 заданий, контрольная Case Lab охватывает ≥ 8 тематических блоков, Theory Check — все 18.

## 3. Браузерные сценарии (Playwright, Chromium, экран 390×844, touch)
| Сценарий | Результат |
|---|---|
| Запуск `index.html` с диска и из подпапки по HTTP | ✔ |
| Нет файлов `lib/` → понятное сообщение об ошибке | ✔ |
| Урок → мини-проверка (Learning Mode): разбор сразу; урок отмечен пройденным в IndexedDB | ✔ |
| Неверный ответ в Learning Mode подсвечен красным | ✔ |
| Exam Mode: во время теста нет объяснений и подсветки | ✔ |
| Перезагрузка посреди экзамена → «Продолжить», восстановлено 5 из 26 ответов | ✔ |
| Ретест: пересечение с прошлой попыткой — 0 из 26 вопросов | ✔ |
| Контрольная Case Lab: 40 заданий, все 6 форматов, пошаговый разбор ветвления после завершения | ✔ |
| Курс показывает 18 блоков; урок блока 18 и его мини-проверка проходят | ✔ |
| Theory Check: 60 вопросов из всех 18 блоков, завершение и результат | ✔ |
| Уровень словаря: события записываются | ✔ |
| Dashboard: карта блок × причина, разбор ячейки до ответов | ✔ |
| Экспорт: 4 CSV с BOM; число строк = числу событий; сумма `error_map` = карте на экране | ✔ |
| Офлайн после первого открытия: приложение, уроки, Dashboard, шрифты | ✔ |
| Ошибок в консоли | 0 |

## Что не проверено
- **Реальные iPhone и Android.** Safari (WebKit) в среде тестирования недоступен. Синтаксис бандла приведён к уровню Safari 12, но запуск на iPhone нужно проверить вручную. Отправка файлов через меню «Поделиться» в Chromium на Linux не вызывается — сработало запасное скачивание.
- **Языковая проверка носителем.** Задания проверены автором и валидатором; около 60 спорных дистракторов заменены вручную. Где проверяется британская норма, это указано в задании.
- **Частотность General 200.** Список составлен вручную и так и помечен в приложении.
- **Произношение.** Диктовка и проверка произношения не реализованы: надёжного офлайн-распознавания речи в браузере нет. В приложении это сказано прямо.
