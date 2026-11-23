// Case-based tasks, part E: error hotspot and branching scenarios for blocks 5–18.
import { FX } from "../dsl.js";
const C = (module, ctx, extra = {}) => Object.assign({ kind: "case", module, ctx }, extra);
const P = "В тексте ровно одна ошибка. Нажмите на ошибочный фрагмент и введите исправление.";

export const CASES_E = [
FX("cf-11 pas-form 2 B2", P, ["The new software", { t: "installed", fix: ["was installed", "has been installed"], tag: "FORM" }, "on all laptops", "last weekend."], "Пассив: was installed.", C("passive", "An IT update for staff. Over the weekend, technicians installed new software on every company laptop.")),
FX("cf-12 pas-verbs 2 C1", P, ["Unfortunately,", "a serious error", { t: "was occurred", fix: ["occurred"], tag: "FORM" }, "during the update."], "Occur — непереходный, без пассива.", C("passive", "A short incident note for clients. Something went wrong during a system update.")),
FX("cf-13 gi-verbs 2 B2", P, ["We", "are considering", { t: "to open", fix: ["opening"], tag: "FORM" }, "a new office", "in Almaty."], "Consider + -ing.", C("gerund", "A message to investors about expansion plans that are still under discussion. Nothing has been decided yet.")),
FX("cf-14 gi-prep 2 B2", P, ["I", "look forward", { t: "to meet", fix: ["to meeting"], tag: "FORM" }, "you", "next week."], "To — предлог → -ing.", C("gerund", "The last line of an email to a new business partner before your first meeting. The tone is polite and professional.")),
FX("cf-15 art-basics 2 B2", P, ["Thank you for", { t: "an information", fix: ["the information", "your information", "information"], tag: "ARTICLE_DETERMINER" }, "about", "the new tariffs."], "Information — неисчисляемое.", C("articles", "A reply to a supplier who explained new import tariffs in detail. You want to thank them briefly before asking a question.")),
FX("cf-16 art-generic 2 C1", P, ["We believe that", { t: "the trust", fix: ["trust"], tag: "ARTICLE_DETERMINER" }, "is the basis", "of every partnership."], "Обобщение абстрактного понятия — без артикля.", C("articles", "A sentence from the 'About us' page of a consulting company's website. The text must be grammatically perfect because clients will read it.")),
FX("cf-17 prep-verb 2 B2", P, ["The final price", { t: "depends from", fix: ["depends on"], tag: "PREPOSITION" }, "the number", "of licences."], "Depend on.", C("prepositions", "A sales email answering a client's question about pricing. The price changes with the number of licences the client buys.")),
FX("cf-18 prep-adj 2 B2", P, ["She is", { t: "responsible of", fix: ["responsible for"], tag: "PREPOSITION" }, "all supplier", "contracts."], "Responsible for.", C("prepositions", "An introduction of a new procurement manager in the company newsletter. She will manage every contract with suppliers.")),
FX("cf-19 rep-questions 2 B2", P, ["The auditor", "asked", { t: "where did we store", fix: ["where we stored"], tag: "STRUCTURE" }, "the backups."], "Косвенный вопрос — прямой порядок.", C("reported", "Meeting minutes summarising questions an external auditor asked the IT team. You are checking the minutes before they are sent out.")),
FX("cf-20 rep-say-tell 2 B2", P, ["The client", { t: "said us", fix: ["told us", "said to us"], tag: "STRUCTURE" }, "that the budget", "had been approved."], "Tell sb / say to sb.", C("reported", "A quick update to your team after a phone call with the client. The client confirmed that the budget had been approved.")),
FX("cf-21 rel-pronouns 2 B2", P, ["The consultant", { t: "which", fix: ["who", "that"], tag: "STRUCTURE" }, "we hired", "was excellent."], "О людях — who/that.", C("relative", "A short review of an external consultant for the procurement database. The review will be visible to other managers.")),
FX("cf-22 rel-what 2 C1", P, ["This is", "exactly", { t: "the thing what", fix: ["the thing that", "what", "the thing"], tag: "STRUCTURE" }, "we need."], "После thing — that; или просто what.", C("relative", "A comment from a manager after seeing a prototype she likes. She writes it in the project chat.")),
FX("cf-23 str-order 2 B2", P, ["Our team", { t: "checks carefully every report", fix: ["checks every report carefully", "carefully checks every report"], tag: "STRUCTURE" }, "before", "it is sent."], "Наречие не между глаголом и дополнением.", C("structure", "A sentence from a quality-assurance policy. The policy will be shown to external auditors.")),
FX("cf-24 lnk-contrast 2 B2", P, [{ t: "Despite we had little time", fix: ["Although we had little time", "Despite having little time", "Despite the lack of time"], tag: "STRUCTURE" }, ",", "we finished", "the audit."], "Despite + существительное / -ing.", C("linking", "A line from a project summary describing an audit completed under time pressure. The team had very little time, but the audit was completed.")),
FX("cf-25 ph-separable 2 B2", P, ["The form is attached.", "Please", { t: "fill in it", fix: ["fill it in", "fill it out"], tag: "STRUCTURE" }, "and return it by Friday."], "Местоимение между глаголом и частицей.", C("phrasal", "An HR email asking new employees to complete a form. The form must be returned by Friday.")),
FX("cf-26 col-errors 2 B2", P, ["During the trip,", "we", { t: "made a lot of photos", fix: ["took a lot of photos", "took lots of photos"], tag: "COLLOCATION" }, "of the factory."], "Take photos.", C("collocations", "A short report about a visit to a supplier's factory. Your manager will forward it to the purchasing department.")),
FX("cf-27 wf-noun 2 B2", P, ["Thank you for your", { t: "explaination", fix: ["explanation"], tag: "SPELLING" }, "of the new", "procedure."], "Explain → explanation (без i).", C("wordform", "A reply to a colleague who described a new approval procedure. You want to show that you understood everything.")),
FX("cf-28 qc-count 2 B2", P, ["We received", { t: "less applications", fix: ["fewer applications"], tag: "ARTICLE_DETERMINER" }, "than last year,", "but their quality was higher."], "Исчисляемые — fewer.", C("quantifiers", "An HR quarterly report comparing recruitment results with the previous year. The number of applications fell, but their quality improved.")),
FX("cf-29 adv-subjunctive 2 C1", P, ["The committee", "recommends that", "each department", { t: "submits", fix: ["submit", "should submit"], tag: "REGISTER" }, "a budget by May."], "Формальный стиль — subjunctive.", C("advanced", "An extract from official committee minutes that use the most formal register. The committee recommends that every department send its budget by May.")),
FX("cf-30 reg-email 2 B2", P, ["Dear Mr Klein,", "please find the contract attached.", "I look forward to your reply.", { t: "Cheers, Olga", fix: ["Kind regards, Olga", "Best regards, Olga", "Yours sincerely, Olga"], tag: "REGISTER" }], "Cheers — неформально.", C("register", "A formal email to a German client you have never met, sending a contract for signature. The rest of the email is correctly formal.")),
// ---------- Branching ----------
{ id: "cb-11", v: 1, kind: "case", type: "branch", module: "passive", sub: "pas-use", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "REGISTER",
  prompt: "Напишите сообщение клиентам о сбое, шаг за шагом.",
  ctx: "Yesterday a configuration error caused a 3-hour outage. The error was made by your team. It is now fixed, and extra checks are in place. You are writing a short status update for clients.",
  explain: "Пассив помогает сфокусироваться на событии, но признание ответственности и чёткий план повышают доверие.",
  nodes: {
    a: { text: "Первое предложение:", choices: [
      { t: "«Yesterday our service was unavailable for three hours.»", pts: 2, next: "b", fb: "Пассив/нейтральное описание события — уместно." },
      { t: "«Yesterday our service unavailable for three hours.»", pts: 0, next: "b", fb: "Пропущено was.", tag: "FORM" },
      { t: "«Mistakes were made, whatever.»", pts: 0, next: "a2", fb: "Пренебрежительно и уклончиво.", tag: "REGISTER" } ] },
    a2: { text: "Руководитель просит переписать начало. Ваш вариант:", choices: [
      { t: "«We apologise: our service was unavailable for three hours yesterday.»", pts: 1, next: "b", fb: "Исправлено." },
      { t: "«Service broke.»", pts: 0, next: "b", fb: "Слишком резко и неформально.", tag: "REGISTER" } ] },
    b: { text: "Причина:", choices: [
      { t: "«The outage was caused by a configuration error on our side.»", pts: 2, next: "c", fb: "Пассив + честное признание." },
      { t: "«The outage was caused by somebody, probably.»", pts: 0, next: "c", fb: "Расплывчато.", tag: "CONTEXT" },
      { t: "«The outage caused a configuration error.»", pts: 0, next: "c", fb: "Перепутаны причина и следствие (актив).", tag: "FORM" } ] },
    c: { text: "Что сделано:", choices: [
      { t: "«The issue has been fixed, and additional checks have been introduced.»", pts: 2, next: null, fb: "Present Perfect Passive — результат сейчас." },
      { t: "«The issue fixed and checks introduced.»", pts: 0, next: null, fb: "Пропущены вспомогательные.", tag: "FORM" },
      { t: "«The issue was being fixed.»", pts: 0, next: null, fb: "Процесс, а не результат.", tag: "FORM" } ] }
  } },
{ id: "cb-12", v: 1, kind: "case", type: "branch", module: "gerund", sub: "gi-meaning", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "MEANING",
  prompt: "Помогите коллеге решить техническую проблему в чате.",
  ctx: "A colleague's laptop won't connect to the VPN. You know that restarting the app often helps. He also forgot to install yesterday's security update.",
  explain: "try + -ing (эксперимент), remember to (не забыть), stop + -ing / stop + to различаются смыслом.",
  nodes: {
    a: { text: "Первый совет:", choices: [
      { t: "«Try restarting the VPN app.»", pts: 2, next: "b", fb: "Try + -ing — попробовать как способ." },
      { t: "«Try restart the VPN app.»", pts: 0, next: "b2", fb: "Нужна форма -ing или to.", tag: "FORM" } ] },
    b2: { text: "Коллега переспрашивает: «Try what?» Ваш ответ:", choices: [
      { t: "«Sorry — try restarting the app, it often helps.»", pts: 1, next: "b", fb: "Исправлено." },
      { t: "«Restart is try.»", pts: 0, next: "b", fb: "Бессмысленно.", tag: "STRUCTURE" } ] },
    b: { text: "Коллега: «Didn't help.» Вы вспоминаете про обновление:", choices: [
      { t: "«Did you remember to install yesterday's update?»", pts: 2, next: "c", fb: "Remember to — не забыл ли сделать." },
      { t: "«Did you remember installing yesterday's update?»", pts: 1, next: "c", fb: "Remember + -ing — «помнишь ли, как устанавливал» — менее точно.", tag: "MEANING" },
      { t: "«Did you remember install the update?»", pts: 0, next: "c", fb: "Нужен to.", tag: "FORM" } ] },
    c: { text: "После обновления всё работает. Последний совет:", choices: [
      { t: "«Next time, don't stop installing updates halfway — it breaks things.»", pts: 2, next: null, fb: "Stop + -ing — прекращать действие." },
      { t: "«Next time, don't stop to install updates.»", pts: 0, next: null, fb: "Stop to — остановиться, чтобы установить: смысл другой.", tag: "MEANING" } ] }
  } },
{ id: "cb-13", v: 1, kind: "case", type: "branch", module: "articles", sub: "art-mention", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "ARTICLE_DETERMINER",
  prompt: "Расскажите коллеге о находке в отчёте.",
  ctx: "While checking the quarterly report, you found a mistake in a table. The mistake affects the total revenue figure. Your colleague has not seen the report recently.",
  explain: "Первое упоминание — a, повторное — the; неисчисляемые — без a.",
  nodes: {
    a: { text: "Первое сообщение:", choices: [
      { t: "«I found a mistake in the quarterly report.»", pts: 2, next: "b", fb: "Новая ошибка — a; отчёт известен обоим — the." },
      { t: "«I found the mistake in a quarterly report.»", pts: 0, next: "b2", fb: "Артикли перевёрнуты.", tag: "ARTICLE_DETERMINER" } ] },
    b2: { text: "Коллега: «Which report? Which mistake?» Ваш ответ:", choices: [
      { t: "«Sorry — a mistake in our Q3 report.»", pts: 1, next: "b", fb: "Исправлено." },
      { t: "«The mistake in the report.»", pts: 0, next: "b", fb: "Не проясняет.", tag: "CONTEXT" } ] },
    b: { text: "Уточнение:", choices: [
      { t: "«The mistake is in Table 3, and it affects the total revenue.»", pts: 2, next: "c", fb: "Повторное упоминание — the." },
      { t: "«A mistake is in Table 3.»", pts: 0, next: "c", fb: "Уже упомянутая ошибка — the.", tag: "ARTICLE_DETERMINER" } ] },
    c: { text: "Просьба:", choices: [
      { t: "«Could you give me some advice on how to fix it?»", pts: 2, next: null, fb: "Advice — неисчисляемое, some." },
      { t: "«Could you give me an advice on how to fix it?»", pts: 0, next: null, fb: "Нельзя an advice.", tag: "ARTICLE_DETERMINER" } ] }
  } },
{ id: "cb-14", v: 1, kind: "case", type: "branch", module: "reported", sub: "rep-backshift", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "TIMELINE",
  prompt: "Передайте руководителю разговор с поставщиком.",
  ctx: "Last Monday the supplier told you: «We can't deliver until June. We have lost two drivers, and we will hire new ones soon.» Today is Friday, and you are reporting this to your manager.",
  explain: "Backshift: can → could, have lost → had lost, will → would; верные глаголы сообщения.",
  nodes: {
    a: { text: "Первая часть:", choices: [
      { t: "«The supplier said they couldn't deliver until June.»", pts: 2, next: "b", fb: "Can → could." },
      { t: "«The supplier said they can't delivered until June.»", pts: 0, next: "a2", fb: "Неверная форма.", tag: "FORM" } ] },
    a2: { text: "Руководитель: «Sorry, can or can't?» Ваш ответ:", choices: [
      { t: "«They couldn't — not before June.»", pts: 1, next: "b", fb: "Ясно." },
      { t: "«They can delivered.»", pts: 0, next: "b", fb: "Ошибка формы и смысла.", tag: "FORM" } ] },
    b: { text: "Причина:", choices: [
      { t: "«They said they had lost two drivers.»", pts: 2, next: "c", fb: "Present Perfect → Past Perfect." },
      { t: "«They said they have lost two drivers.»", pts: 1, next: "c", fb: "Возможно, если факт актуален, но стандарт пересказа — had lost.", tag: "TIMELINE" },
      { t: "«They told that they lost drivers.»", pts: 0, next: "c", fb: "Told требует объект.", tag: "STRUCTURE" } ] },
    c: { text: "План поставщика:", choices: [
      { t: "«They said they would hire new ones soon.»", pts: 2, next: null, fb: "Will → would." },
      { t: "«They promised hiring new ones.»", pts: 0, next: null, fb: "Promise + to.", tag: "FORM" } ] }
  } },
{ id: "cb-15", v: 1, kind: "case", type: "branch", module: "relative", sub: "rel-nondefining", level: "C1", diff: 3, start: "a", pass: 0.8, tag: "STRUCTURE",
  prompt: "Напишите приветственный пост о новом сотруднике.",
  ctx: "Maria Lopez joins your team as head of analytics. She previously worked at a bank in Madrid for eight years. Your company has only one head of analytics.",
  explain: "Неопределительные придаточные — с запятыми и без that; уникальные лица требуют запятых.",
  nodes: {
    a: { text: "Первое предложение:", choices: [
      { t: "«Please welcome Maria Lopez, who joins us as head of analytics.»", pts: 2, next: "b", fb: "Запятая + who." },
      { t: "«Please welcome Maria Lopez that joins us as head of analytics.»", pts: 0, next: "b", fb: "That без запятой к имени собственному — неверно.", tag: "STRUCTURE" } ] },
    b: { text: "Опыт:", choices: [
      { t: "«Maria, who worked at a bank in Madrid for eight years, brings strong financial expertise.»", pts: 2, next: "c", fb: "Неопределительное придаточное." },
      { t: "«Maria who worked at a bank in Madrid brings strong expertise.»", pts: 1, next: "b2", fb: "Без запятых звучит, будто Марий несколько.", tag: "STRUCTURE" } ] },
    b2: { text: "Коллега спрашивает: «Do we have two Marias?» Ваш ответ:", choices: [
      { t: "«No — I'll add commas: Maria, who worked in Madrid, ...»", pts: 1, next: "c", fb: "Исправлено." },
      { t: "«Yes, the one which worked in Madrid.»", pts: 0, next: "c", fb: "Which — для вещей; и неправда.", tag: "STRUCTURE" } ] },
    c: { text: "Финальная фраза:", choices: [
      { t: "«The team she will lead is responsible for all our reporting.»", pts: 2, next: null, fb: "Определительное придаточное без местоимения." },
      { t: "«The team, that she will lead, is responsible for reporting.»", pts: 0, next: null, fb: "That с запятыми невозможен.", tag: "STRUCTURE" } ] }
  } },
{ id: "cb-16", v: 1, kind: "case", type: "branch", module: "linking", sub: "lnk-contrast", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "STRUCTURE",
  prompt: "Составьте аргументацию для руководства.",
  ctx: "You recommend a new CRM. It costs 20% more than the current one, but it saves each salesperson about two hours a week. The sales team supports the change.",
  explain: "Despite + существительное, although + предложение, however — новое предложение, as a result — следствие.",
  nodes: {
    a: { text: "Признание недостатка:", choices: [
      { t: "«Although the new CRM is more expensive, it saves time.»", pts: 2, next: "b", fb: "Although + предложение." },
      { t: "«Despite the new CRM is more expensive, it saves time.»", pts: 0, next: "a2", fb: "Despite + существительное.", tag: "STRUCTURE" } ] },
    a2: { text: "Редактор просит исправить. Ваш вариант:", choices: [
      { t: "«Despite its higher price, the new CRM saves time.»", pts: 1, next: "b", fb: "Исправлено." },
      { t: "«Despite of the price, it saves time.»", pts: 0, next: "b", fb: "Despite без of.", tag: "PREPOSITION" } ] },
    b: { text: "Количественный аргумент:", choices: [
      { t: "«Each salesperson saves two hours a week. As a result, the team can make more calls.»", pts: 2, next: "c", fb: "As a result — следствие." },
      { t: "«Each salesperson saves two hours a week, therefore the team makes more calls.»", pts: 1, next: "c", fb: "Therefore после запятой — comma splice.", tag: "STRUCTURE" } ] },
    c: { text: "Вывод:", choices: [
      { t: "«Moreover, the sales team fully supports the change.»", pts: 2, next: null, fb: "Moreover — дополнительный аргумент." },
      { t: "«However, the sales team fully supports the change.»", pts: 0, next: null, fb: "However — контраст, а здесь дополнение.", tag: "MEANING" } ] }
  } },
{ id: "cb-17", v: 1, kind: "case", type: "branch", module: "phrasal", sub: "ph-meetings", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "VOCAB_MEANING",
  prompt: "Перенесите встречу с партнёрами в переписке.",
  ctx: "A partner meeting is planned for Tuesday. Your CEO cannot attend, so the meeting must happen later, on Thursday. One partner also asks if you can start 30 minutes earlier on Thursday.",
  explain: "Put off / push back — позже; bring forward — раньше; call off — отменить.",
  nodes: {
    a: { text: "Сообщение партнёрам:", choices: [
      { t: "«We need to put off Tuesday's meeting until Thursday.»", pts: 2, next: "b", fb: "Put off — отложить." },
      { t: "«We need to call off Tuesday's meeting until Thursday.»", pts: 0, next: "a2", fb: "Call off — отменить; until противоречит.", tag: "VOCAB_MEANING" } ] },
    a2: { text: "Партнёр: «Cancelled completely?» Ваш ответ:", choices: [
      { t: "«No, sorry — just postponed to Thursday.»", pts: 1, next: "b", fb: "Исправлено." },
      { t: "«Yes.»", pts: 0, next: "b", fb: "Неправда.", tag: "CONTEXT" } ] },
    b: { text: "Партнёр просит начать на 30 минут раньше:", choices: [
      { t: "«Sure, we can bring the start time forward to 9:30.»", pts: 2, next: "c", fb: "Bring forward — раньше." },
      { t: "«Sure, we can push the start time back to 9:30.»", pts: 0, next: "c", fb: "Push back — позже.", tag: "VOCAB_MEANING" } ] },
    c: { text: "Финал письма:", choices: [
      { t: "«I'll set up a new invite and send it round.»", pts: 2, next: null, fb: "Set up — организовать." },
      { t: "«I'll set off a new invite.»", pts: 0, next: null, fb: "Set off — отправиться/запустить (сигнализацию).", tag: "VOCAB_MEANING" } ] }
  } },
{ id: "cb-18", v: 1, kind: "case", type: "branch", module: "collocations", sub: "col-business", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "COLLOCATION",
  prompt: "Отчитайтесь о переговорах.",
  ctx: "After two weeks of talks, your team and the supplier agreed on a price. You also ordered 500 units and need to deliver the first batch by 1 March. Some colleagues had concerns about quality.",
  explain: "Reach an agreement, place an order, meet a deadline, raise concerns.",
  nodes: {
    a: { text: "Результат переговоров:", choices: [
      { t: "«We reached an agreement on the price.»", pts: 2, next: "b", fb: "Reach an agreement." },
      { t: "«We made an agreement about price.»", pts: 1, next: "a2", fb: "Make an agreement — встречается, но reach точнее для итога переговоров.", tag: "COLLOCATION" },
      { t: "«We did an agreement on the price.»", pts: 0, next: "b", fb: "Нет такой коллокации.", tag: "COLLOCATION" } ] },
    a2: { text: "Руководитель уточняет: «So the talks are finished?» Ваш ответ:", choices: [
      { t: "«Yes — after two weeks we finally reached an agreement.»", pts: 1, next: "b", fb: "Точная коллокация для итога переговоров." },
      { t: "«Yes, we did the agreement.»", pts: 0, next: "b", fb: "Нет такой коллокации.", tag: "COLLOCATION" } ] },
    b: { text: "Заказ:", choices: [
      { t: "«We placed an order for 500 units.»", pts: 2, next: "c", fb: "Place an order." },
      { t: "«We put an order for 500 units.»", pts: 0, next: "c", fb: "Нет такой коллокации.", tag: "COLLOCATION" } ] },
    c: { text: "Риски:", choices: [
      { t: "«Some colleagues raised concerns about quality.»", pts: 2, next: null, fb: "Raise concerns." },
      { t: "«Some colleagues rose concerns about quality.»", pts: 0, next: null, fb: "Rise — непереходный.", tag: "FORM" },
      { t: "«Some colleagues made concerns about quality.»", pts: 0, next: null, fb: "Нет такой коллокации.", tag: "COLLOCATION" } ] }
  } },
{ id: "cb-19", v: 1, kind: "case", type: "branch", module: "quantifiers", sub: "qc-comparative", level: "B2", diff: 2, start: "a", pass: 0.8, tag: "FORM",
  prompt: "Сравните два тарифа для клиента.",
  ctx: "Plan A costs €40 a month and includes 10 users. Plan B costs €60 and includes 30 users. Plan B also has faster support. The client wants a short comparison.",
  explain: "Сравнительная степень, much/far + comparative, twice as many as, the + superlative.",
  nodes: {
    a: { text: "Цена:", choices: [
      { t: "«Plan A is cheaper than Plan B.»", pts: 2, next: "b", fb: "Односложное + -er." },
      { t: "«Plan A is more cheaper than Plan B.»", pts: 0, next: "a2", fb: "Двойная степень.", tag: "FORM" } ] },
    a2: { text: "Коллега отмечает ошибку. Исправление:", choices: [
      { t: "«Plan A is cheaper than Plan B.»", pts: 1, next: "b", fb: "Исправлено." },
      { t: "«Plan A is the more cheap.»", pts: 0, next: "b", fb: "Неверная форма.", tag: "FORM" } ] },
    b: { text: "Пользователи:", choices: [
      { t: "«Plan B includes three times as many users.»", pts: 2, next: "c", fb: "Three times as many." },
      { t: "«Plan B includes three times more much users.»", pts: 0, next: "c", fb: "Неверная конструкция.", tag: "STRUCTURE" } ] },
    c: { text: "Вывод:", choices: [
      { t: "«For larger teams, Plan B is the best value.»", pts: 2, next: null, fb: "The + superlative." },
      { t: "«For larger teams, Plan B is very better value.»", pts: 0, next: null, fb: "Very не с comparative.", tag: "FORM" } ] }
  } },
{ id: "cb-20", v: 1, kind: "case", type: "branch", module: "register", sub: "reg-requests", level: "C1", diff: 3, start: "a", pass: 0.8, tag: "REGISTER",
  prompt: "Попросите о скидке у нового поставщика.",
  ctx: "You want a 10% discount from a supplier you have never worked with. You plan to order every month if the price is right. The supplier's sales director will read your email.",
  explain: "Вежливость и осторожность: would be grateful, I was wondering, conditions; без давления.",
  nodes: {
    a: { text: "Просьба:", choices: [
      { t: "«I was wondering whether you could offer a 10% discount.»", pts: 2, next: "b", fb: "Косвенная вежливая просьба." },
      { t: "«Give us 10% off.»", pts: 0, next: "a2", fb: "Приказ.", tag: "REGISTER" } ] },
    a2: { text: "Коллега советует смягчить. Ваш вариант:", choices: [
      { t: "«Would it be possible to discuss a 10% discount?»", pts: 1, next: "b", fb: "Лучше." },
      { t: "«10% discount, please, now.»", pts: 0, next: "b", fb: "Давление.", tag: "REGISTER" } ] },
    b: { text: "Аргумент:", choices: [
      { t: "«We would be placing regular monthly orders.»", pts: 2, next: "c", fb: "Конкретный довод, нейтральный тон." },
      { t: "«You must understand we are a big client.»", pts: 0, next: "c", fb: "Давление.", tag: "REGISTER" } ] },
    c: { text: "Завершение:", choices: [
      { t: "«I look forward to hearing your thoughts.»", pts: 2, next: null, fb: "Открытое вежливое завершение." },
      { t: "«Reply ASAP.»", pts: 0, next: null, fb: "Резко.", tag: "REGISTER" } ] }
  } },
{ id: "cb-21", v: 1, kind: "case", type: "branch", module: "structure", sub: "str-participle", level: "C1", diff: 3, start: "a", pass: 0.8, tag: "STRUCTURE",
  prompt: "Отредактируйте абзац отчёта.",
  ctx: "You are editing a report written by a junior analyst. Some sentences use participle clauses incorrectly, which creates dangling participles.",
  explain: "Подлежащее причастного оборота должно совпадать с подлежащим главной части.",
  nodes: {
    a: { text: "«Looking at the data, the trend was obvious.» Ваше решение:", choices: [
      { t: "Исправить на «Looking at the data, we saw an obvious trend.»", pts: 2, next: "b", fb: "Подлежащее we совпадает." },
      { t: "Оставить как есть.", pts: 0, next: "a2", fb: "Висячее причастие.", tag: "STRUCTURE" } ] },
    a2: { text: "Автор спрашивает: «What's wrong with it?» Ваш ответ:", choices: [
      { t: "«The trend didn't look at the data — we did.»", pts: 1, next: "b", fb: "Точное объяснение." },
      { t: "«Nothing, actually.»", pts: 0, next: "b", fb: "Ошибка осталась.", tag: "STRUCTURE" } ] },
    b: { text: "«Founded in 1995, the company now employs 400 people.»", choices: [
      { t: "Оставить — оборот корректен.", pts: 2, next: "c", fb: "Компания была основана — пассивное V3 и то же подлежащее." },
      { t: "Исправить на «Founding in 1995...».", pts: 0, next: "c", fb: "-ing — активный смысл.", tag: "FORM" } ] },
    c: { text: "«Having finished the analysis, the report was sent.»", choices: [
      { t: "Исправить на «Having finished the analysis, we sent the report.»", pts: 2, next: null, fb: "Подлежащее we закончило анализ." },
      { t: "Оставить.", pts: 0, next: null, fb: "Отчёт не мог закончить анализ.", tag: "STRUCTURE" } ] }
  } },
{ id: "cb-22", v: 1, kind: "case", type: "branch", module: "advanced", sub: "adv-hedging", level: "C1", diff: 3, start: "a", pass: 0.8, tag: "MODALITY",
  prompt: "Представьте результаты пилота совету директоров.",
  ctx: "A 4-week pilot of a new onboarding process showed 15% faster ramp-up for 12 new hires. The sample is small, and seasonality may have played a role. The board wants a clear but honest summary.",
  explain: "Осторожные формулировки (seem to, may, it would appear) отражают реальную силу доказательств.",
  nodes: {
    a: { text: "Главный вывод:", choices: [
      { t: "«The pilot suggests that the new process may speed up onboarding.»", pts: 2, next: "b", fb: "Соответствует силе данных." },
      { t: "«The pilot proves the new process is 15% better.»", pts: 0, next: "a2", fb: "Слишком категорично для 12 человек.", tag: "MODALITY" } ] },
    a2: { text: "Член совета: «Proves? With twelve people?» Ваш ответ:", choices: [
      { t: "«Fair point — it would appear to help, but we need a larger sample.»", pts: 1, next: "b", fb: "Вы скорректировали тон." },
      { t: "«Yes, it's proven.»", pts: 0, next: "b", fb: "Упорство вместо точности.", tag: "MODALITY" } ] },
    b: { text: "Ограничения:", choices: [
      { t: "«Seasonality may also have played a role.»", pts: 2, next: "c", fb: "May have + V3 — осторожное предположение о прошлом." },
      { t: "«Seasonality must have caused it.»", pts: 0, next: "c", fb: "Must have — уверенность, которой нет.", tag: "MODALITY" } ] },
    c: { text: "Рекомендация:", choices: [
      { t: "«We recommend that the pilot be extended to two more teams.»", pts: 2, next: null, fb: "Subjunctive — формальная рекомендация." },
      { t: "«We recommend to extend the pilot.»", pts: 0, next: null, fb: "Recommend + to — ошибка.", tag: "FORM" } ] }
  } }
];
