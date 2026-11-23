import { S, TS, M, I, MA, O, FX, L, p, h, f, tip, warn, tb, ex, block } from "../dsl.js";

/* ===================== 15. WORD FORMATION ===================== */
const wfL = [
L("wf-noun", "Суффиксы существительных", "Образовывать существительные с -tion, -ment, -ness, -ity, -ance/-ence.", [
  tb(["Суффикс", "От чего", "Примеры"], [["-tion / -sion", "глаголы", "inform → information, decide → decision"], ["-ment", "глаголы", "develop → development, agree → agreement"], ["-ness", "прилагательные", "aware → awareness, effective → effectiveness"], ["-ity", "прилагательные", "available → availability, flexible → flexibility"], ["-ance / -ence", "глаголы/прилагательные", "perform → performance, depend → dependence"]]),
  warn("Позиция в предложении подсказывает часть речи: после артикля/прилагательного — существительное.")
], [
  TS("wf-t01 wf-noun 1 B2", "Какая часть речи нужна в «We need more ___ (flexible)»?", ["существительное: flexibility", "После more без существительного — существительное."], ["прилагательное: flexible", "Нет существительного после.", "FORM"], ["наречие: flexibly", "Нет.", "FORM"], ["глагол: flex", "Нет.", "FORM"], { ce: "a more flexible schedule — прилагательное перед существительным." }),
  TS("wf-t02 wf-noun 2 B2", "Какой суффикс у существительного от «aware»?", ["-ness: awareness", "Прилагательное + -ness."], ["-ity: awarity", "Нет.", "SPELLING"], ["-ment: awarement", "Нет.", "SPELLING"], ["-tion: awaration", "Нет.", "SPELLING"], { ce: "available → availability (-ity)." }),
  TS("wf-t03 wf-noun 2 C1", "Почему «perform → performance», но «inform → information»?", ["Суффиксы закреплены за словами исторически; их нужно запоминать.", "Нет единого правила для всех глаголов."], ["Все глаголы берут -ance.", "Нет.", "FORM"], ["Все глаголы берут -tion.", "Нет.", "FORM"], ["Это ошибки.", "Нет.", "FORM"], { ce: "assist → assistance, but consist → consistency." })
]),
L("wf-adj", "Суффиксы прилагательных", "Образовывать прилагательные с -able/-ible, -ful/-less, -ous, -ive, -al, -ic.", [
  tb(["Суффикс", "Смысл", "Примеры"], [["-able / -ible", "можно сделать", "afford → affordable, access → accessible"], ["-ful / -less", "полный / без", "use → useful / useless"], ["-ous", "обладающий", "danger → dangerous"], ["-ive", "склонный", "create → creative, effect → effective"], ["-al / -ic", "относящийся к", "finance → financial, economy → economic"]]),
  warn("Economic (связанный с экономикой) ≠ economical (экономный).")
], [
  TS("wf-t04 wf-adj 1 B2", "Чем economic отличается от economical?", ["Economic — экономический; economical — экономный.", "Разные значения."], ["Синонимы.", "Нет.", "VOCAB_MEANING"], ["Economical — экономический.", "Наоборот.", "VOCAB_MEANING"], ["Economic — устаревшее.", "Нет.", "VOCAB_MEANING"], { ce: "historic (исторически значимый) vs historical (относящийся к истории)." }),
  TS("wf-t05 wf-adj 2 B2", "Что значит -less в «careless»?", ["без: беспечный (без осторожности)", "-less = without."], ["больше: очень осторожный", "Нет.", "MEANING"], ["меньше: немного осторожный", "Нет.", "MEANING"], ["Ошибка.", "Нет.", "FORM"], { ce: "careful — осторожный." }),
  TS("wf-t06 wf-adj 2 C1", "Почему «accessible», а не «accessable»?", ["Это слово берёт -ible; выбор -able/-ible надо запоминать.", "Орфография закреплена."], ["Оба варианта верны.", "Нет.", "SPELLING"], ["-able всегда.", "Нет.", "SPELLING"], ["-ible только с глаголами на -ss.", "Не надёжное правило.", "SPELLING"], { ce: "affordable, available — -able." })
]),
L("wf-adv", "Наречия: -ly и исключения", "Образовывать наречия и знать исключения: well, hard, late/lately, fast.", [
  p("Большинство наречий образуется суффиксом -ly, но самые частые слова — исключения. Некоторые пары (hard/hardly, late/lately) имеют совершенно разные значения."),
  tb(["Прилагательное", "Наречие", "Ловушка"], [["good", "well", "~~goodly~~"], ["hard", "hard", "hardly = едва"], ["late", "late", "lately = в последнее время"], ["fast", "fast", "~~fastly~~"], ["high", "high / highly", "highly = очень"], ["friendly", "in a friendly way", "-ly прилагательное"]])
], [
  TS("wf-t07 wf-adv 1 B2", "Что значит «I've hardly worked this week»?", ["Я почти не работал.", "Hardly = едва."], ["Я много работал.", "Это worked hard.", "MEANING"], ["Я тяжело работал.", "Нет.", "MEANING"], ["Я работал поздно.", "Нет.", "MEANING"], { ce: "I've worked hard — много работал." }),
  TS("wf-t08 wf-adv 2 B2", "Почему «She speaks English good» — ошибка?", ["Нужно наречие well.", "Глагол описывается наречием."], ["Нужно goodly.", "Нет такого слова.", "FORM"], ["Ошибки нет.", "В стандарте — есть.", "FORM"], ["Нужно best.", "Нет.", "FORM"], { ce: "Her English is good — прилагательное после be." }),
  TS("wf-t09 wf-adv 2 B2", "Чем late отличается от lately?", ["Late — поздно; lately — в последнее время.", "Разные значения."], ["Синонимы.", "Нет.", "VOCAB_MEANING"], ["Lately — очень поздно.", "Нет.", "VOCAB_MEANING"], ["Late — недавно.", "Нет.", "VOCAB_MEANING"], { ce: "Have you seen him lately?" })
]),
L("wf-neg", "Отрицательные приставки", "Выбирать un-, in-, im-, ir-, il-, dis-, mis-.", [
  p("Отрицательная приставка часто зависит от первой буквы корня: im- перед p/m/b, ir- перед r, il- перед l. Остальные случаи (un-, in-, dis-) нужно запоминать."),
  tb(["Приставка", "Перед", "Примеры"], [["un-", "многие слова", "unclear, unlikely, unable"], ["in-", "многие латинские", "inefficient, incorrect"], ["im-", "перед p, m, b", "impossible, immature"], ["ir-", "перед r", "irrelevant, irregular"], ["il-", "перед l", "illegal, illogical"], ["dis-", "глаголы и прилаг.", "disagree, dishonest"], ["mis-", "неправильно", "misunderstand, mislead"]])
], [
  TS("wf-t10 wf-neg 1 B2", "Почему «irrelevant», а не «unrelevant»?", ["Перед r — ir-.", "Ассимиляция приставки."], ["Оба верны.", "Нет.", "SPELLING"], ["un- перед r всегда.", "Нет.", "SPELLING"], ["Произвольно.", "Есть закономерность.", "SPELLING"], { ce: "illegal — il- перед l." }),
  TS("wf-t11 wf-neg 2 B2", "Что значит mis- в «misunderstand»?", ["неправильно", "Mis- = wrongly."], ["не", "Это un-/dis-.", "MEANING"], ["снова", "Это re-.", "MEANING"], ["заранее", "Это pre-.", "MEANING"], { ce: "disagree — не соглашаться." }),
  TS("wf-t12 wf-neg 2 C1", "Какое слово образовано неправильно?", ["unpossible", "Правильно: impossible."], ["inefficient", "Верно.", "SPELLING"], ["dishonest", "Верно.", "SPELLING"], ["illogical", "Верно.", "SPELLING"], { ce: "unable — un- верно." })
]),
L("wf-verb", "Образование глаголов", "Образовывать глаголы с -ise/-ize, -en, en-, re-.", [
  tb(["Способ", "Примеры"], [["-ise / -ize", "modern → modernise, priority → prioritise"], ["-en", "wide → widen, short → shorten, strength → strengthen"], ["en- / em-", "able → enable, power → empower"], ["re-", "build → rebuild, schedule → reschedule"], ["-ify", "simple → simplify, class → classify"]]),
  tip("-ise (BrE) и -ize (AmE, также Oxford) — оба верны; главное — единообразие.")
], [
  TS("wf-t13 wf-verb 1 B2", "Какой глагол от «strong»?", ["strengthen", "Strength + -en."], ["strongen", "Нет.", "FORM"], ["enstrong", "Нет.", "FORM"], ["strongify", "Нет.", "FORM"], { ce: "short → shorten." }),
  TS("wf-t14 wf-verb 2 B2", "Верны ли оба написания «prioritise» и «prioritize»?", ["Да: BrE и AmE; важно единообразие.", "Варианты орфографии."], ["Только -ise.", "Нет.", "SPELLING"], ["Только -ize.", "Нет.", "SPELLING"], ["Ни одно.", "Нет.", "SPELLING"], { ce: "analyse (BrE) / analyze (AmE)." }),
  TS("wf-t15 wf-verb 2 C1", "Что значит en- в «enable»?", ["делать возможным (make able)", "En- = make."], ["отрицание", "Нет.", "MEANING"], ["повтор", "Это re-.", "MEANING"], ["неправильно", "Это mis-.", "MEANING"], { ce: "empower — наделять полномочиями." })
]),
L("wf-people", "Люди и роли: -er, -or, -ist, -ee, -ant", "Образовывать названия людей и различать -er (кто делает) и -ee (с кем делают).", [
  tb(["Суффикс", "Примеры"], [["-er / -or", "manager, developer, investor, auditor"], ["-ist", "analyst, specialist, economist"], ["-ant / -ent", "consultant, assistant, applicant, resident"], ["-ee", "employee, trainee, interviewee (тот, с кем действие)"], ["-ian", "technician, librarian"]]),
  warn("Employer — работодатель; employee — работник. Interviewer — интервьюер; interviewee — кандидат.")
], [
  TS("wf-t16 wf-people 1 B2", "Кто такой «trainee»?", ["Стажёр (тот, кого обучают).", "-ee — получатель действия."], ["Тренер.", "Это trainer.", "VOCAB_MEANING"], ["Организатор.", "Нет.", "VOCAB_MEANING"], ["Клиент.", "Нет.", "VOCAB_MEANING"], { ce: "trainer — тот, кто обучает." }),
  TS("wf-t17 wf-people 2 B2", "Кто «applicant»?", ["Заявитель, кандидат.", "Apply + -ant."], ["Работодатель.", "Нет.", "VOCAB_MEANING"], ["Прибор.", "Это appliance.", "VOCAB_MEANING"], ["Заявка.", "Это application.", "VOCAB_MEANING"], { ce: "application — заявление." }),
  TS("wf-t18 wf-people 2 C1", "Какой суффикс для специалиста в анализе?", ["analyst", "-ist."], ["analyser", "Прибор/программа.", "VOCAB_MEANING"], ["analysee", "Нет.", "FORM"], ["analysant", "Нет.", "FORM"], { ce: "economist, specialist." })
]),
L("wf-compound", "Сложные слова и прилагательные через дефис", "Строить составные прилагательные: well-known, long-term, five-year, decision-making.", [
  p("Составные прилагательные перед существительным пишутся через дефис: _a well-known brand, a long-term plan, a five-year contract_ (не ~~five-years~~ — числительное + существительное в ед. ч.). После глагола дефис часто не нужен: _The brand is well known._"),
  ex(["a two-hour meeting", "двухчасовая встреча", "hour без -s"], ["a high-quality product", "высококачественный продукт", ""], ["decision-making process", "процесс принятия решений", ""])
], [
  TS("wf-t19 wf-compound 1 B2", "Почему «a three-years contract» — ошибка?", ["В составном прилагательном существительное в ед. ч.: a three-year contract.", "Прилагательное не имеет мн. ч."], ["Нужно three year's.", "Нет.", "SPELLING"], ["Ошибки нет.", "Есть.", "FORM"], ["Нужно three years contract без дефиса.", "Тоже неверно.", "FORM"], { ce: "The contract is for three years — существительное, мн. ч." }),
  TS("wf-t20 wf-compound 2 B2", "Когда пишется дефис в «well known»?", ["Перед существительным: a well-known brand.", "Атрибутивная позиция."], ["Всегда.", "После be обычно без.", "SPELLING"], ["Никогда.", "Нет.", "SPELLING"], ["Только в AmE.", "Нет.", "SPELLING"], { ce: "The brand is well known." }),
  TS("wf-t21 wf-compound 2 C1", "Что значит «a cost-effective solution»?", ["Экономически эффективное решение.", "Составное прилагательное."], ["Дорогое решение.", "Нет.", "VOCAB_MEANING"], ["Бесплатное решение.", "Нет.", "VOCAB_MEANING"], ["Решение о стоимости.", "Нет.", "VOCAB_MEANING"], { ce: "time-consuming — отнимающий время." })
]),
L("wf-spelling", "Изменения при словообразовании", "Учитывать изменения корня: decide → decision, explain → explanation, pronounce → pronunciation.", [
  tb(["Исходное", "Производное", "Изменение"], [["decide", "decision", "d → s"], ["explain", "explanation", "ai → a"], ["pronounce", "pronunciation", "ou → u"], ["maintain", "maintenance", "ai → e"], ["describe", "description", "b → p"], ["succeed", "success / successful", ""], ["deep / wide / long", "depth / width / length", "-th"]]),
  warn("Самая частая ошибка: ~~pronounciation~~ → _pronunciation_.")
], [
  TS("wf-t22 wf-spelling 1 B2", "Как правильно?", ["pronunciation", "Ou → u."], ["pronounciation", "Частая ошибка.", "SPELLING"], ["pronunsiation", "Нет.", "SPELLING"], ["pronounsation", "Нет.", "SPELLING"], { ce: "pronounce — глагол с ou." }),
  TS("wf-t23 wf-spelling 2 B2", "Какое существительное от «maintain»?", ["maintenance", "Ai → e."], ["maintainance", "Частая ошибка.", "SPELLING"], ["maintainment", "Нет.", "FORM"], ["maintention", "Нет.", "FORM"], { ce: "explain → explanation." }),
  TS("wf-t24 wf-spelling 2 B2", "Какое существительное от «wide»?", ["width", "-th."], ["wideness", "Редко и неестественно.", "FORM"], ["widity", "Нет.", "FORM"], ["widement", "Нет.", "FORM"], { ce: "long → length." })
])
];
const wfP = [
I("wf-001 wf-noun 1 B2", "We need more ___ about the project. (INFORM)", ["information"], "Существительное от inform.", "FORM", [[["informations"], "FORM", "Information — неисчисляемое."], [["informing"], "FORM", "Нужно существительное."]]),
I("wf-002 wf-noun 1 B2", "The ___ of the new system took six months. (DEVELOP)", ["development"], "Develop + -ment.", "FORM", [[["developing"], "FORM", "Нужно существительное."], [["developement"], "SPELLING", "Без e."]]),
I("wf-003 wf-noun 2 B2", "Staff ___ is our priority. (SAFE)", ["safety"], "Safe → safety.", "FORM", [[["safeness"], "FORM", "Стандарт — safety."]]),
I("wf-004 wf-noun 2 B2", "The ___ of the room is limited to 20 people. (CAPABLE → вместимость)", ["capacity"], "Capable → capacity (вместимость).", "FORM", [[["capability"], "VOCAB_MEANING", "Capability — способность, не вместимость."]]),
I("wf-005 wf-noun 2 B2", "We were impressed by her ___. (PERFORM)", ["performance"], "Perform + -ance.", "FORM", [[["performence"], "SPELLING", "-ance."]]),
I("wf-006 wf-noun 2 C1", "The ___ of the plan depends on funding. (EFFECTIVE)", ["effectiveness"], "Effective + -ness.", "FORM", [[["effectivity"], "FORM", "Нестандартно."]]),
S("wf-007 wf-noun 1 B2", "Choose the correct noun: «We reached an ___».", ["agreement", "Agree + -ment."], ["agreeing", "Нет.", "FORM"], ["agreeance", "Нестандартно.", "FORM"], ["agreeation", "Нет.", "FORM"]),
I("wf-008 wf-adj 1 B2", "This tool is very ___. (USE)", ["useful"], "Use + -ful.", "FORM", [[["usefull"], "SPELLING", "Одно l."], [["usable"], "VOCAB_MEANING", "Usable — пригодный, а не полезный."]]),
I("wf-009 wf-adj 2 B2", "The prices are very ___. (AFFORD)", ["affordable"], "Afford + -able.", "FORM", [[["affordible"], "SPELLING", "-able."]]),
S("wf-010 wf-adj 2 B2", "The government announced new ___ measures to fight inflation.", ["economic", "Экономический."], ["economical", "Экономный.", "VOCAB_MEANING"], ["economy", "Существительное.", "FORM"], ["economically", "Наречие.", "FORM"]),
S("wf-011 wf-adj 2 B2", "This car is very ___ — it uses little fuel.", ["economical", "Экономный."], ["economic", "Экономический.", "VOCAB_MEANING"], ["economy", "Нет.", "FORM"], ["economist", "Нет.", "FORM"]),
I("wf-012 wf-adj 2 B2", "She's a very ___ designer. (CREATE)", ["creative"], "Create + -ive.", "FORM", [[["creating"], "FORM", "Нужно прилагательное."], [["creatful"], "FORM", "Нет."]]),
I("wf-013 wf-adj 2 C1", "The software is ___ with older versions. (COMPATIBILITY → прилагательное)", ["compatible"], "Compatible.", "FORM", [[["compatable"], "SPELLING", "-ible."]]),
S("wf-014 wf-adv 1 B2", "She did ___ in the interview.", ["well", "Наречие от good."], ["good", "Прилагательное.", "FORM"], ["goodly", "Нет.", "FORM"], ["best", "Нет.", "FORM"]),
S("wf-015 wf-adv 2 B2", "Have you spoken to him ___?", ["lately", "В последнее время."], ["late", "Поздно.", "VOCAB_MEANING"], ["lateness", "Нет.", "FORM"], ["latest", "Нет.", "FORM"]),
S("wf-016 wf-adv 2 B2", "He works very ___.", ["hard", "Усердно."], ["hardly", "Едва.", "VOCAB_MEANING"], ["hardy", "Выносливый.", "VOCAB_MEANING"], ["harder", "Нет.", "FORM"]),
I("wf-017 wf-adv 2 B2", "The problem was solved ___. (QUICK)", ["quickly"], "Quick + -ly.", "FORM", [[["quick"], "FORM", "Нужно наречие."]]),
S("wf-018 wf-adv 2 C1", "This product is ___ recommended by experts.", ["highly", "Highly = очень."], ["high", "Высоко (физически).", "VOCAB_MEANING"], ["height", "Нет.", "FORM"], ["highness", "Нет.", "FORM"]),
I("wf-019 wf-neg 1 B2", "Meeting this deadline is ___. (POSSIBLE → отрицание)", ["impossible"], "Im- перед p.", "SPELLING", [[["unpossible"], "SPELLING", "Перед p — im-."], [["inpossible"], "SPELLING", "Перед p — im-."]]),
I("wf-020 wf-neg 2 B2", "That information is ___ to our discussion. (RELEVANT → отрицание)", ["irrelevant"], "Ir- перед r.", "SPELLING", [[["unrelevant"], "SPELLING", "Перед r — ir-."], [["inrelevant"], "SPELLING", "Перед r — ir-."]]),
I("wf-021 wf-neg 2 B2", "Selling counterfeit goods is ___. (LEGAL → отрицание)", ["illegal"], "Il- перед l.", "SPELLING", [[["unlegal"], "SPELLING", "Перед l — il-."]]),
S("wf-022 wf-neg 2 B2", "I'm sorry, I ___ your question.", ["misunderstood", "Mis- = неправильно."], ["disunderstood", "Нет.", "FORM"], ["ununderstood", "Нет.", "FORM"], ["inunderstood", "Нет.", "FORM"]),
S("wf-023 wf-neg 2 C1", "The process is slow and ___.", ["inefficient", "In-."], ["unefficient", "Нет.", "SPELLING"], ["disefficient", "Нет.", "SPELLING"], ["misefficient", "Нет.", "SPELLING"]),
I("wf-024 wf-verb 1 B2", "We need to ___ the road. (WIDE → глагол)", ["widen"], "Wide + -en.", "FORM", [[["widenize"], "FORM", "Нет."], [["wide"], "FORM", "Нужен глагол."]]),
I("wf-025 wf-verb 2 B2", "The new rules ___ staff to work flexibly. (ABLE → глагол)", ["enable"], "En- + able.", "FORM", [[["unable"], "VOCAB_MEANING", "Unable — неспособный."]]),
I("wf-026 wf-verb 2 B2", "We must ___ the process. (SIMPLE → глагол)", ["simplify"], "Simple → simplify.", "FORM", [[["simplise"], "FORM", "Нет."], [["simplen"], "FORM", "Нет."]]),
I("wf-027 wf-verb 2 C1", "Let's ___ the tasks by urgency. (PRIORITY → глагол)", ["prioritise", "prioritize"], "Priority → prioritise/prioritize.", "FORM", [[["priorise"], "SPELLING", "Prioritise."]]),
S("wf-028 wf-people 1 B2", "The ___ asked the candidate about her experience.", ["interviewer", "Тот, кто проводит интервью."], ["interviewee", "Кандидат.", "VOCAB_MEANING"], ["interview", "Нет.", "FORM"], ["interviewist", "Нет.", "FORM"]),
S("wf-029 wf-people 1 B2", "All ___ must complete safety training.", ["employees", "Работники."], ["employers", "Работодатели.", "VOCAB_MEANING"], ["employments", "Нет.", "FORM"], ["employs", "Нет.", "FORM"]),
I("wf-030 wf-people 2 B2", "We received 200 ___ for the role. (APPLY → люди)", ["applicants"], "Apply → applicant.", "FORM", [[["applications"], "VOCAB_MEANING", "Applications — заявки, а не люди."], [["appliers"], "FORM", "Нет."]]),
I("wf-031 wf-people 2 B2", "She works as a financial ___. (ANALYSE → человек)", ["analyst"], "-ist.", "FORM", [[["analyser"], "VOCAB_MEANING", "Прибор/программа."], [["analist"], "SPELLING", "Analyst."]]),
S("wf-032 wf-compound 1 B2", "We signed a ___ contract.", ["three-year", "Числительное + ед. ч."], ["three-years", "Нет мн. ч.", "FORM"], ["three years'", "Не в этой форме.", "FORM"], ["three year's", "Нет.", "SPELLING"]),
S("wf-033 wf-compound 2 B2", "It was a ___ meeting.", ["two-hour", "Ед. ч. в составном прилагательном."], ["two-hours", "Нет.", "FORM"], ["two hours", "Нужен дефис и ед. ч.", "FORM"], ["two-houred", "Нет.", "FORM"]),
S("wf-034 wf-compound 2 B2", "Samsung is a ___ brand.", ["well-known", "Перед существительным — дефис."], ["good-known", "Нет.", "FORM"], ["well-knowing", "Нет.", "FORM"], ["known-well", "Нет.", "FORM"]),
I("wf-035 wf-compound 2 C1", "Fixing bugs manually is very ___. (TIME + CONSUME)", ["time-consuming"], "Составное прилагательное.", "FORM", [], { accept: ["time-consuming", "time consuming"] }),
I("wf-036 wf-spelling 1 B2", "Her English ___ is excellent. (PRONOUNCE)", ["pronunciation"], "Ou → u.", "SPELLING", [[["pronounciation"], "SPELLING", "Pronunciation — без o."]]),
I("wf-037 wf-spelling 2 B2", "Can you give me a short ___? (EXPLAIN)", ["explanation"], "Ai → a.", "SPELLING", [[["explaination"], "SPELLING", "Без i."], [["explaination"], "SPELLING", "Без i."]]),
I("wf-038 wf-spelling 2 B2", "The ___ of the table is two metres. (LONG)", ["length"], "Long → length.", "FORM", [[["longness"], "FORM", "Нет."], [["lenght"], "SPELLING", "Length."]]),
MA("wf-039 wf-noun 2 B2", "Какая часть речи нужна в пропуске?", ["Существительное", "Прилагательное", "Наречие"], [["the ___ of the team (SUCCEED)", 0], ["a ___ launch (SUCCEED)", 1], ["They launched ___ (SUCCEED)", 2], ["high ___ (AVAILABLE)", 0], ["fully ___ (AVAILABLE)", 1], ["work ___ (EFFECTIVE)", 2]], "Позиция в предложении определяет часть речи.", "FORM"),
M("wf-040 wf-neg 3 C1", "Выберите 3 правильно образованных слова.", ["irregular", true, "Ir- перед r."], ["dishonest", true, "Dis-."], ["unlegal", false, "Illegal.", "SPELLING"], ["impolitely", true, "Im- перед p."], ["inpossible", false, "Impossible.", "SPELLING"], { explain: "Верны irregular, dishonest и impolitely (3 из 5); unlegal и inpossible — ошибки." })
];
export const wordform = block({ id: "wordform", n: 15, title: "Word Formation", short: "Суффиксы, приставки, составные слова, орфография", blueprint: { size: 24, theory: 6 } }, wfL, wfP);

/* ===================== 16. QUANTIFIERS / COMPARISON ===================== */
const qcL = [
L("qc-count", "Much, many, a lot of, few, little", "Выбирать квантификатор по исчисляемости и типу предложения.", [
  tb(["", "Исчисляемые мн. ч.", "Неисчисляемые"], [["много (вопрос/отрицание)", "many", "much"], ["много (утверждение)", "a lot of / lots of", "a lot of / lots of"], ["несколько / немного", "a few", "a little"], ["мало", "few", "little"], ["меньше", "fewer", "less"]]),
  warn("Much в утверждениях звучит формально: _We don't have much time_, но _We have a lot of time_.")
], [
  TS("qc-t01 qc-count 1 B2", "Почему «How much people came?» — ошибка?", ["People — исчисляемое: How many.", "Much — с неисчисляемыми."], ["Нужно How lot.", "Нет.", "ARTICLE_DETERMINER"], ["Ошибки нет.", "Есть.", "ARTICLE_DETERMINER"], ["Нужно How few.", "Не тот смысл.", "MEANING"], { ce: "How much time do we have?" }),
  TS("qc-t02 qc-count 2 B2", "Почему «less mistakes» считается ошибкой в формальной речи?", ["С исчисляемыми — fewer: fewer mistakes.", "Less — с неисчисляемыми."], ["Нужно littler mistakes.", "Нет.", "FORM"], ["Ошибки нет.", "В формальной речи — есть.", "ARTICLE_DETERMINER"], ["Нужно lesser mistakes.", "Нет.", "FORM"], { ce: "less time, fewer hours." }),
  TS("qc-t03 qc-count 2 B2", "Почему «We have much work» звучит неестественно?", ["В утверждениях обычно a lot of; much — в вопросах и отрицаниях.", "Стилистическая норма."], ["Work — исчисляемое.", "Неисчисляемое.", "ARTICLE_DETERMINER"], ["Much запрещено с work.", "Нет.", "THEORY"], ["Нужно many work.", "Нет.", "ARTICLE_DETERMINER"], { ce: "We don't have much work today — естественно." })
]),
L("qc-some-any", "Some, any, no, none", "Использовать some/any/no/none и производные.", [
  tb(["Слово", "Употребление"], [["some", "утверждение; просьбы/предложения"], ["any", "вопросы, отрицания; «любой» в утверждении"], ["no + сущ.", "= not any"], ["none (of)", "ни один / ничего (самостоятельно)"], ["someone / anyone / no one", "то же правило"]]),
  warn("Двойное отрицание: ~~I don't have no time~~ → _I don't have any time / I have no time_.")
], [
  TS("qc-t04 qc-some-any 1 B2", "Почему «I didn't see nobody» — ошибка в стандартном английском?", ["Двойное отрицание: I didn't see anybody / I saw nobody.", "Одно отрицание в предложении."], ["Нужно I didn't see somebody.", "Меняет смысл.", "MEANING"], ["Ошибки нет.", "В стандарте — есть.", "STRUCTURE"], ["Нужно I not saw anybody.", "Нет.", "AUXILIARY"], { ce: "I saw nobody — тот же смысл." }),
  TS("qc-t05 qc-some-any 2 B2", "Чем «no» отличается от «none»?", ["No — перед существительным; none — самостоятельно или с of.", "No time / none of the time / None."], ["Синонимы во всех позициях.", "Нет.", "STRUCTURE"], ["None — перед существительным.", "Нет.", "STRUCTURE"], ["No — после of.", "Нет.", "STRUCTURE"], { ce: "«Any questions?» — «None.»" }),
  TS("qc-t06 qc-some-any 2 C1", "Что значит any в «You can call me any time»?", ["В любое время.", "Any в утверждении = любой."], ["Никогда.", "Нет.", "MEANING"], ["Иногда.", "Нет.", "MEANING"], ["Немного времени.", "Нет.", "MEANING"], { ce: "Do you have any time? — вопрос." })
]),
L("qc-all-each", "All, every, each, whole, most", "Различать all/every/each/whole/most и согласование.", [
  tb(["Слово", "Конструкция", "Пример"], [["all", "all + мн./неисч.; all (of) the + сущ.", "All staff / all the files"], ["every / each", "+ ед. ч.", "every employee has"], ["whole", "the whole + ед. ч.", "the whole team"], ["most", "most + сущ. (вообще) / most of the + сущ. (конкретно)", "Most people / most of the people here"]]),
  warn("~~Most of people~~ → _Most people_ (вообще) / _Most of the people_ (конкретные).")
], [
  TS("qc-t07 qc-all-each 1 B2", "Почему «Most of people prefer email» — ошибка?", ["Most people (вообще) или most of the people (конкретные).", "Most of требует определителя."], ["Нужно Most of peoples.", "Нет.", "ARTICLE_DETERMINER"], ["Ошибки нет.", "Есть.", "ARTICLE_DETERMINER"], ["Нужно The most of people.", "Нет.", "ARTICLE_DETERMINER"], { ce: "Most of our clients prefer email." }),
  TS("qc-t08 qc-all-each 2 B2", "Чем «all day» отличается от «every day»?", ["All day — весь день; every day — каждый день.", "Длительность vs регулярность."], ["Синонимы.", "Нет.", "MEANING"], ["All day — каждый день.", "Нет.", "MEANING"], ["Every day — весь день.", "Нет.", "MEANING"], { ce: "the whole day = all day." }),
  TS("qc-t09 qc-all-each 2 B2", "Как правильно: «the ___ team»?", ["whole", "The whole + ед. ч."], ["all", "All the team — BrE разг., но the all team — нет.", "ARTICLE_DETERMINER"], ["every", "Нет.", "ARTICLE_DETERMINER"], ["each", "Нет.", "ARTICLE_DETERMINER"], { ce: "the whole day." })
]),
L("qc-both-either", "Both, either, neither", "Использовать both/either/neither и пары both...and, either...or, neither...nor.", [
  tb(["Конструкция", "Смысл", "Глагол"], [["both A and B", "и A, и B", "мн. ч."], ["either A or B", "или A, или B", "по ближайшему"], ["neither A nor B", "ни A, ни B", "по ближайшему (формально)"], ["either / neither of the + мн.", "любой / ни один из двух", "ед. ч. (формально)"]]),
  warn("~~neither... or~~ → _neither... nor_.")
], [
  TS("qc-t10 qc-both-either 1 B2", "Какая пара верна?", ["neither ... nor", "Устойчивая пара."], ["neither ... or", "Нет.", "STRUCTURE"], ["either ... nor", "Нет.", "STRUCTURE"], ["both ... or", "Нет.", "STRUCTURE"], { ce: "either ... or — или... или." }),
  TS("qc-t11 qc-both-either 2 B2", "Какой глагол: «Neither the manager nor the employees ___ aware»?", ["were", "Согласование с ближайшим (employees)."], ["was", "Ближайшее — мн. ч.", "AGREEMENT"], ["is", "Время.", "TIMELINE"], ["be", "Нет.", "FORM"], { ce: "Neither the employees nor the manager was aware." }),
  TS("qc-t12 qc-both-either 2 C1", "Чем «I don't like either option» отличается от «I like neither option»?", ["Смысл один; neither — формальнее и короче.", "Два способа отрицания."], ["Противоположны.", "Нет.", "MEANING"], ["Первое неверно.", "Верно.", "STRUCTURE"], ["Второе о трёх вариантах.", "Нет.", "MEANING"], { ce: "I like both options." })
]),
L("qc-comparative", "Сравнительная степень", "Образовывать сравнительную степень и сравнивать через than.", [
  tb(["Тип", "Правило", "Пример"], [["односложные", "-er", "cheaper, faster"], ["на -y", "-ier", "easier, busier"], ["2+ слога", "more / less", "more reliable"], ["неправильные", "", "good → better, bad → worse, far → further/farther"]]),
  warn("~~more cheaper~~ — двойная степень. ~~than me~~ в формальном письме → _than I (am)_ — допустимы оба в разговоре.")
], [
  TS("qc-t13 qc-comparative 1 B2", "Почему «more cheaper» — ошибка?", ["Двойная степень: cheaper или more cheap (неестественно).", "Только один способ."], ["Нужно most cheaper.", "Нет.", "FORM"], ["Ошибки нет.", "Есть.", "FORM"], ["Нужно cheaperer.", "Нет.", "FORM"], { ce: "more reliable — для длинных слов." }),
  TS("qc-t14 qc-comparative 2 B2", "Какая форма от bad?", ["worse", "Неправильная форма."], ["badder", "Нет.", "FORM"], ["more bad", "Нет.", "FORM"], ["worst", "Превосходная.", "FORM"], { ce: "good → better." }),
  TS("qc-t15 qc-comparative 2 C1", "Чем further отличается от farther?", ["Оба — о расстоянии; further ещё и «дальнейший, дополнительный».", "Further шире."], ["Farther — дополнительный.", "Нет.", "VOCAB_MEANING"], ["Синонимы во всех значениях.", "Нет.", "VOCAB_MEANING"], ["Further — только BrE.", "Нет.", "VOCAB_MEANING"], { ce: "further information — дополнительная информация." })
]),
L("qc-superlative", "Превосходная степень", "Образовывать превосходную степень с the и предлогами in/of.", [
  p("Превосходная степень выделяет один элемент из группы и почти всегда требует the. Предлог после неё зависит от того, что это за группа."),
  tb(["Тип", "Пример"], [["the + -est", "the cheapest option"], ["the most / least", "the most reliable supplier"], ["in + место/группа", "the best team in the company"], ["of + период/множество", "the best year of my life, the fastest of the three"], ["ever + Present Perfect", "the best results we've ever had"]])
], [
  TS("qc-t16 qc-superlative 1 B2", "Какой предлог: «the best employee ___ the company»?", ["in", "In + организация/место."], ["of", "Of — с периодом или числом.", "PREPOSITION"], ["from", "Нет.", "PREPOSITION"], ["at", "Нет.", "PREPOSITION"], { ce: "the best of the three candidates." }),
  TS("qc-t17 qc-superlative 2 B2", "Какое время после «the best ... ever»?", ["Present Perfect: the best results we've ever had.", "Опыт до сейчас."], ["Past Simple всегда.", "Не стандарт.", "TIMELINE"], ["Present Simple.", "Нет.", "TIMELINE"], ["Future.", "Нет.", "TIMELINE"], { ce: "the best I had ever seen — в прошлом (Past Perfect)." }),
  TS("qc-t18 qc-superlative 2 B2", "Почему «the most fastest» — ошибка?", ["Двойная превосходная степень: the fastest.", "Один способ."], ["Нужно the more fastest.", "Нет.", "FORM"], ["Ошибки нет.", "Есть.", "FORM"], ["Нужно most fast.", "Нет.", "FORM"], { ce: "the most efficient — длинное слово." })
]),
L("qc-modifiers", "Усиление сравнения и as ... as", "Усиливать сравнение (much, far, a bit) и использовать as ... as, twice as.", [
  tb(["Конструкция", "Пример"], [["much / far / a lot + comparative", "much cheaper, far more efficient"], ["a bit / slightly + comparative", "slightly higher"], ["as + adj + as", "as fast as"], ["not as/so + adj + as", "not as expensive as"], ["twice / three times as + adj + as", "twice as fast as"], ["the same as", "the same price as"]]),
  warn("~~very cheaper~~ → _much cheaper_.")
], [
  TS("qc-t19 qc-modifiers 1 B2", "Почему «very cheaper» — ошибка?", ["Very не усиливает сравнительную степень: much/far cheaper.", "Сравнительная степень усиливается much/far."], ["Нужно very more cheap.", "Нет.", "FORM"], ["Ошибки нет.", "Есть.", "FORM"], ["Нужно so cheaper.", "Нет.", "FORM"], { ce: "very cheap — без сравнения." }),
  TS("qc-t20 qc-modifiers 2 B2", "Как сказать «в два раза быстрее»?", ["twice as fast as", "Twice as ... as."], ["two times faster as", "Смешение.", "STRUCTURE"], ["twice more fast", "Нет такой конструкции.", "STRUCTURE"], ["double fast as", "Нет.", "STRUCTURE"], { ce: "three times as expensive as." }),
  TS("qc-t21 qc-modifiers 2 B2", "Что значит «It's not as expensive as I thought»?", ["Дешевле, чем я думал.", "Not as ... as = меньше."], ["Дороже, чем я думал.", "Наоборот.", "MEANING"], ["Так же дорого.", "Нет.", "MEANING"], ["Бесплатно.", "Нет.", "MEANING"], { ce: "as expensive as — так же дорого." })
]),
L("qc-the-more", "The more..., the better; less/fewer", "Строить параллельное сравнение the more ... the more.", [
  p("**The + comparative ..., the + comparative**: _The earlier we start, the sooner we finish. The more you practise, the better you get._ В обеих частях — the и сравнительная степень."),
  ex(["The bigger the team, the harder it is to coordinate.", "Чем больше команда, тем сложнее координация.", ""], ["The sooner, the better.", "Чем скорее, тем лучше.", "сокращённо"])
], [
  TS("qc-t22 qc-the-more 1 B2", "Как правильно: «Чем раньше, тем лучше»?", ["The sooner, the better.", "The + comparative дважды."], ["More soon, more good.", "Нет.", "STRUCTURE"], ["The soonest, the best.", "Превосходная.", "FORM"], ["Sooner, better.", "Нужен the.", "ARTICLE_DETERMINER"], { ce: "The more, the merrier." }),
  TS("qc-t23 qc-the-more 2 B2", "Почему «The more you practise, more you learn» — ошибка?", ["Во второй части тоже нужен the: the more you learn.", "Параллелизм."], ["Нужно most you learn.", "Нет.", "FORM"], ["Ошибки нет.", "Есть.", "ARTICLE_DETERMINER"], ["Нужно than more.", "Нет.", "STRUCTURE"], { ce: "The more you practise, the more you learn." }),
  TS("qc-t24 qc-the-more 2 C1", "Какой порядок: «The ___ the deadline, the more stressed we get»?", ["closer", "The + comparative + подлежащее."], ["more close", "Close → closer.", "FORM"], ["closest", "Превосходная.", "FORM"], ["most close", "Нет.", "FORM"], { ce: "The closer the deadline (is), ..." })
])
];
const qcP = [
S("qc-001 qc-count 1 B2", "How ___ participants registered?", ["many", "Исчисляемые."], ["much", "С неисчисляемыми.", "ARTICLE_DETERMINER"], ["lot", "Нет.", "ARTICLE_DETERMINER"], ["little", "Нет.", "ARTICLE_DETERMINER"]),
S("qc-002 qc-count 1 B2", "We don't have ___ time left.", ["much", "Неисчисляемое в отрицании."], ["many", "Исчисляемые.", "ARTICLE_DETERMINER"], ["few", "Исчисляемые.", "ARTICLE_DETERMINER"], ["a few", "Исчисляемые.", "ARTICLE_DETERMINER"]),
S("qc-003 qc-count 2 B2", "The new process means ___ errors.", ["fewer", "Исчисляемые → fewer."], ["less", "С неисчисляемыми (формально).", "ARTICLE_DETERMINER"], ["little", "Нет.", "ARTICLE_DETERMINER"], ["lesser", "Нет.", "FORM"]),
S("qc-004 qc-count 2 B2", "There's very ___ demand for this product, so we'll stop production.", ["little", "Мало (негативно), неисчисляемое."], ["a little", "Немного (позитивно).", "MEANING"], ["few", "Исчисляемые.", "ARTICLE_DETERMINER"], ["a few", "Исчисляемые.", "ARTICLE_DETERMINER"]),
I("qc-005 qc-count 2 B2", "We still have ___ few days before the launch, so there's time. (одно слово)", ["a"], "A few — несколько (достаточно).", "ARTICLE_DETERMINER", [[["the"], "ARTICLE_DETERMINER", "A few."]]),
FX("qc-006 qc-count 1 B2", "Найдите и исправьте ошибку.", ["We received", { t: "much complaints", fix: ["many complaints", "a lot of complaints", "lots of complaints"], tag: "ARTICLE_DETERMINER" }, "last month."], "Complaints — исчисляемое."),
S("qc-007 qc-some-any 1 B2", "Is there ___ coffee left?", ["any", "Вопрос."], ["some", "Some — для предложений/просьб; здесь нейтральный вопрос.", "ARTICLE_DETERMINER"], ["no", "Нет.", "ARTICLE_DETERMINER"], ["a", "Неисчисляемое.", "ARTICLE_DETERMINER"]),
S("qc-008 qc-some-any 2 B2", "«How many replies did we get?» — «___.»", ["None", "Самостоятельно — none."], ["No", "No перед существительным.", "STRUCTURE"], ["Any", "Нет.", "STRUCTURE"], ["Nothing", "Нет (исчисляемые ответы).", "VOCAB_MEANING"]),
FX("qc-009 qc-some-any 1 B2", "Найдите и исправьте ошибку.", ["I", { t: "don't need no help", fix: ["don't need any help", "need no help"], tag: "STRUCTURE" }, ", thanks."], "Двойное отрицание."),
S("qc-010 qc-some-any 2 B2", "You can contact ___ of our managers — they all speak English.", ["any", "Любой."], ["some", "Некоторые — не «любой».", "MEANING"], ["no", "Противоречит.", "MEANING"], ["none", "Противоречит.", "MEANING"]),
S("qc-011 qc-all-each 1 B2", "___ people prefer flexible hours.", ["Most", "Вообще — most + сущ."], ["Most of", "Most of + the/our.", "ARTICLE_DETERMINER"], ["The most", "Нет.", "ARTICLE_DETERMINER"], ["Almost", "Almost people — нужно almost all people.", "ARTICLE_DETERMINER"]),
S("qc-012 qc-all-each 2 B2", "___ of our clients are based in Asia.", ["Most", "Most of + our."], ["Most the", "Нет.", "ARTICLE_DETERMINER"], ["Almost", "Almost of — нет.", "ARTICLE_DETERMINER"], ["The most", "Нет.", "ARTICLE_DETERMINER"]),
S("qc-013 qc-all-each 2 B2", "I spent the ___ weekend fixing the bug.", ["whole", "The whole + ед. ч."], ["all", "The all — нет.", "ARTICLE_DETERMINER"], ["every", "Нет.", "ARTICLE_DETERMINER"], ["total", "Неестественно.", "COLLOCATION"]),
S("qc-014 qc-all-each 1 B2", "___ employee receives a laptop on day one.", ["Every", "Every + ед. ч."], ["All", "All + мн. ч.", "AGREEMENT"], ["Most", "Most + мн. ч.", "AGREEMENT"], ["Whole", "Нет.", "ARTICLE_DETERMINER"]),
S("qc-015 qc-both-either 1 B2", "___ the CEO and the CFO attended the meeting.", ["Both", "Both ... and."], ["Either", "Either ... or.", "STRUCTURE"], ["Neither", "Neither ... nor.", "STRUCTURE"], ["All", "Нет.", "STRUCTURE"]),
S("qc-016 qc-both-either 2 B2", "Neither the price ___ the delivery time was acceptable.", ["nor", "Neither ... nor."], ["or", "Нет.", "STRUCTURE"], ["and", "Нет.", "STRUCTURE"], ["neither", "Нет.", "STRUCTURE"]),
S("qc-017 qc-both-either 2 B2", "You can pay ___ by card or by bank transfer.", ["either", "Either ... or."], ["neither", "Противоречит.", "MEANING"], ["both", "Both ... and.", "STRUCTURE"], ["whether", "Нет.", "STRUCTURE"]),
I("qc-018 qc-both-either 2 C1", "Neither of the proposals ___ (be) acceptable. (формально, Present Simple)", ["is"], "Neither of + мн. ч. → глагол в ед. ч. (формально).", "AGREEMENT", [[["was"], "TIMELINE", "Нужно Present Simple."], [["be"], "FORM", "Нужна личная форма."]], { accept: ["is", "are"], note: "Формально — is; в разговоре are тоже нормален, засчитываются оба." }),
S("qc-019 qc-comparative 1 B2", "This laptop is ___ than the old one.", ["lighter", "Односложное + -er."], ["more light", "Неестественно для односложного.", "FORM"], ["more lighter", "Двойная степень.", "FORM"], ["lightest", "Превосходная.", "FORM"]),
S("qc-020 qc-comparative 1 B2", "The new system is ___ than the old one.", ["more reliable", "Длинное слово → more."], ["reliabler", "Нет.", "FORM"], ["more reliabler", "Нет.", "FORM"], ["most reliable", "Превосходная.", "FORM"]),
I("qc-021 qc-comparative 2 B2", "The results were ___ (bad) than we expected.", ["worse"], "Bad → worse.", "FORM", [[["badder"], "FORM", "Неправильная форма."], [["worst"], "FORM", "Превосходная."], [["more bad"], "FORM", "Неправильная форма."]]),
S("qc-022 qc-comparative 2 B2", "For ___ information, please contact HR.", ["further", "Further = дополнительная."], ["farther", "Только расстояние.", "VOCAB_MEANING"], ["more far", "Нет.", "FORM"], ["furthest", "Превосходная.", "FORM"]),
I("qc-023 qc-comparative 2 B2", "This task is ___ (easy) than the previous one.", ["easier"], "-y → -ier.", "SPELLING", [[["easyer"], "SPELLING", "Y → i."], [["more easy"], "FORM", "Двусложное на -y → -ier."]]),
S("qc-024 qc-superlative 1 B2", "This is ___ option we have.", ["the cheapest", "Превосходная."], ["the most cheapest", "Двойная.", "FORM"], ["cheapest", "Нужен the.", "ARTICLE_DETERMINER"], ["the cheaper", "Сравнительная.", "FORM"]),
S("qc-025 qc-superlative 2 B2", "She's the best developer ___ the team.", ["in", "In + группа/организация."], ["of", "Of — с числом/периодом.", "PREPOSITION"], ["from", "Нет.", "PREPOSITION"], ["at", "Нет.", "PREPOSITION"]),
S("qc-026 qc-superlative 2 B2", "These are the best results we ___.", ["have ever had", "Ever + Present Perfect."], ["ever had", "Не стандарт.", "TIMELINE"], ["had ever have", "Нет.", "FORM"], ["will ever have", "Нет.", "TIMELINE"]),
FX("qc-027 qc-superlative 1 B2", "Найдите и исправьте ошибку.", ["It was", { t: "the most fastest", fix: ["the fastest"], tag: "FORM" }, "delivery", "we've ever had."], "Двойная превосходная степень."),
S("qc-028 qc-modifiers 1 B2", "The new version is ___ faster.", ["much", "Усиление сравнительной."], ["very", "Very не с comparative.", "FORM"], ["so", "Нет.", "FORM"], ["too", "Нет.", "FORM"]),
S("qc-029 qc-modifiers 2 B2", "The new printer is twice ___ the old one.", ["as fast as", "Twice as ... as."], ["faster as", "Смешение.", "STRUCTURE"], ["as fast than", "Смешение.", "STRUCTURE"], ["so fast as", "Нет.", "STRUCTURE"]),
S("qc-030 qc-modifiers 2 B2", "The hotel wasn't ___ expensive ___ we thought.", ["as / as", "Not as ... as."], ["so / than", "Смешение.", "STRUCTURE"], ["more / as", "Смешение.", "STRUCTURE"], ["as / than", "Смешение.", "STRUCTURE"]),
I("qc-031 qc-modifiers 2 B2", "Our price is the ___ as last year. (одно слово)", ["same"], "The same as.", "STRUCTURE", [[["similar"], "STRUCTURE", "Similar to, а не the similar as."]]),
S("qc-032 qc-modifiers 2 C1", "Costs were ___ higher than forecast — just 2%.", ["slightly", "Немного (2%)."], ["far", "Значительно — противоречит 2%.", "MEANING"], ["very", "Very не с comparative.", "FORM"], ["much", "Значительно.", "MEANING"]),
S("qc-033 qc-the-more 1 B2", "The earlier we start, ___ we'll finish.", ["the sooner", "The + comparative."], ["sooner", "Нужен the.", "ARTICLE_DETERMINER"], ["the soonest", "Превосходная.", "FORM"], ["more soon", "Нет.", "FORM"]),
S("qc-034 qc-the-more 2 B2", "The more you practise, ___ you become.", ["the more confident", "The + comparative."], ["more confident", "Нужен the.", "ARTICLE_DETERMINER"], ["the most confident", "Превосходная.", "FORM"], ["the confidenter", "Нет.", "FORM"]),
O("qc-035 qc-the-more 2 C1", "Постройте: «Чем больше команда, тем сложнее координация».", ["The", "bigger", "the", "team,", "the", "harder", "the", "coordination"], "The + comparative, the + comparative.", "STRUCTURE"),
MA("qc-036 qc-count 2 B2", "Какой квантификатор подходит?", ["many / few / fewer", "much / little / less"], [["___ meetings", 0], ["___ information", 1], ["___ employees", 0], ["___ equipment", 1], ["___ mistakes", 0], ["___ feedback", 1]], "Исчисляемые vs неисчисляемые.", "ARTICLE_DETERMINER"),
M("qc-037 qc-comparative 3 C1", "Выберите 2 верных предложения.", ["This plan is far more realistic.", true, "Far + comparative."], ["It's not as complicated as it looks.", true, "Not as ... as."], ["This plan is very more realistic.", false, "Very не с comparative.", "FORM"], ["It's more simpler than I thought.", false, "Двойная степень.", "FORM"], ["She's the most talented of the company.", false, "In the company.", "PREPOSITION"]),
S("qc-038 qc-count 2 C1", "Quite ___ people attended — more than we expected.", ["a few", "Quite a few = довольно много."], ["few", "Quite few — нестандартно.", "ARTICLE_DETERMINER"], ["a little", "Неисчисляемое.", "ARTICLE_DETERMINER"], ["little", "Неисчисляемое.", "ARTICLE_DETERMINER"]),
S("qc-039 qc-all-each 2 C1", "___ of the two candidates has strong experience.", ["Each", "Each of + мн., глагол ед. ч."], ["Every", "Every of — нет.", "STRUCTURE"], ["All", "All of the two — неестественно, и глагол has.", "AGREEMENT"], ["Both", "Both + have.", "AGREEMENT"]),
S("qc-040 qc-superlative 2 B2", "It was the best day ___ my career.", ["of", "Of + период."], ["on", "Нет.", "PREPOSITION"], ["from", "Нет.", "PREPOSITION"], ["at", "Нет.", "PREPOSITION"])
];
export const quantifiers = block({ id: "quantifiers", n: 16, title: "Quantifiers / Comparison", short: "much/many, some/any, both/either, степени сравнения", blueprint: { size: 24, theory: 6 } }, qcL, qcP);
