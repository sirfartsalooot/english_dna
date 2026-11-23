// Case-based tasks, part B: ordering/sequencing, error hotspot, branching scenarios.
import { O, FX } from "../dsl.js";
const C = (module, ctx, extra = {}) => Object.assign({ kind: "case", module, ctx }, extra);

export const CASES_B = [
// ---------- Ordering / Sequencing ----------
O("co-01 ten-pastperf 2 B2", "Расположите события в реальном хронологическом порядке (сначала самое раннее).",
  ["The bug was reported by a client", "The developers fixed the bug", "The release was approved", "The manager announced the release"],
  "В тексте события упомянуты не по порядку: had reported → had fixed → approved → announced. Past Perfect указывает на более ранние события.", "TIMELINE", [],
  C("tenses", "From a project log: «When the manager announced the release on Friday, the release had been approved that morning. The developers had fixed the bug that a client had reported on Monday.»")),
O("co-02 ten-sys 2 B2", "Соберите вопрос, который нужно отправить в чат.", ["How", "long", "have", "you", "been", "working", "on", "the", "migration", "?"],
  "How long + have + подлежащее + been + V-ing + остальное.", "STRUCTURE", [],
  C("tenses", "You want to ask a new contractor about the duration of their work on the data migration so far. The work is still in progress.")),
O("co-03 cond-third 2 B2", "Соберите предложение для ретроспективы.", ["If", "we", "had", "involved", "legal", "earlier,", "we", "wouldn't", "have", "missed", "the", "deadline"],
  "Third conditional: If + had + V3, would(n't) + have + V3.", "STRUCTURE", ["we wouldn't have missed the deadline If we had involved legal earlier,"],
  C("conditionals", "Last month the contract review was delayed because the legal team saw it only two days before the deadline. In the retrospective you want to state what would have changed the outcome.")),
O("co-04 mod-deduction-past 2 C1", "Соберите вывод о произошедшем.", ["The", "courier", "must", "have", "come", "while", "we", "were", "at", "lunch"],
  "Must have + V3 — уверенный вывод; while + Past Continuous — фон.", "STRUCTURE", ["While we were at lunch the courier must have come"],
  C("modals", "You returned from lunch and found a parcel at reception with today's delivery note. Nobody remembers seeing the courier. You are explaining to your colleague what happened.")),
O("co-05 cond-inversion 3 C1", "Соберите формальную фразу для письма клиенту.", ["Should", "you", "have", "any", "questions,", "please", "do", "not", "hesitate", "to", "contact", "us"],
  "Should + подлежащее + V1 в начале — формальная инверсия условия.", "STRUCTURE", [],
  C("conditionals", "You are finishing a formal email to a new corporate client. You want to end with the standard offer of further help.")),
O("co-06 ten-future 2 B2", "Расположите действия в порядке выполнения согласно письму (сначала первое).",
  ["Finish the internal review", "Send the draft to the client", "Receive the client's comments", "Sign the final version"],
  "«By the time the client sends comments, we will have sent the draft; we'll sign once the comments have been received; the draft goes out after the internal review is finished.» — хронология определяется формами, а не порядком в тексте.", "TIMELINE", [],
  C("tenses", "From a planning email: «We'll sign the final version once we've received the client's comments. By the time they send their comments, we'll have sent them the draft, which will go out as soon as the internal review is finished.»")),
O("co-07 irr-roles 2 B2", "Соберите предложение для пресс-релиза.", ["The", "new", "office", "was", "built", "in", "just", "eight", "months"],
  "Пассив Past Simple: was + V3 (built).", "STRUCTURE", ["The new office was built in just eight months"],
  C("irregular", "Your company opened a new office today. The construction company finished the building in eight months. The press release should focus on the office, not on the builders.")),
O("co-08 mod-obligation 2 B2", "Соберите вопрос в правильном порядке.", ["Do", "we", "have", "to", "bring", "our", "own", "laptops", "?"],
  "Have to — обычный глагол: Do + подлежащее + have to + V1.", "AUXILIARY", [],
  C("modals", "You are going to an external training workshop next week. The invitation doesn't say whether participants get computers there. You are writing to the organiser.")),
O("co-09 ten-sys 3 C1", "Расположите шаги построения формы в правильной логике.",
  ["Определить время точки отсчёта (прошлое)", "Определить аспект (процесс до точки → Perfect Continuous)", "Выбрать первый вспомогательный (had)", "Добавить been + V-ing (had been waiting)"],
  "Сначала время и аспект, затем первый вспомогательный (он несёт время), затем аспектная часть.", "THEORY", [],
  C("tenses", "You want to say in English: «К тому времени, как пришёл ответ, мы ждали уже две недели.» You build the verb form step by step.")),
O("co-10 cond-wish 2 C1", "Соберите сожаление о прошлом решении.", ["I", "wish", "we", "hadn't", "agreed", "to", "such", "a", "tight", "deadline"],
  "Wish + Past Perfect — сожаление о прошлом.", "STRUCTURE", [],
  C("conditionals", "Three weeks ago your team accepted a very short deadline from a client. Now everyone is working late. You share your feelings with a teammate.")),
// ---------- Error Debugging / Hotspot ----------
FX("cf-01 ten-pp 2 B2", "В письме ровно одна грамматическая ошибка. Нажмите на ошибочный фрагмент и введите исправление.",
  ["Dear Ms Lee,", "thank you for your message.", { t: "We have received", fix: ["We received"], tag: "TIMELINE" }, "your order on 12 March", "and it is now being processed."],
  "Точная дата (on 12 March) → Past Simple: We received your order on 12 March.", C("tenses", "A customer service email confirming an order. The order arrived on 12 March and is still being processed.")),
FX("cf-02 ten-timecl 2 B2", "Найдите и исправьте ошибку в сообщении.",
  ["Hi team,", "I'll share the slides", { t: "as soon as I will get", fix: ["as soon as I get"], tag: "FORM" }, "the final numbers", "from finance."],
  "Придаточное времени: as soon as + Present Simple.", C("tenses", "A project manager posts in Slack the day before a presentation. The slides depend on numbers that finance hasn't sent yet.")),
FX("cf-03 mod-obligation 2 B2", "Найдите и исправьте ошибку в памятке.",
  ["Guests", "must wear a badge at all times.", "They", { t: "mustn't", fix: ["don't have to", "do not have to", "needn't", "don't need to", "do not need to"], tag: "MODALITY" }, "sign the NDA,", "but it is recommended."],
  "NDA необязательно, но рекомендуется → don't have to / needn't, а не запрет.", C("modals", "A welcome note for office visitors. Rule: a badge is compulsory; the NDA is optional but recommended.")),
FX("cf-04 cond-third 2 B2", "Найдите и исправьте ошибку в отчёте.",
  ["If the supplier", { t: "would have delivered", fix: ["had delivered"], tag: "FORM" }, "on time,", "we would have met", "the launch date."],
  "В if-части третьего типа — Past Perfect.", C("conditionals", "This is a short post-mortem paragraph about a delayed launch. The delay was caused by a late delivery from a supplier.")),
FX("cf-05 irr-abc 1 B2", "Найдите и исправьте ошибку в протоколе встречи.",
  ["The board", "has", { t: "chose", fix: ["chosen"], tag: "FORM" }, "a new auditor,", "and the contract will be signed next week."],
  "Has + V3: choose — chose — chosen.", C("irregular", "These are the minutes of a board meeting. They were prepared by a junior assistant and need checking before they are circulated.")),
FX("cf-06 mod-deduction-present 2 C1", "Найдите и исправьте ошибку в сообщении.",
  ["The server room is locked", "and the lights are off,", "so Ivan", { t: "mustn't be", fix: ["can't be", "cannot be", "couldn't be"], tag: "MODALITY" }, "there."],
  "Вывод «нет» → can't be; mustn't — запрет.", C("modals", "A colleague is looking for the sysadmin. You send a quick message explaining where he can't be.")),
FX("cf-07 ten-stative 2 B2", "Найдите и исправьте ошибку.",
  ["Thanks for the update.", { t: "I'm understanding", fix: ["I understand"], tag: "FORM" }, "the risks,", "but I still think", "we should go ahead."],
  "Understand — стативный глагол: I understand.", C("tenses", "A manager replies to a risk report from the project team. She accepts the risks but wants to continue.")),
FX("cf-08 cond-unless 2 B2", "Найдите и исправьте ошибку в условиях акции.",
  ["The discount applies to all orders", { t: "unless you don't use", fix: ["unless you use", "if you don't use", "if you do not use"], tag: "MEANING" }, "a promo code", "from another campaign."],
  "Unless уже значит «если не» — двойное отрицание искажает смысл. Скидка не действует, если используется другой промокод.", C("conditionals", "These are the terms of a sales promotion. The discount does not work together with promo codes from other campaigns.")),
FX("cf-09 ten-pastperf 3 C1", "Найдите и исправьте ошибку в отчёте об инциденте.",
  ["When IT arrived,", "the hard drive", { t: "already failed", fix: ["had already failed"], tag: "TIMELINE" }, "and the backup", "had not been updated for a week."],
  "Отказ диска произошёл раньше прихода ИТ → Past Perfect: had already failed.", C("tenses", "An incident report written the next day. The hard drive stopped working before IT staff came.")),
FX("cf-10 mod-perfect-crit 2 B2", "Найдите и исправьте ошибку в письме.",
  ["I'm sorry about the confusion —", "I", { t: "should of", fix: ["should have"], tag: "SPELLING" }, "double-checked", "the time zone."],
  "Should have + V3; «should of» — ошибка написания на слух.", C("modals", "Clients joined a webinar at the wrong time because of a time-zone mistake. You are writing an apology email.")),
// ---------- Branching scenarios (real branching, 3 steps; feedback per choice) ----------
{ id: "cb-01", v: 1, kind: "case", type: "branch", module: "tenses", sub: "ten-pp", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "TIMELINE",
  prompt: "Ответьте клиенту в чате поддержки. Каждый ответ влияет на следующий шаг.",
  ctx: "A client writes to support: «My payment didn't go through. What's going on?» The system shows that the payment failed at 10:03 today because of a bank timeout. Your colleague restarted the gateway at 10:20, and payments are working again now.",
  explain: "Лучшая траектория: сообщить результат (Present Perfect), затем детали с точным временем (Past Simple), затем реальное условие о будущем (first conditional).",
  nodes: {
    a: { text: "Ваше первое сообщение клиенту:", choices: [
      { t: "«I'm sorry about that. The issue has been fixed, and payments are working again.»", pts: 2, next: "b1", fb: "Отлично: результат, важный сейчас → Present Perfect (passive)." },
      { t: "«I'm sorry about that. The issue was fixed, and payments are working again.»", pts: 1, next: "b1", fb: "Грамматически возможно (особенно в AmE), но без указания времени новость о результате естественнее передать Present Perfect.", tag: "TIMELINE" },
      { t: "«I'm sorry about that. The issue had been fixed.»", pts: 0, next: "b2", fb: "Past Perfect без прошлой точки отсчёта сбивает клиента: «к какому моменту?»", tag: "TIMELINE" } ] },
    b1: { text: "Клиент: «OK, but what happened exactly?» Ваш ответ:", choices: [
      { t: "«Your payment failed at 10:03 because of a bank timeout. We restarted the gateway at 10:20.»", pts: 2, next: "c", fb: "Точное время → Past Simple. Хронология ясна." },
      { t: "«Your payment has failed at 10:03 because of a bank timeout.»", pts: 0, next: "c", fb: "Present Perfect несовместим с точным временем 10:03.", tag: "TIMELINE" },
      { t: "«Your payment was failing at 10:03 because of a bank timeout.»", pts: 1, next: "c", fb: "Continuous делает разовую неудачу процессом — неточно.", tag: "MEANING" } ] },
    b2: { text: "Клиент: «Had been fixed? Before what? Is it working now or not?» Ваш ответ:", choices: [
      { t: "«Sorry for the confusion — it's working now. It was fixed at 10:20.»", pts: 2, next: "c", fb: "Вы исправили ситуацию: состояние сейчас + точное время в Past Simple." },
      { t: "«It had been fixed at 10:20.»", pts: 0, next: "c", fb: "Повтор той же ошибки: Past Perfect без точки отсчёта.", tag: "TIMELINE" } ] },
    c: { text: "Клиент: «Should I try again now or wait?» Ваш ответ:", choices: [
      { t: "«Please try again now. If it fails, I'll escalate it to the payments team straight away.»", pts: 2, next: null, fb: "First conditional: реальная возможность в будущем." },
      { t: "«Please try again now. If it will fail, I'll escalate it.»", pts: 0, next: null, fb: "Will в if-части недопустим.", tag: "FORM" },
      { t: "«Please try again now. If it failed, I would escalate it.»", pts: 1, next: null, fb: "Second conditional звучит так, будто неудача маловероятна/гипотетична — менее уместно для поддержки.", tag: "MODALITY" } ] }
  } },
{ id: "cb-02", v: 1, kind: "case", type: "branch", module: "modals", sub: "mod-obligation", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "MODALITY",
  prompt: "Объясните новому сотруднику правила удалённой работы.",
  ctx: "Company rules: Remote work is allowed up to 3 days a week. Using public Wi-Fi without the VPN is forbidden. Cameras are optional in internal meetings but required in client meetings. A new employee messages you with questions.",
  explain: "Ключ — различать обязанность (must/have to), запрет (mustn't) и отсутствие необходимости (don't have to).",
  nodes: {
    a: { text: "Новичок: «Can I work from a café?» Ваш ответ:", choices: [
      { t: "«Yes, but you mustn't use public Wi-Fi without the VPN.»", pts: 2, next: "b", fb: "Запрет → mustn't." },
      { t: "«Yes, but you don't have to use public Wi-Fi without the VPN.»", pts: 0, next: "b_fix", fb: "Don't have to = «не обязательно» — правило звучит как необязательное, хотя это запрет.", tag: "MODALITY" },
      { t: "«Yes, but you needn't use public Wi-Fi without the VPN.»", pts: 0, next: "b_fix", fb: "Needn't = нет необходимости; это не запрет.", tag: "MODALITY" } ] },
    b_fix: { text: "Новичок: «So it's fine to skip the VPN sometimes?» Ваш ответ:", choices: [
      { t: "«No — sorry, I put it badly. It's not allowed: you mustn't use public Wi-Fi without the VPN.»", pts: 1, next: "b", fb: "Хорошо, что вы исправились: mustn't = запрет." },
      { t: "«Yes, it's up to you.»", pts: 0, next: "b", fb: "Это нарушает правило безопасности.", tag: "CONTEXT" } ] },
    b: { text: "Новичок: «Do I need to turn my camera on in team meetings?» Ваш ответ:", choices: [
      { t: "«You don't have to in internal meetings, but you have to in client meetings.»", pts: 2, next: "c", fb: "Точно передано: необязательно / обязательно." },
      { t: "«You mustn't in internal meetings, but you have to in client meetings.»", pts: 0, next: "c", fb: "Mustn't — запрет; камеру включать можно.", tag: "MODALITY" },
      { t: "«You must in all meetings.»", pts: 0, next: "c", fb: "Противоречит правилу: во внутренних — по желанию.", tag: "CONTEXT" } ] },
    c: { text: "Новичок: «How many days can I work remotely?» Ваш ответ:", choices: [
      { t: "«You can work remotely up to three days a week.»", pts: 2, next: null, fb: "Can — разрешение в пределах правила." },
      { t: "«You have to work remotely three days a week.»", pts: 0, next: null, fb: "Have to превращает разрешение в обязанность.", tag: "MODALITY" },
      { t: "«You might work remotely three days a week.»", pts: 1, next: null, fb: "Might звучит как предположение, а не как правило.", tag: "MODALITY" } ] }
  } },
{ id: "cb-03", v: 1, kind: "case", type: "branch", module: "conditionals", sub: "cond-zero-first", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "CONTEXT",
  prompt: "Проведите переговоры о сроках с поставщиком по почте.",
  ctx: "Your supplier says they can deliver in 6 weeks. You need delivery in 4 weeks. You are ready to pay 5% more for faster delivery, but only if the date is guaranteed in the contract. Last year this supplier missed a deadline.",
  explain: "Реальные условия (first conditional, provided that) для предложений, second conditional — для мягкой гипотезы, third — только о прошлом.",
  nodes: {
    a: { text: "Ваше предложение поставщику:", choices: [
      { t: "«We can pay 5% more provided that the four-week date is guaranteed in the contract.»", pts: 2, next: "b1", fb: "Чёткая оговорка-условие → provided that." },
      { t: "«We could pay 5% more if you delivered in four weeks.»", pts: 1, next: "b2", fb: "Мягкая гипотеза (second) — вежливо, но без ключевого условия о гарантии в договоре.", tag: "CONTEXT" },
      { t: "«We would have paid 5% more if you had delivered in four weeks.»", pts: 0, next: "b2", fb: "Third conditional — о прошлом; это звучит как упрёк за несостоявшееся.", tag: "TIMELINE" } ] },
    b1: { text: "Поставщик: «Four weeks is tight. What happens if we're late?» Ваш ответ:", choices: [
      { t: "«If the delivery is late, the 5% premium won't apply.»", pts: 2, next: "c", fb: "First conditional — реальное последствие." },
      { t: "«If the delivery will be late, the premium won't apply.»", pts: 0, next: "c", fb: "Will в if-части недопустим.", tag: "FORM" } ] },
    b2: { text: "Поставщик: «We'll try, but we can't promise.» Ваш ответ:", choices: [
      { t: "«Then we'll need the date in writing; otherwise we'll stay with the six-week schedule.»", pts: 2, next: "c", fb: "Вы вернули ключевое условие (гарантия в договоре); otherwise = иначе." },
      { t: "«OK, we'll pay 5% more anyway.»", pts: 0, next: "c", fb: "Вы отказались от главного условия кейса.", tag: "CONTEXT" } ] },
    c: { text: "Последнее письмо: вы хотите учесть прошлый опыт без резкости.", choices: [
      { t: "«Given what happened last year, it would help to have a penalty clause in case of delays.»", pts: 2, next: null, fb: "In case of — мера предосторожности; would help — дипломатично." },
      { t: "«If you hadn't missed the deadline last year, we wouldn't ask for a penalty clause now.»", pts: 1, next: null, fb: "Грамматически верно (mixed), но звучит как упрёк.", tag: "REGISTER" },
      { t: "«Unless you miss the deadline, we will add a penalty clause.»", pts: 0, next: null, fb: "Смысл обратный: штраф без нарушения.", tag: "MEANING" } ] }
  } },
{ id: "cb-04", v: 1, kind: "case", type: "branch", module: "modals", sub: "mod-deduction-present", level: "C1", diff: 3, start: "a", pass: 0.8, tag: "MODALITY",
  prompt: "Разберитесь со сбоем и сообщите команде выводы правильной степени уверенности.",
  ctx: "At 9:00 the dashboard stops showing new orders. The database is running. The last data import log ends with «timeout» at 8:55. Nobody has changed the dashboard settings this week, according to the change log.",
  explain: "Степень уверенности выражается must / might / can't в соответствии с силой доказательств.",
  nodes: {
    a: { text: "Ваше первое сообщение в чат команды:", choices: [
      { t: "«The import must have failed — the log ends with a timeout at 8:55.»", pts: 2, next: "b", fb: "Сильный признак → must have + V3." },
      { t: "«The import might fail.»", pts: 0, next: "b", fb: "Будущее время для уже произошедшего события.", tag: "TIMELINE" },
      { t: "«The import had to fail.»", pts: 0, next: "b", fb: "Had to — обязанность.", tag: "MODALITY" } ] },
    b: { text: "Коллега: «Could it be the dashboard settings?» Ваш ответ:", choices: [
      { t: "«It can't be the settings — nobody has changed them this week.»", pts: 2, next: "c1", fb: "Факт исключает вариант → can't." },
      { t: "«It mustn't be the settings.»", pts: 0, next: "c2", fb: "Mustn't — запрет, не вывод.", tag: "MODALITY" },
      { t: "«It must be the settings.»", pts: 0, next: "c2", fb: "Противоречит журналу изменений.", tag: "CONTEXT" } ] },
    c1: { text: "Руководитель: «When will it be fixed?» Вы не знаете точно; перезапуск импорта занимает около 20 минут.", choices: [
      { t: "«We should have it running again by 9:30, provided the restart works.»", pts: 2, next: null, fb: "Should = ожидание + оговорка provided." },
      { t: "«It must be fixed by 9:30.»", pts: 0, next: null, fb: "Must звучит как категорическая уверенность или требование.", tag: "MODALITY" },
      { t: "«It will have been fixed by 9:30 for sure.»", pts: 1, next: null, fb: "Future Perfect верен грамматически, но «for sure» обещает больше, чем вы знаете.", tag: "MODALITY" } ] },
    c2: { text: "Коллега проверил настройки: «Settings are fine.» Как вы скорректируете вывод?", choices: [
      { t: "«Right, then it must be the import timeout.»", pts: 1, next: null, fb: "Вы вернулись к обоснованному выводу." },
      { t: "«Then it can't be anything.»", pts: 0, next: null, fb: "Вывод противоречит признакам (timeout в логе).", tag: "CONTEXT" } ] }
  } },
{ id: "cb-05", v: 1, kind: "case", type: "branch", module: "tenses", sub: "ten-future", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "MEANING",
  prompt: "Спланируйте встречу с коллегой из другого офиса.",
  ctx: "You have a confirmed client meeting on Thursday at 11:00. Your train to Kazan leaves at 16:40 on Friday (it's on the official timetable). You are free on Thursday afternoon. A colleague from Berlin asks when you can meet online.",
  explain: "Договорённость → Present Continuous; расписание → Present Simple; спонтанное решение → will; процесс в точке будущего → Future Continuous.",
  nodes: {
    a: { text: "Коллега: «Are you free on Thursday morning?» Ваш ответ:", choices: [
      { t: "«Sorry, I'm meeting a client at 11.»", pts: 2, next: "b", fb: "Договорённость → Present Continuous." },
      { t: "«Sorry, I'll meet a client at 11.»", pts: 1, next: "b", fb: "Will звучит как решение сейчас, а встреча уже назначена.", tag: "MEANING" },
      { t: "«Sorry, I meet a client at 11.»", pts: 0, next: "a_fix", fb: "Present Simple — для расписаний, не для личных встреч.", tag: "MEANING" } ] },
    a_fix: { text: "Коллега: «Every Thursday? Is that a regular slot?» Ваш ответ:", choices: [
      { t: "«No, just this Thursday — I'm meeting a new client.»", pts: 1, next: "b", fb: "Вы исправили неоднозначность: разовая договорённость → Present Continuous." },
      { t: "«Yes, I meet him.»", pts: 0, next: "b", fb: "Ответ вводит коллегу в заблуждение: встреча разовая.", tag: "CONTEXT" } ] },
    b: { text: "Коллега: «What about Friday at 5 p.m.?» Ваш ответ:", choices: [
      { t: "«I'll be travelling then — my train leaves at 16:40.»", pts: 2, next: "c", fb: "Процесс в точке будущего → Future Continuous; расписание → Present Simple." },
      { t: "«I travel then — my train will leave at 16:40.»", pts: 0, next: "c", fb: "Формы перепутаны: процесс в момент vs расписание.", tag: "MEANING" },
      { t: "«I'll have travelled then.»", pts: 0, next: "c", fb: "Future Perfect: «уже доеду» — неверно по фактам.", tag: "TIMELINE" } ] },
    c: { text: "Коллега: «Thursday afternoon, then?» Вы принимаете решение прямо сейчас:", choices: [
      { t: "«Perfect, I'll send you an invite for 3 p.m.»", pts: 2, next: null, fb: "Спонтанное решение → will." },
      { t: "«Perfect, I'm going to send you an invite.»", pts: 1, next: null, fb: "Going to допустимо, но будто решено заранее.", tag: "MEANING" },
      { t: "«Perfect, I send you an invite.»", pts: 0, next: null, fb: "Present Simple не выражает обещание.", tag: "FORM" } ] }
  } },
{ id: "cb-06", v: 1, kind: "case", type: "branch", module: "conditionals", sub: "cond-wish", level: "C1", diff: 3, start: "a", pass: 0.8, tag: "REGISTER",
  prompt: "Дайте обратную связь коллеге после неудачной презентации — честно и дипломатично.",
  ctx: "Your colleague presented to a client yesterday. The slides were too long, and the key numbers came only at the end, so the client lost interest. Your colleague asks you for feedback. You want to be honest but supportive and focus on next time.",
  explain: "Гипотетические формы (would, if + past, could have) смягчают критику; wish + would о себе неуместно; прямые упрёки ухудшают диалог.",
  nodes: {
    a: { text: "Как вы начнёте?", choices: [
      { t: "«The content was strong. If the key numbers had come earlier, I think the client would have stayed more engaged.»", pts: 2, next: "b", fb: "Third conditional + hedging (I think) — конкретно и дипломатично." },
      { t: "«You should have put the numbers first. It was boring.»", pts: 0, next: "b_tense", fb: "Грамматически верно, но резко: «boring» оценивает человека.", tag: "REGISTER" },
      { t: "«If the key numbers would have come earlier, it would be better.»", pts: 0, next: "b", fb: "Would в if-части нестандартно.", tag: "FORM" } ] },
    b_tense: { text: "Коллега явно расстроен: «Well, I did my best.» Ваш ответ:", choices: [
      { t: "«I know, and the analysis was excellent. I just wish we had shown the numbers earlier — next time, could we start with them?»", pts: 1, next: "c", fb: "Вы смягчили тон; wish + had + V3 — корректное сожаление." },
      { t: "«Yes, but it wasn't enough.»", pts: 0, next: "c", fb: "Обострение конфликта.", tag: "REGISTER" } ] },
    b: { text: "Коллега: «Fair point. What would you do differently?»", choices: [
      { t: "«If I were you, I'd start with the three key numbers and keep the details for the appendix.»", pts: 2, next: "c", fb: "Совет через second conditional." },
      { t: "«If I am you, I will start with the numbers.»", pts: 0, next: "c", fb: "Реальное условие нелогично.", tag: "FORM" } ] },
    c: { text: "Финальная фраза:", choices: [
      { t: "«Shall we go through the next deck together on Monday?»", pts: 2, next: null, fb: "Shall we — дружелюбное предложение." },
      { t: "«I wish you would listen to feedback more often.»", pts: 0, next: null, fb: "Wish + would — раздражение, звучит как упрёк.", tag: "REGISTER" } ] }
  } },
{ id: "cb-07", v: 1, kind: "case", type: "branch", module: "irregular", sub: "irr-abc", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "FORM",
  prompt: "Отредактируйте отчёт по проекту шаг за шагом.",
  ctx: "You are editing a project report written by a junior colleague. Each step shows a sentence that may contain a verb form problem. You decide what to do.",
  explain: "После have/has/had и be — V3; в Past Simple — V2; AAA и ABA-глаголы проверяются по конструкции.",
  nodes: {
    a: { text: "«The team has wrote three prototypes.»", choices: [
      { t: "Исправить на «has written».", pts: 2, next: "b", fb: "Has + V3." },
      { t: "Исправить на «has writed».", pts: 0, next: "b", fb: "Write — неправильный.", tag: "FORM" },
      { t: "Оставить как есть.", pts: 0, next: "b", fb: "Wrote — V2, после has нужен V3.", tag: "FORM" } ] },
    b: { text: "«Costs rised in March.»", choices: [
      { t: "Исправить на «rose».", pts: 2, next: "c", fb: "Rise — rose — risen." },
      { t: "Исправить на «raised».", pts: 0, next: "c_raise", fb: "Raise требует объекта.", tag: "VOCAB_MEANING" } ] },
    c_raise: { text: "Автор возражает: «But raised is a correct verb!» Ваш ответ:", choices: [
      { t: "«It is, but it needs an object: “We raised prices”. Costs rose by themselves.»", pts: 1, next: "c", fb: "Хорошее объяснение переходности." },
      { t: "«Fine, keep raised.»", pts: 0, next: "c", fb: "Ошибка осталась.", tag: "VOCAB_MEANING" } ] },
    c: { text: "«The budget was cut by 10% and the remaining funds were spent on testing.»", choices: [
      { t: "Оставить как есть — ошибок нет.", pts: 2, next: null, fb: "Cut (AAA) и spent (ABB) — верные V3 в пассиве." },
      { t: "Исправить на «was cutted».", pts: 0, next: null, fb: "Cut — неправильный AAA.", tag: "FORM" },
      { t: "Исправить на «were spended».", pts: 0, next: null, fb: "Spend — spent.", tag: "FORM" } ] }
  } },
{ id: "cb-08", v: 1, kind: "case", type: "branch", module: "tenses", sub: "ten-pastperf", level: "C1", diff: 3, start: "a", pass: 0.8, tag: "TIMELINE",
  prompt: "Расскажите на собеседовании о трудной ситуации (метод STAR).",
  ctx: "Two years ago you joined a project that was already three months behind schedule. For six months before you joined, the team had been using a spreadsheet instead of a proper tracker. You introduced Jira, and the project finished on time.",
  explain: "Фон до точки в прошлом — Past Perfect (Continuous); последовательность ваших действий — Past Simple; связь с настоящим — Present Perfect.",
  nodes: {
    a: { text: "Ваше вступление:", choices: [
      { t: "«When I joined the project, it was already three months behind schedule.»", pts: 2, next: "b", fb: "Ясная точка отсчёта и состояние в Past Simple." },
      { t: "«When I have joined the project, it was three months behind.»", pts: 0, next: "b", fb: "Present Perfect с when о прошлом недопустим.", tag: "TIMELINE" } ] },
    b: { text: "Опишите ситуацию до вашего прихода:", choices: [
      { t: "«For six months, the team had been tracking tasks in a spreadsheet.»", pts: 2, next: "c", fb: "Длительность до точки в прошлом → Past Perfect Continuous." },
      { t: "«For six months, the team has been tracking tasks in a spreadsheet.»", pts: 0, next: "c_fix", fb: "Present Perfect Continuous переносит действие в «сейчас».", tag: "TIMELINE" },
      { t: "«For six months, the team was tracking tasks in a spreadsheet.»", pts: 1, next: "c", fb: "Понятно, но не показывает, что это было ДО вашего прихода.", tag: "TIMELINE" } ] },
    c_fix: { text: "Интервьюер уточняет: «Are they still using the spreadsheet?» Ваш ответ:", choices: [
      { t: "«No, sorry — I meant they had been using it before I joined. We replaced it with Jira.»", pts: 1, next: "c", fb: "Вы исправили временную линию." },
      { t: "«Yes, they have.»", pts: 0, next: "c", fb: "Противоречит фактам.", tag: "CONTEXT" } ] },
    c: { text: "Результат и вывод:", choices: [
      { t: "«I introduced Jira, and we delivered on time. Since then, I've always set up tracking at the start of a project.»", pts: 2, next: null, fb: "Past Simple для действий + Present Perfect для опыта до сейчас." },
      { t: "«I had introduced Jira, and we delivered on time.»", pts: 0, next: null, fb: "Past Perfect без более поздней точки — сбивает хронологию.", tag: "TIMELINE" } ] }
  } },
{ id: "cb-09", v: 1, kind: "case", type: "branch", module: "modals", sub: "mod-permission", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "REGISTER",
  prompt: "Попросите о переносе дедлайна у старшего руководителя другого отдела.",
  ctx: "You need two extra days for a report requested by a director from another department whom you rarely work with. The delay is caused by late data from a third team. The director prefers short, polite messages.",
  explain: "Вежливость задаётся модальными (could, would you mind, would it be possible), прошедшими формами и смягчением.",
  nodes: {
    a: { text: "Первая фраза письма:", choices: [
      { t: "«Would it be possible to move the deadline to Thursday?»", pts: 2, next: "b", fb: "Формально-вежливый запрос." },
      { t: "«I need to move the deadline to Thursday.»", pts: 1, next: "b", fb: "Ясно, но прямолинейно для малознакомого директора.", tag: "REGISTER" },
      { t: "«Move the deadline to Thursday, please.»", pts: 0, next: "b_cold", fb: "Повелительное наклонение звучит как приказ.", tag: "REGISTER" } ] },
    b_cold: { text: "Директор отвечает сухо: «Why?» Как продолжить?", choices: [
      { t: "«Apologies for the abrupt message. The data from Finance arrived late, so I'd like two more days to check it.»", pts: 1, next: "c", fb: "Вы восстановили тон." },
      { t: "«Because Finance was late.»", pts: 0, next: "c", fb: "Звучит как перекладывание вины.", tag: "REGISTER" } ] },
    b: { text: "Объяснение причины:", choices: [
      { t: "«The data we needed arrived later than expected, and I'd like to make sure the figures are accurate.»", pts: 2, next: "c", fb: "Нейтрально, без обвинений." },
      { t: "«Finance must have been lazy.»", pts: 0, next: "c", fb: "Must have + оскорбительная оценка.", tag: "REGISTER" } ] },
    c: { text: "Завершение:", choices: [
      { t: "«Please let me know if that works for you.»", pts: 2, next: null, fb: "Вежливое открытое завершение." },
      { t: "«You must reply today.»", pts: 0, next: null, fb: "Must — требование к старшему.", tag: "REGISTER" },
      { t: "«Could you possibly let me know if Thursday works?»", pts: 2, next: null, fb: "Очень вежливо и уместно." } ] }
  } },
{ id: "cb-10", v: 1, kind: "case", type: "branch", module: "conditionals", sub: "cond-mixed", level: "C1", diff: 3, start: "a", pass: 0.8, tag: "TIMELINE",
  prompt: "Обсудите с руководителем последствия прошлого решения и варианты на будущее.",
  ctx: "Last year your company decided not to move to the cloud. Now servers are overloaded every Monday. A cloud migration would take about three months. Your manager asks you to present the situation to the board.",
  explain: "Mixed conditional связывает прошлое решение с текущей ситуацией; second — гипотеза о будущем; first — реальный план.",
  nodes: {
    a: { text: "Связь прошлого решения и текущей проблемы:", choices: [
      { t: "«If we had moved to the cloud last year, we wouldn't be facing these Monday overloads now.»", pts: 2, next: "b", fb: "Mixed: прошлое → настоящее." },
      { t: "«If we moved to the cloud last year, we wouldn't face these overloads.»", pts: 0, next: "a_fix", fb: "Last year требует Past Perfect в if-части.", tag: "TIMELINE" },
      { t: "«If we had moved to the cloud last year, we wouldn't have faced these overloads now.»", pts: 1, next: "b", fb: "Would have faced + now — смешение планов; mixed точнее.", tag: "TIMELINE" } ] },
    a_fix: { text: "Член совета: «Sorry — did we move to the cloud last year or not?» Ваш ответ:", choices: [
      { t: "«No, we didn't. I meant: if we had moved last year, we wouldn't be facing these problems now.»", pts: 1, next: "b", fb: "Вы исправили смешение времён: mixed conditional." },
      { t: "«We moved, but not really.»", pts: 0, next: "b", fb: "Противоречит фактам и запутывает совет.", tag: "CONTEXT" } ] },
    b: { text: "Член совета: «What if we did nothing?» Ваш ответ:", choices: [
      { t: "«If we did nothing, the overloads would probably get worse as traffic grows.»", pts: 2, next: "c", fb: "Second conditional отвечает на гипотезу того же типа." },
      { t: "«If we do nothing, the overloads would get worse.»", pts: 0, next: "c", fb: "Смешение first и second в одной фразе.", tag: "FORM" } ] },
    c: { text: "Ваше предложение:", choices: [
      { t: "«If the board approves the plan today, the migration will be completed by the end of Q3.»", pts: 2, next: null, fb: "Реальный план → first conditional; пассив Future Simple." },
      { t: "«Had the board approved the plan, we will migrate.»", pts: 0, next: null, fb: "Инверсия третьего типа + will — несовместимо.", tag: "FORM" },
      { t: "«Should the board approve the plan today, we will have completed the migration by the end of Q3.»", pts: 2, next: null, fb: "Формальная инверсия + Future Perfect — корректно." } ] }
  } }
];
