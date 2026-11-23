// Case-based tasks, part D: matching/categorisation and ordering for blocks 5–18.
import { MA, O } from "../dsl.js";
const C = (module, ctx, extra = {}) => Object.assign({ kind: "case", module, ctx }, extra);

export const CASES_D = [
MA("cma-11 pas-form 2 B2", "Соотнесите предложение из отчёта с временем пассива.", ["Present Simple", "Present Perfect", "Past Simple", "Present Continuous"], [
  ["Reports are checked weekly.", 0], ["The bug has been fixed.", 1], ["The server was restarted at 3.", 2], ["The data is being migrated.", 3], ["All users have been notified.", 1], ["Backups are stored offsite.", 0]],
  "Время пассива определяется формой be.", "FORM", C("passive", "You are reviewing an IT status report. It describes routine procedures, finished tasks and work in progress.")),
MA("cma-12 gi-verbs 2 B2", "Какая форма нужна после глагола?", ["+ -ing", "+ to V"], [
  ["avoid ___", 0], ["agree ___", 1], ["consider ___", 0], ["afford ___", 1], ["postpone ___", 0], ["promise ___", 1]],
  "Глаголы управления запоминаются вместе с формой.", "FORM", C("gerund", "You are preparing a revision card for a colleague who often confuses verb patterns in emails. Some verbs need -ing after them, and others need to + infinitive.")),
MA("cma-13 art-names 2 B2", "Нужен ли the с названием в программе конференции?", ["С the", "Без артикля"], [
  ["___ Hilton (hotel)", 0], ["___ Madrid", 1], ["___ Netherlands", 0], ["___ Lake Como", 1], ["___ Louvre", 0], ["___ Amazon (company)", 1]],
  "Отели, музеи, страны во мн. ч. — с the; города, озёра, бренды — без.", "ARTICLE_DETERMINER", C("articles", "You are proofreading a conference programme that lists venues, cities and sponsors. Some names need the definite article.")),
MA("cma-14 prep-adj 2 B2", "Какой предлог нужен после прилагательного?", ["in", "of", "for", "with"], [
  ["interested ___", 0], ["aware ___", 1], ["responsible ___", 2], ["familiar ___", 3], ["experienced ___", 0], ["satisfied ___", 3]],
  "Управление прилагательных фиксировано.", "PREPOSITION", C("prepositions", "You are editing job descriptions. Each requirement uses an adjective followed by a preposition.")),
MA("cma-15 rep-verbs 2 C1", "Каким глаголом лучше передать реплику?", ["offer", "refuse", "admit", "warn"], [
  ["«I'll take the notes.»", 0], ["«I won't work this weekend.»", 1], ["«OK, I broke the printer.»", 2], ["«Don't open that attachment.»", 3], ["«Shall I book the room?»", 0], ["«Yes, I missed the deadline.»", 2]],
  "Глагол сообщения передаёт намерение говорящего.", "VOCAB_MEANING", C("reported", "You are writing meeting minutes. Instead of quoting colleagues, you need precise reporting verbs.")),
MA("cma-16 rel-pronouns 2 B2", "Какое местоимение подходит?", ["who", "which", "whose", "where"], [
  ["the client ___ called", 0], ["the tool ___ crashed", 1], ["the manager ___ team won", 2], ["the office ___ I work", 3], ["the candidate ___ we hired", 0], ["the report ___ you sent", 1]],
  "Who — люди, which — вещи, whose — принадлежность, where — место.", "STRUCTURE", C("relative", "You are completing sentences for an internal newsletter about people, tools and places in the company. Each gap needs a different relative word.")),
MA("cma-17 str-order 2 B2", "Верен ли порядок слов?", ["Верно", "Ошибка"], [
  ["She always checks the figures.", 0], ["She checks always the figures.", 1], ["We have never missed a deadline.", 0], ["I like very much this tool.", 1], ["He is often late.", 0], ["I every day read the news.", 1]],
  "Наречие не ставится между глаголом и дополнением; частотные — перед смысловым глаголом и после be.", "STRUCTURE", C("structure", "A colleague asks you to check six sentences from his presentation notes for word order. Three of the sentences are correct and three are not.")),
MA("cma-18 lnk-contrast 2 B2", "Что следует за связкой?", ["Предложение", "Существительное / -ing", "Новое предложение после точки"], [
  ["although", 0], ["despite", 1], ["however", 2], ["in spite of", 1], ["even though", 0], ["nevertheless", 2]],
  "Союзы, предлоги и наречия-связки ведут себя по-разному.", "STRUCTURE", C("linking", "You are building a cheat sheet of contrast words for writing reports. You want to remember what grammar follows each word.")),
MA("cma-19 ph-work 2 B2", "Соотнесите фразовый глагол и значение.", ["отложить", "отменить", "провести", "разобраться"], [
  ["put off", 0], ["call off", 1], ["carry out", 2], ["look into", 3], ["push back", 0], ["sort out", 3]],
  "Фразовые глаголы учатся как отдельные слова.", "VOCAB_MEANING", C("phrasal", "You are making a glossary of phrasal verbs that appear in your team's project emails. Each phrasal verb has a one-word Russian equivalent.")),
MA("cma-20 col-make-do 2 B2", "Make или do?", ["make", "do"], [
  ["___ a decision", 0], ["___ research", 1], ["___ a mistake", 0], ["___ business", 1], ["___ progress", 0], ["___ a favour", 1]],
  "Make — результат/создание; do — работа/действие.", "COLLOCATION", C("collocations", "You are checking an email draft in which the writer used make and do interchangeably. You want to correct every collocation before the email goes out.")),
MA("cma-21 wf-people 2 B2", "Кто это: тот, кто делает, или тот, с кем делают?", ["Делает действие", "Получает действие"], [
  ["employer", 0], ["employee", 1], ["interviewer", 0], ["interviewee", 1], ["trainer", 0], ["trainee", 1]],
  "-er/-or — исполнитель, -ee — получатель действия.", "VOCAB_MEANING", C("wordform", "You are reading an HR policy that describes the roles of different people in the hiring process. Some job titles describe the person who acts, others the person who is affected.")),
MA("cma-22 qc-count 2 B2", "Исчисляемое или неисчисляемое?", ["many / fewer", "much / less"], [
  ["___ invoices", 0], ["___ information", 1], ["___ complaints", 0], ["___ equipment", 1], ["___ suggestions", 0], ["___ advice", 1]],
  "Квантификатор зависит от исчисляемости.", "ARTICLE_DETERMINER", C("quantifiers", "You are reviewing a quarterly summary that compares numbers of items and amounts of resources. You need to check every quantifier before the summary is published.")),
MA("cma-23 adv-future-past 2 C1", "Что произошло с планом?", ["Не осуществился", "Был вот-вот", "Был назначен (исход неясен)"], [
  ["We were going to hire two people, but...", 0], ["I was about to call when you came in.", 1], ["The CEO was to visit our office.", 2], ["The launch was to have happened in May.", 0], ["She was about to resign.", 1], ["The talks were to begin on Monday.", 2]],
  "Was going to / was about to / was to (have).", "MEANING", C("advanced", "You are reading the company history and old meeting notes, which describe plans from the past. You want to understand what actually happened to each plan.")),
MA("cma-24 reg-formal 2 B2", "Формальный или разговорный вариант?", ["Формально", "Разговорно"], [
  ["purchase", 0], ["buy", 1], ["assist", 0], ["help out", 1], ["enquire", 0], ["check with", 1]],
  "Регистр задаётся выбором слова.", "REGISTER", C("register", "You are adapting a chatty internal message into a formal letter for an external client. First you sort the words by register.")),
MA("cma-25 reg-nuance 2 C1", "Подходит ли слово для рекомендации сотруднику?", ["Подходит (позитивно)", "Не подходит (негативно)"], [
  ["determined", 0], ["stubborn", 1], ["assertive", 0], ["bossy", 1], ["confident", 0], ["arrogant", 1]],
  "Синонимы различаются коннотацией.", "VOCAB_MEANING", C("register", "You are writing a reference letter for a former team member and choosing adjectives to describe her. Some synonyms sound positive, while others sound critical.")),
MA("cma-26 pas-causative 2 B2", "Кто выполняет действие?", ["Сам говорящий", "Кто-то другой (услуга)"], [
  ["I repaired my laptop.", 0], ["I had my laptop repaired.", 1], ["We painted the office.", 0], ["We're having the office painted.", 1], ["She cut her hair.", 0], ["She got her hair cut.", 1]],
  "Have/get sth done — услуга.", "MEANING", C("passive", "You are explaining to a colleague the difference between doing something yourself and paying for a service. You use examples from the office and everyday life.")),
MA("cma-27 gi-meaning 2 C1", "Что значит предложение?", ["Действие прекращено / в прошлом", "Цель / будущее действие"], [
  ["He stopped smoking.", 0], ["He stopped to smoke.", 1], ["I remember sending it.", 0], ["Remember to send it.", 1], ["I regret saying that.", 0], ["We regret to inform you...", 1]],
  "Форма после глагола меняет смысл.", "MEANING", C("gerund", "A learner asks you why the same verbs are followed by different forms in several sentences from emails. You decide to sort the sentences by meaning.")),
MA("cma-28 lnk-result 2 B2", "Цель или результат?", ["Результат", "Цель"], [
  ["It was late, so we left.", 0], ["We left early so that we could avoid traffic.", 1], ["Costs rose. As a result, prices increased.", 0], ["I saved it to avoid losing it.", 1], ["The data was wrong; therefore, we stopped.", 0], ["Speak slowly so that everyone understands.", 1]],
  "So / as a result / therefore — результат; so that / to — цель.", "MEANING", C("linking", "You are checking whether the linking words in a report express purpose or result. Purpose and result are easy to confuse in English.")),
MA("cma-29 str-there 2 B2", "There или it?", ["there", "it"], [
  ["___ is a problem with the server.", 0], ["___ is important to back up data.", 1], ["___ are three candidates.", 0], ["___ is raining.", 1], ["___ seems to be a mistake.", 0], ["___ takes two hours to get there.", 1]],
  "There — существование; it — оценка, погода, время, расстояние.", "STRUCTURE", C("structure", "A colleague translates «есть», «важно», «идёт дождь» literally. You sort sentences to show the pattern.")),
MA("cma-30 prep-time 2 B2", "Какой предлог времени?", ["at", "on", "in"], [
  ["___ 9 a.m.", 0], ["___ Monday", 1], ["___ June", 2], ["___ 5 May", 1], ["___ the morning", 2], ["___ night", 0]],
  "At — точка, on — день/дата, in — месяц/часть дня.", "PREPOSITION", C("prepositions", "You are filling in a meeting schedule for international visitors. Each item needs the correct preposition of time.")),
// ---------- ordering ----------
O("co-11 pas-form 2 B2", "Соберите предложение для пресс-релиза.", ["The", "new", "headquarters", "will", "be", "opened", "by", "the", "mayor"], "Future Passive + by-агент (агент важен).", "STRUCTURE", [], C("passive", "Your company is opening a new headquarters. The city mayor will officially open it, and this is newsworthy.")),
O("co-12 gi-prep 2 B2", "Соберите фразу для письма.", ["Thank", "you", "for", "sending", "the", "documents", "so", "quickly"], "For + -ing.", "STRUCTURE", [], C("gerund", "A supplier sent you the contract documents within an hour. You want to thank them at the start of your reply.")),
O("co-13 art-mention 2 B2", "Соберите предложение.", ["The", "report", "you", "sent", "yesterday", "was", "very", "useful"], "The + уточнение придаточным.", "STRUCTURE", [], C("articles", "A colleague sent you a market report yesterday. You want to thank her in the team chat.")),
O("co-14 prep-end 2 B2", "Соберите вопрос.", ["What", "are", "you", "working", "on", "at", "the", "moment", "?"], "Предлог on остаётся у глагола.", "STRUCTURE", [], C("prepositions", "You meet a colleague from another department in the kitchen and want to ask about her current project. You don't know her well, so the question should be friendly and natural.")),
O("co-15 rep-questions 2 B2", "Соберите косвенный вопрос.", ["She", "asked", "me", "where", "the", "meeting", "room", "was"], "Прямой порядок в косвенном вопросе.", "STRUCTURE", [], C("reported", "A visitor asked you: «Where is the meeting room?» Now you are telling a colleague what happened.")),
O("co-16 rel-defining 2 B2", "Соберите предложение.", ["The", "client", "who", "complained", "has", "accepted", "our", "apology"], "Who — подлежащее, нельзя опустить.", "STRUCTURE", [], C("relative", "Last week one client complained about a delay. Today that client accepted your apology. You update your manager.")),
O("co-17 str-cleft 2 C1", "Соберите выделительную фразу.", ["What", "we", "need", "now", "is", "a", "clear", "decision"], "What-cleft.", "STRUCTURE", [], C("structure", "In a long meeting, people keep discussing details. You want to emphasise the one thing the team needs.")),
O("co-18 lnk-contrast 2 B2", "Соберите предложение.", ["Although", "the", "budget", "was", "tight,", "we", "met", "every", "deadline"], "Although + предложение, запятая.", "STRUCTURE", [], C("linking", "Your team had very little money for the project but delivered everything on time. You summarise this in one sentence.")),
O("co-19 ph-separable 2 B2", "Соберите ответ.", ["I'll", "look", "into", "it", "and", "get", "back", "to", "you"], "Look into it (неразделяемый); get back to you.", "STRUCTURE", [], C("phrasal", "A client reports a billing issue. You don't know the answer yet but promise to investigate and reply.")),
O("co-20 col-verb-noun 2 C1", "Соберите предложение.", ["We", "need", "to", "take", "these", "risks", "into", "account"], "Take sth into account.", "STRUCTURE", ["We need to take into account these risks"], C("collocations", "During planning, a colleague lists several risks. You agree that the plan must consider them.")),
O("co-21 wf-spelling 2 B2", "Расположите шаги образования слова «pronunciation» в логичном порядке.", ["Взять глагол pronounce", "Добавить суффикс -tion (через -ciation)", "Убрать o из корня (ou → u)", "Проверить: pronunciation"], "Pronounce → pronunciation: суффикс и изменение корня.", "SPELLING", [], C("wordform", "A colleague keeps writing «pronounciation». You explain step by step how the noun is formed.")),
O("co-22 qc-the-more 2 C1", "Соберите предложение.", ["The", "sooner", "we", "start,", "the", "earlier", "we'll", "finish"], "The + comparative, the + comparative.", "STRUCTURE", [], C("quantifiers", "Your team is debating when to begin a large task. You want to make a short, persuasive point.")),
O("co-23 adv-inversion 2 C1", "Соберите формальное предложение.", ["Only", "after", "the", "audit", "did", "we", "realise", "the", "risk"], "Only after ... + инверсия в главной.", "STRUCTURE", ["Only after the audit did we realize the risk"], C("advanced", "You are writing a formal lessons-learned report. The team understood a risk only after an external audit.")),
O("co-24 reg-requests 2 B2", "Соберите вежливую просьбу.", ["I", "was", "wondering", "if", "you", "could", "share", "the", "slides"], "Косвенная вежливая просьба.", "STRUCTURE", [], C("register", "After a webinar, you want to ask the speaker, whom you don't know, for the slides. Your request should be polite and indirect.")),
O("co-25 pas-report 2 C1", "Соберите предложение для новостной сводки.", ["The", "company", "is", "said", "to", "be", "planning", "a", "merger"], "Sb is said to be + V-ing.", "STRUCTURE", [], C("passive", "Rumours say that a competitor is preparing a merger. Nothing is confirmed. You write a neutral sentence for the internal digest.")),
O("co-26 rep-commands 2 B2", "Соберите пересказ.", ["The", "manager", "told", "us", "not", "to", "share", "the", "file"], "Tell sb not to.", "STRUCTURE", [], C("reported", "Your manager said: «Don't share the file.» A colleague who was absent asks what she said.")),
O("co-27 lnk-sequence 2 B2", "Расположите этапы проекта по порядку (сначала первый).", ["First, we gathered requirements", "Then we built a prototype", "After that, we tested it with users", "Eventually, we launched the product"], "First → then → after that → eventually.", "TIMELINE", [], C("linking", "You are describing the history of a six-month project in a presentation, using sequence words. You list the stages in the order in which they happened.")),
O("co-28 str-questions 2 B2", "Соберите косвенный вопрос.", ["Do", "you", "know", "when", "the", "train", "leaves", "?"], "Прямой порядок после do you know.", "STRUCTURE", [], C("structure", "You are at the station and want to ask a stranger politely about the departure time. You don't want to sound abrupt.")),
O("co-29 gi-object 2 B2", "Соберите предложение.", ["The", "client", "wants", "us", "to", "send", "a", "revised", "quote"], "Want + sb + to.", "STRUCTURE", [], C("gerund", "After a call, you tell your team what the client expects from you next. The client asked for a revised quote by Friday.")),
O("co-30 reg-email 2 B2", "Расположите части формального письма в правильном порядке.", ["Dear Ms Novak,", "I am writing regarding your recent order.", "Please find the invoice attached.", "Kind regards, Ivan Petrov"], "Обращение → цель → основная часть → завершение.", "STRUCTURE", [], C("register", "You are sending an invoice to a client you have not met. The email must have a clear, standard structure."))
];
