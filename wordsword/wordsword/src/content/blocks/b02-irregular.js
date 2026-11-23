import { S, TS, M, I, MA, O, FX, L, p, h, f, tip, warn, tb, ex, block } from "../dsl.js";
import { IRREGULAR } from "../vocab/irregular.js";

const lessons = [
L("irr-roles", "V1, V2, V3: где работает каждая форма", "Знать, какая форма нужна в каждой конструкции, и строить правильные глаголы по -ed.", [
  p("У каждого глагола три опорные формы. **V1** — начальная (инфинитив, настоящее время, после do/does/did и модальных). **V2** — Past Simple в утверждении. **V3** (причастие прошедшего времени) — во всех Perfect-формах (_have/had/will have + V3_) и в пассиве (_be + V3_), а также как определение (_a broken link_)."),
  tb(["Форма", "Где используется", "Пример"], [
    ["V1", "Present Simple, после do/did/модальных, инфинитив", "Did you see it? You should see it."],
    ["V2", "Past Simple (утверждение)", "I saw it yesterday."],
    ["V3", "Perfect, пассив, причастие-определение", "I've seen it. It was seen. The seen files."]
  ]),
  p("У **правильных** глаголов V2 = V3 = V1 + -ed (с правилами орфографии: _stop → stopped, try → tried, plan → planned_). У **неправильных** формы нужно помнить, но они группируются в повторяющиеся модели — об этом следующие уроки."),
  ex(["I didn't know.", "Я не знал.", "после did — V1, не V2"],
     ["The report was written by Anna.", "Отчёт написан Анной.", "пассив: be + V3"],
     ["She has gone home.", "Она ушла домой.", "Perfect: has + V3"]),
  warn("Самая частая ошибка — V2 вместо V3 после have/be: ~~has went~~, ~~was wrote~~.")
], [
  TS("irr-t01 irr-roles 1 B2", "Почему в «Did you saw the email?» ошибка?",
    ["После did основной глагол стоит в V1: Did you see...?", "Прошедшее время уже выражено did; второй раз его не показывают."],
    ["Потому что нужен V3: Did you seen?", "V3 после did не используется.", "FORM"],
    ["Потому что see — правильный глагол.", "See — неправильный, но дело не в этом.", "FORM"],
    ["Ошибки нет.", "Двойное прошедшее (did + V2) — ошибка.", "AUXILIARY"],
    { ce: "I saw the email — в утверждении без did нужен V2." }),
  TS("irr-t02 irr-roles 2 B2", "В какой конструкции нужен V3?",
    ["В пассиве: The decision was made yesterday.", "Пассив = be + V3."],
    ["После модального: You must made it.", "После модального — V1.", "FORM"],
    ["В Past Simple: I made it.", "Past Simple — V2 (у make V2 = V3, но роль разная).", "THEORY"],
    ["После did: Did you made it?", "После did — V1.", "FORM"],
    { ce: "You must make it — после must V1." }),
  TS("irr-t03 irr-roles 2 B2", "Почему у глагола make нельзя по одной форме made понять, V2 это или V3?",
    ["У модели ABB формы V2 и V3 совпадают; роль определяется конструкцией (have made / made).", "Функцию формы показывает окружение: вспомогательный have/be или его отсутствие."],
    ["Потому что make — правильный глагол.", "Make неправильный (не makeed).", "FORM"],
    ["Потому что made — это V1.", "V1 — make.", "FORM"],
    ["Потому что у make нет V3.", "V3 есть: made.", "FORM"],
    { ce: "У take формы различаются: took (V2) / taken (V3) — роль видна сразу." })
]),
L("irr-aaa", "Модель AAA: cut — cut — cut", "Узнавать глаголы с тремя одинаковыми формами и определять время по контексту.", [
  p("У глаголов модели **AAA** все три формы совпадают: _cut, put, set, let, hit, cost, shut, hurt, spread, split, bet, upset, broadcast, quit (AmE)_. Время определяется по контексту: подлежащее в 3-м лице без -s, маркеры времени, вспомогательные."),
  tb(["Предложение", "Время", "Подсказка"], [
    ["She puts the files in the folder every Friday.", "Present Simple", "-s и every Friday"],
    ["She put the files in the folder yesterday.", "Past Simple", "yesterday; нет -s у she"],
    ["She has put the files in the folder.", "Present Perfect", "has + V3"]
  ]),
  ex(["The update cost us two days.", "Обновление стоило нам двух дней.", "Past Simple"],
     ["How much does it cost?", "Сколько это стоит?", "Present Simple"]),
  tip("Если подлежащее he/she/it, а у глагола нет -s, — это прошедшее время: _He let me go._")
], [
  TS("irr-t04 irr-aaa 2 B2", "Как понять время в «He cut the budget»?",
    ["У he нет -s у глагола → это прошедшее (Past Simple).", "В настоящем было бы He cuts."],
    ["Это Present Simple.", "В Present Simple с he нужно cuts.", "AGREEMENT"],
    ["Время определить невозможно.", "Отсутствие -s с he — ясный признак.", "THEORY"],
    ["Это Present Perfect.", "Нет has.", "AUXILIARY"],
    { ce: "They cut the budget — без контекста время неочевидно: с they -s не появляется." }),
  TS("irr-t05 irr-aaa 1 B2", "Какой глагол НЕ относится к модели AAA?",
    ["sit — sat — sat", "Sit меняет гласную (ABB)."],
    ["put — put — put", "AAA.", "FORM"],
    ["let — let — let", "AAA.", "FORM"],
    ["hurt — hurt — hurt", "AAA.", "FORM"],
    { ce: "set — set — set: AAA, несмотря на сходство с sit." }),
  TS("irr-t06 irr-aaa 2 C1", "Почему «They upsetted the client» — ошибка?",
    ["Upset — глагол модели AAA: upset — upset — upset.", "Окончание -ed к нему не добавляется."],
    ["Нужно upsat.", "Такой формы нет.", "FORM"],
    ["Upset — только прилагательное.", "Это и глагол.", "THEORY"],
    ["Нужно have upset.", "Present Perfect возможен, но ошибка в форме upsetted.", "FORM"],
    { ce: "The delay upset the client — Past Simple." })
]),
L("irr-abb", "Модель ABB: V2 = V3", "Запомнить крупнейшую группу неправильных глаголов по подгруппам звучания.", [
  p("В модели **ABB** V2 и V3 совпадают. Её удобно учить по звуковым подгруппам:"),
  tb(["Подгруппа", "Глаголы"], [
    ["-ought / -aught", "bring — brought, buy — bought, think — thought, fight — fought, seek — sought; catch — caught, teach — taught"],
    ["-d → -t", "send — sent, spend — spent, lend — lent, build — built, bend — bent"],
    ["ee/ea → e + t", "keep — kept, sleep — slept, feel — felt, leave — left, meet — met, mean — meant, deal — dealt"],
    ["-ay → -aid", "say — said, pay — paid, lay — laid"],
    ["-ind / -old / -and", "find — found, hold — held, stand — stood, understand — understood"],
    ["другие", "sell — sold, tell — told, lose — lost, win — won, sit — sat, get — got, have — had, make — made, hear — heard, lead — led, feed — fed"]
  ]),
  ex(["We've bought new licences.", "Мы купили новые лицензии.", "/bɔːt/"],
     ["She taught me the basics.", "Она научила меня основам.", "/tɔːt/"]),
  warn("Орфография: paid, laid, said — без y: ~~payed~~, ~~layed~~, ~~sayed~~.")
], [
  TS("irr-t07 irr-abb 2 B2", "Почему «I payed the invoice» — ошибка?",
    ["Pay — неправильный глагол: pay — paid — paid.", "Как say — said и lay — laid."],
    ["Нужно pied.", "Такой формы нет.", "SPELLING"],
    ["Нужно have payed.", "Форма payed неверна в любом времени.", "FORM"],
    ["Ошибки нет.", "Payed используется лишь в узком морском значении; в обычном — paid.", "SPELLING"],
    { ce: "play — played — played: правильный глагол, -ed с y сохраняется." }),
  TS("irr-t08 irr-abb 2 B2", "Чем различаются brought и bought?",
    ["Brought — от bring (принести), bought — от buy (купить).", "Похожие формы разных глаголов: проверяйте по V1."],
    ["Это варианты одного глагола.", "Это разные глаголы.", "VOCAB_MEANING"],
    ["Brought — BrE, bought — AmE.", "Не варианты.", "VOCAB_MEANING"],
    ["Bought — V3, brought — V2 от buy.", "Неверно.", "FORM"],
    { ce: "I bought a coffee (купил) / I brought a coffee (принёс)." }),
  TS("irr-t09 irr-abb 1 B2", "Какая пара форм верна для leave?",
    ["left — left", "Leave — left — left (ABB)."],
    ["leaved — leaved", "Неправильный глагол.", "FORM"],
    ["left — leften", "Формы leften нет.", "FORM"],
    ["lived — lived", "Это формы live (жить).", "VOCAB_MEANING"],
    { ce: "Live — lived — lived (правильный); leave — left — left (неправильный)." })
]),
L("irr-abc", "Модель ABC: все формы разные", "Освоить глаголы с тремя разными формами по звуковым моделям.", [
  p("В модели **ABC** все три формы различаются. Основные звуковые модели:"),
  tb(["Модель", "Примеры"], [
    ["i — a — u", "begin — began — begun, drink — drank — drunk, ring — rang — rung, sing — sang — sung, sink — sank — sunk, swim — swam — swum, shrink — shrank — shrunk"],
    ["V2 + -n / V1 + -n", "speak — spoke — spoken, break — broke — broken, choose — chose — chosen, freeze — froze — frozen, steal — stole — stolen, wake — woke — woken; take — took — taken, give — gave — given, eat — ate — eaten, fall — fell — fallen"],
    ["-ew — -own", "know — knew — known, grow — grew — grown, throw — threw — thrown, blow — blew — blown, fly — flew — flown, draw — drew — drawn"],
    ["i — o — i…en", "write — wrote — written, drive — drove — driven, ride — rode — ridden, rise — rose — risen"],
    ["особые", "be — was/were — been, go — went — gone, do — did — done, see — saw — seen, wear — wore — worn, tear — tore — torn, lie — lay — lain"]
  ]),
  ex(["Prices have risen.", "Цены выросли.", "rise — rose — risen"],
     ["I've never flown business class.", "Я никогда не летал бизнес-классом.", "fly — flew — flown"]),
  warn("Самые частые ошибки: ~~has went~~ (→ has gone), ~~was began~~ (→ had begun/began), ~~I have drank~~ (→ drunk).")
], [
  TS("irr-t10 irr-abc 2 B2", "Почему «The meeting has began» — ошибка?",
    ["После has нужен V3: begun.", "Began — V2 (Past Simple)."],
    ["Нужно has begin.", "После has не V1.", "FORM"],
    ["Нужно has beginned.", "Неправильный глагол.", "FORM"],
    ["Ошибки нет.", "Began — V2.", "FORM"],
    { ce: "The meeting began at 10 — Past Simple, V2." }),
  TS("irr-t11 irr-abc 2 B2", "Какая модель у swim?",
    ["i — a — u: swim — swam — swum", "Как begin, drink, sing."],
    ["swim — swum — swum", "V2 — swam.", "FORM"],
    ["swim — swimmed — swimmed", "Неправильный глагол.", "FORM"],
    ["swim — swam — swam", "V3 — swum.", "FORM"],
    { ce: "bring — brought — brought: не i-a-u, хотя похоже на ring." }),
  TS("irr-t12 irr-abc 3 C1", "Почему «I have went» особенно частая ошибка, и как её запомнить?",
    ["Went — V2 от go и исторически от другого глагола; V3 — gone, его нужно запомнить отдельно.", "Go образует V2 от другого корня (wend), поэтому аналогия не работает."],
    ["Потому что went — V3 в AmE.", "Ни в одном стандарте went не является V3.", "FORM"],
    ["Потому что go — правильный глагол.", "Go неправильный.", "FORM"],
    ["Потому что нужно have goed.", "Goed не существует.", "FORM"],
    { ce: "I have been to Rome (был и вернулся) vs I have gone (ушёл)." })
]),
L("irr-aba", "Модель ABA: come — came — come", "Не путать V1 и V3 у глаголов, где они совпадают.", [
  p("В модели **ABA** V1 и V3 совпадают: _come — came — come, become — became — become, run — ran — run, overcome — overcame — overcome_. Ошибка — использовать V2 после have: ~~has became~~."),
  ex(["She has become a partner.", "Она стала партнёром.", "has + become (V3)"],
     ["They have run the test twice.", "Они дважды прогнали тест.", "has + run (V3)"]),
  tip("Проверяйте по вспомогательному: после have/has/had и be — форма, совпадающая с V1.")
], [
  TS("irr-t13 irr-aba 1 B2", "Какая форма верна: «He has ___ head of sales»?",
    ["become", "Become — became — become: V3 совпадает с V1."],
    ["became", "V2 после has не используется.", "FORM"],
    ["becomed", "Неправильный глагол.", "FORM"],
    ["becoming", "Has becoming — неверно.", "FORM"],
    { ce: "He became head of sales in 2022 — Past Simple: V2." }),
  TS("irr-t14 irr-aba 2 B2", "Как отличить V1 от V3 в «I have run the report»?",
    ["По вспомогательному have: после него — V3 (run).", "Форма совпадает, функция видна из конструкции."],
    ["Это V1, потому что форма run.", "Совпадение формы не означает V1.", "THEORY"],
    ["Нужно have ran.", "Ran — V2.", "FORM"],
    ["Отличить невозможно.", "Конструкция всегда подсказывает.", "THEORY"],
    { ce: "I run the report every Monday — без have: V1." }),
  TS("irr-t15 irr-aba 2 B2", "Какой глагол относится к модели ABA?",
    ["overcome", "Overcome — overcame — overcome."],
    ["overtake", "Overtake — overtook — overtaken (ABC).", "FORM"],
    ["understand", "Understand — understood — understood (ABB).", "FORM"],
    ["forget", "Forget — forgot — forgotten (ABC).", "FORM"],
    { ce: "become — became — become: как и все производные от come." })
]),
L("irr-variants", "Варианты: BrE / AmE и двойные формы", "Знать, какие варианты форм равноправны, а какие ограничены регистром или значением.", [
  p("У ряда глаголов есть **две допустимые формы**: британский вариант на -t и общий на -ed: _learnt/learned, burnt/burned, dreamt/dreamed, spelt/spelled, spilt/spilled, smelt/smelled, leant/leaned_. В американском английском почти всегда -ed."),
  tb(["Глагол", "BrE", "AmE", "Комментарий"], [
    ["get", "got — got", "got — gotten", "have got = иметь (BrE); have gotten = получил/стал (AmE)"],
    ["prove", "proved — proved", "proved — proven", "proven — также прилагательное: a proven method"],
    ["dive", "dived", "dove / dived", "dove — разговорное AmE"],
    ["quit", "quit / quitted", "quit", "quitted — редко"],
    ["light", "lit", "lit / lighted", "lighted — чаще как прилагательное"]
  ]),
  ex(["I've learnt a lot. / I've learned a lot.", "Я многому научился.", "обе формы верны"],
     ["She's gotten much better at Excel. (AmE)", "Она стала гораздо лучше разбираться в Excel.", "BrE: She's got much better"]),
  tip("В заданиях на ввод приложение принимает оба варианта, если они стандартны.")
], [
  TS("irr-t16 irr-variants 2 B2", "Верно ли «I've learnt a lot this year»?",
    ["Да, learnt — стандартная британская форма, наравне с learned.", "Обе формы допустимы."],
    ["Нет, только learned.", "Learnt — стандарт BrE.", "THEORY"],
    ["Нет, нужно learned only in Past Simple.", "Ограничения нет.", "THEORY"],
    ["Да, но только в AmE.", "Наоборот: -t — BrE.", "THEORY"],
    { ce: "В AmE learnt звучит непривычно; learned — универсально." }),
  TS("irr-t17 irr-variants 3 C1", "Чем отличаются «I've got a car» и «I've gotten a car» в AmE?",
    ["Have got = иметь (состояние); have gotten = получил/приобрёл (результат).", "В AmE gotten — V3 в динамическом значении."],
    ["Ничем.", "Значение различается.", "MEANING"],
    ["Gotten — ошибка.", "В AmE — стандарт.", "THEORY"],
    ["Got — только BrE.", "Have got используется и в AmE.", "THEORY"],
    { ce: "BrE: I've got a car (имею) — и для «получил» тоже got." }),
  TS("irr-t18 irr-variants 2 C1", "Почему «a proven track record» звучит естественнее, чем «a proved track record»?",
    ["Proven — предпочтительная форма как прилагательное перед существительным.", "Как глагольная форма proved и proven обе возможны."],
    ["Proved — ошибочная форма.", "Proved — нормальная V2/V3.", "FORM"],
    ["Proven — только AmE V2.", "V2 — proved.", "FORM"],
    ["Никакой разницы нет.", "В роли прилагательного proven заметно частотнее.", "COLLOCATION"],
    { ce: "It has been proved / proven that... — обе формы встречаются." })
]),
L("irr-confusing", "Пары-ловушки: lie/lay, rise/raise, fall/fell, find/found", "Различать глаголы с пересекающимися формами по значению и переходности.", [
  p("Некоторые пары путают, потому что формы одного глагола совпадают с формами другого."),
  tb(["Глагол", "Формы", "Значение", "Объект"], [
    ["lie", "lie — lay — lain", "лежать", "без объекта"],
    ["lay", "lay — laid — laid", "класть", "с объектом: lay sth"],
    ["lie (лгать)", "lie — lied — lied", "лгать", "правильный"],
    ["rise", "rise — rose — risen", "подниматься (само)", "без объекта"],
    ["raise", "raise — raised — raised", "поднимать (что-то)", "с объектом"],
    ["fall", "fall — fell — fallen", "падать", "без объекта"],
    ["fell", "fell — felled — felled", "рубить (дерево)", "с объектом"],
    ["find", "find — found — found", "находить", ""],
    ["found", "found — founded — founded", "основывать", "с объектом"]
  ]),
  ex(["He lay on the sofa all day.", "Он весь день лежал на диване.", "lay = V2 от lie"],
     ["She laid the papers on the desk.", "Она положила бумаги на стол.", "laid = V2 от lay"],
     ["The company was founded in 1998.", "Компания основана в 1998 году.", "found — правильный"]),
  warn("Lay — одновременно V1 «класть» и V2 «лежал». Смотрите на наличие объекта.")
], [
  TS("irr-t19 irr-confusing 2 C1", "Почему верно «Yesterday I lay in bed all morning», а не «laid»?",
    ["Lie (лежать) — lay — lain; объекта нет, поэтому V2 от lie: lay.", "Laid — V2 от lay (класть), требует объекта."],
    ["Laid тоже верно в этом значении.", "Laid требует объекта: laid the book.", "FORM"],
    ["Нужно lied.", "Lied — от lie (лгать).", "VOCAB_MEANING"],
    ["Нужно lain.", "Lain — V3, нужен have.", "FORM"],
    { ce: "Yesterday I laid the book on the bed — есть объект: laid." }),
  TS("irr-t20 irr-confusing 2 B2", "Почему «The company raised by 10%» звучит неверно?",
    ["Raise требует объекта; «вырасти» без объекта — rise: The company's revenue rose by 10%.", "Rise — непереходный, raise — переходный."],
    ["Нужно raisen.", "Raise — правильный глагол.", "FORM"],
    ["Нужно has raised.", "Перфект не исправляет отсутствие объекта.", "FORM"],
    ["Ошибки нет.", "Без объекта raise не используется.", "VOCAB_MEANING"],
    { ce: "The company raised prices by 10% — есть объект." }),
  TS("irr-t21 irr-confusing 2 B2", "Что значит «The firm was found in 1990»?",
    ["Буквально «фирму нашли в 1990» — для «основана» нужно was founded.", "Found (основывать) — правильный: founded."],
    ["Фирма основана в 1990.", "Это смысл was founded.", "VOCAB_MEANING"],
    ["Фирма закрылась в 1990.", "Нет.", "VOCAB_MEANING"],
    ["Ошибки нет.", "Found как V3 от find означает «найдена».", "VOCAB_MEANING"],
    { ce: "The firm was founded in 1990." })
]),
L("irr-pron", "Произношение форм и окончание -ed", "Правильно произносить частые неправильные формы и -ed у правильных глаголов.", [
  p("Многие неправильные формы читаются не так, как пишутся: _read_ /red/ (V2, V3), _said_ /sed/, _meant_ /ment/, _dealt_ /delt/, _bought, brought, thought, caught, taught_ — /ɔːt/, _won_ /wʌn/, _done_ /dʌn/."),
  tb(["Окончание -ed у правильных", "Когда", "Примеры"], [
    ["/t/", "после глухих звуков (p, k, f, s, ʃ, tʃ)", "worked, stopped, fixed, watched"],
    ["/d/", "после звонких и гласных", "planned, called, played, changed"],
    ["/ɪd/", "после t и d", "wanted, needed, started, decided"]
  ]),
  ex(["I've read it twice. /red/", "Я прочитал это дважды.", ""],
     ["We started at nine. /ˈstɑːtɪd/", "Мы начали в девять.", "лишний слог только после t/d"]),
  tip("Приложение не проверяет произношение голосом: оно не может надёжно оценить речь офлайн. Здесь — только теория и задания на распознавание.")
], [
  TS("irr-t22 irr-pron 2 B2", "В каком слове -ed произносится как отдельный слог /ɪd/?",
    ["decided", "После d — /ɪd/."],
    ["worked", "После k — /t/.", "THEORY"],
    ["played", "После гласного — /d/.", "THEORY"],
    ["changed", "После /dʒ/ — /d/.", "THEORY"],
    { ce: "wanted — тоже /ɪd/ (после t)." }),
  TS("irr-t23 irr-pron 2 B2", "Как произносится read в «I read it yesterday»?",
    ["/red/ — как red", "V2 и V3 от read пишутся так же, но читаются /red/."],
    ["/riːd/ — как reed", "Это V1.", "THEORY"],
    ["/reɪd/", "Не существует.", "THEORY"],
    ["/rɪd/", "Не существует.", "THEORY"],
    { ce: "I read every day /riːd/ — Present Simple." }),
  TS("irr-t24 irr-pron 3 C1", "Почему «I've won» и «one» звучат одинаково?",
    ["Won произносится /wʌn/ — так же, как one.", "Орфография не отражает звук."],
    ["Потому что won — ошибка написания one.", "Это разные слова.", "SPELLING"],
    ["Они звучат по-разному: /wɒn/ и /wʌn/.", "Стандартное произношение won — /wʌn/.", "THEORY"],
    ["Потому что win — правильный глагол.", "Win неправильный.", "FORM"],
    { ce: "Want /wɒnt/ — другой гласный." })
])
];

const practice = [
I("irr-001 irr-roles 1 B2", "Have you ever ___ (eat) sushi?", ["eaten"], "Have + V3: eat — ate — eaten.", "FORM", [[["ate"], "FORM", "Ate — V2; после have нужен V3."], [["eated"], "FORM", "Eat — неправильный глагол."]]),
I("irr-002 irr-roles 1 B2", "Did you ___ (send) the invoice?", ["send"], "После did — V1.", "FORM", [[["sent"], "FORM", "После did — V1, а не V2."], [["sended"], "FORM", "Send — неправильный, и после did всё равно V1."]]),
S("irr-003 irr-roles 1 B2", "The contract was ___ by both parties.",
  ["signed", "Пассив: was + V3 (правильный глагол)."], ["sign", "После was нужен V3.", "FORM"], ["signing", "Was signing — Past Continuous актив.", "FORM"], ["sang", "Это V2 от sing.", "VOCAB_MEANING"]),
FX("irr-004 irr-roles 1 B2", "Найдите и исправьте ошибку.", ["The report", { t: "was wrote", fix: ["was written"], tag: "FORM" }, "by our analyst", "last week."], "Пассив: was + V3 (written)."),
S("irr-005 irr-aaa 1 B2", "Last year the company ___ prices twice.",
  ["cut", "AAA: cut — cut — cut; last year → Past Simple."], ["cutted", "Cut — неправильный.", "FORM"], ["cuts", "-s — настоящее время.", "TIMELINE"], ["has cut", "Last year несовместим с Present Perfect.", "TIMELINE"]),
I("irr-006 irr-aaa 1 B2", "My manager ___ (let) me leave early yesterday.", ["let"], "AAA: let — let — let.", "FORM", [[["letted"], "FORM", "Let — неправильный."], [["lets"], "TIMELINE", "Yesterday → прошедшее."]]),
S("irr-007 irr-aaa 2 B2", "How much did the repairs ___?",
  ["cost", "После did — V1 (cost)."], ["costed", "Cost (стоить) — неправильный AAA.", "FORM"], ["costs", "После did — без -s.", "AGREEMENT"], ["costing", "Нужна форма V1.", "FORM"]),
FX("irr-008 irr-aaa 2 B2", "Найдите и исправьте ошибку.", ["The rumour", { t: "spreaded", fix: ["spread"], tag: "FORM" }, "quickly", "across the office."], "Spread — AAA."),
S("irr-009 irr-abb 1 B2", "I ___ a new laptop last week.",
  ["bought", "Buy — bought — bought."], ["brought", "Это от bring.", "VOCAB_MEANING"], ["buyed", "Buy — неправильный.", "FORM"], ["buy", "Нужна форма прошедшего.", "FORM"]),
I("irr-010 irr-abb 1 B2", "She ___ (teach) English in Spain for two years.", ["taught"], "Teach — taught — taught.", "FORM", [[["teached"], "FORM", "Teach — неправильный."], [["thought"], "VOCAB_MEANING", "Thought — от think."]]),
I("irr-011 irr-abb 2 B2", "We have ___ (spend) too much on travel this quarter.", ["spent"], "Spend — spent — spent.", "FORM", [[["spended"], "FORM", "Spend — неправильный."]]),
FX("irr-012 irr-abb 1 B2", "Найдите и исправьте ошибку.", ["We", { t: "payed", fix: ["paid"], tag: "SPELLING" }, "the supplier", "on time."], "Pay — paid — paid."),
S("irr-013 irr-abb 2 B2", "I've ___ about your proposal and I like it.",
  ["thought", "Think — thought — thought."], ["thinked", "Think — неправильный.", "FORM"], ["taught", "Это от teach.", "VOCAB_MEANING"], ["thank", "Это другой глагол.", "VOCAB_MEANING"]),
I("irr-014 irr-abb 2 B2", "The conference was ___ (hold) in Almaty.", ["held"], "Hold — held — held.", "FORM", [[["holded"], "FORM", "Hold — неправильный."], [["hold"], "FORM", "После was нужен V3."]]),
S("irr-015 irr-abb 2 B2", "They ___ the tender, so we've lost the contract.",
  ["won", "Win — won — won."], ["winned", "Win — неправильный.", "FORM"], ["win", "Нужна форма прошедшего.", "FORM"], ["wan", "Такой формы нет.", "FORM"]),
S("irr-016 irr-abc 1 B2", "The meeting had already ___ when I arrived.",
  ["begun", "Had + V3: begin — began — begun."], ["began", "V2 после had не используется.", "FORM"], ["beginned", "Неправильный глагол.", "FORM"], ["begin", "После had нужен V3.", "FORM"]),
I("irr-017 irr-abc 1 B2", "I've ___ (write) three drafts already.", ["written"], "Write — wrote — written.", "FORM", [[["wrote"], "FORM", "V2 после have не используется."], [["writen"], "SPELLING", "Двойная t: written."]]),
I("irr-018 irr-abc 1 B2", "Have you ___ (speak) to the client yet?", ["spoken"], "Speak — spoke — spoken.", "FORM", [[["spoke"], "FORM", "Spoke — V2."], [["speaked"], "FORM", "Speak — неправильный."]]),
FX("irr-019 irr-abc 1 B2", "Найдите и исправьте ошибку.", ["She", { t: "has went", fix: ["has gone"], tag: "FORM" }, "to the bank."], "Go — went — gone."),
S("irr-020 irr-abc 2 B2", "Our team has ___ from 5 to 40 people.",
  ["grown", "Grow — grew — grown."], ["grew", "V2 после has не используется.", "FORM"], ["growed", "Неправильный глагол.", "FORM"], ["growing", "Has growing — неверно.", "FORM"]),
I("irr-021 irr-abc 2 B2", "I've never ___ (fly) business class.", ["flown"], "Fly — flew — flown.", "FORM", [[["flew"], "FORM", "V2."], [["flied"], "FORM", "Fly — неправильный."]]),
S("irr-022 irr-abc 2 B2", "My bike was ___ outside the office.",
  ["stolen", "Пассив: steal — stole — stolen."], ["stole", "V2 в пассиве не используется.", "FORM"], ["stealed", "Неправильный.", "FORM"], ["steal", "После was — V3.", "FORM"]),
I("irr-023 irr-abc 2 B2", "Prices have ___ (rise) by 8% this year.", ["risen"], "Rise — rose — risen.", "FORM", [[["rose"], "FORM", "V2."], [["raised"], "VOCAB_MEANING", "Raise требует объекта (поднимать что-то)."], [["rised"], "FORM", "Rise — неправильный."]]),
FX("irr-024 irr-abc 2 B2", "Найдите и исправьте ошибку.", ["I", "have", { t: "drank", fix: ["drunk"], tag: "FORM" }, "four coffees today."], "Drink — drank — drunk."),
S("irr-025 irr-aba 1 B2", "She has ___ one of our best engineers.",
  ["become", "Become — became — become."], ["became", "V2 после has.", "FORM"], ["becomed", "Неправильный.", "FORM"], ["becoming", "Неверно после has.", "FORM"]),
I("irr-026 irr-aba 2 B2", "We had ___ (run) out of time before we reached the last slide.", ["run"], "Run — ran — run (ABA).", "FORM", [[["ran"], "FORM", "Ran — V2."], [["runned"], "FORM", "Run — неправильный."]]),
FX("irr-027 irr-aba 2 B2", "Найдите и исправьте ошибку.", ["Many guests", "had", { t: "came", fix: ["come"], tag: "FORM" }, "from abroad."], "Come — came — come."),
S("irr-028 irr-variants 2 B2", "Which sentence is NOT standard English?",
  ["She has went to Paris.", "Went — V2; V3 — gone."], ["I've learnt a lot.", "Стандарт BrE.", "THEORY"], ["I've learned a lot.", "Стандарт.", "THEORY"], ["The toast is burnt.", "Стандарт.", "THEORY"]),
M("irr-029 irr-variants 3 C1", "Выберите 2 стандартные формы Past Simple от dream.",
  ["dreamt", true, "BrE."], ["dreamed", true, "BrE и AmE."], ["drempt", false, "Не существует.", "SPELLING"], ["drame", false, "Не существует.", "FORM"], ["dreamen", false, "Не существует.", "FORM"]),
S("irr-030 irr-variants 2 C1", "(AmE) Her English has ___ much better since she moved to Boston.",
  ["gotten", "AmE: get — got — gotten в значении «стать»."], ["getted", "Неправильный глагол.", "FORM"], ["gotted", "Не существует.", "FORM"], ["get", "После has нужен V3.", "FORM"],
  { note: "В BrE: has got much better." }),
S("irr-031 irr-confusing 2 C1", "She ___ the documents on the desk and left.",
  ["laid", "Lay (класть) — laid — laid; есть объект."], ["lay", "Lay как V2 — от lie (лежать), без объекта.", "VOCAB_MEANING"], ["lied", "Lied — от lie (лгать).", "VOCAB_MEANING"], ["layed", "Орфография: laid.", "SPELLING"]),
S("irr-032 irr-confusing 2 C1", "I was so tired that I ___ down for an hour.",
  ["lay", "Lie (лежать) — lay — lain; без объекта."], ["laid", "Laid требует объекта.", "VOCAB_MEANING"], ["lied", "Это «лгал».", "VOCAB_MEANING"], ["lain", "V3 требует had.", "FORM"]),
S("irr-033 irr-confusing 2 B2", "The company was ___ in 2009 by two former bankers.",
  ["founded", "Found (основывать) — founded — founded."], ["found", "Found = V3 от find (найдена).", "VOCAB_MEANING"], ["finded", "Не существует.", "FORM"], ["funded", "Funded — профинансирована (другой глагол).", "VOCAB_MEANING"]),
S("irr-034 irr-confusing 2 B2", "Inflation ___ sharply last month.",
  ["rose", "Rise — rose — risen; без объекта."], ["raised", "Raise требует объекта.", "VOCAB_MEANING"], ["rised", "Неправильный глагол.", "FORM"], ["arose", "Arose = возник (проблема), не «вырос».", "VOCAB_MEANING"]),
S("irr-035 irr-confusing 3 C1", "The government has ___ taxes again.",
  ["raised", "Raise + объект (taxes)."], ["risen", "Rise без объекта.", "VOCAB_MEANING"], ["rose", "V2 и без объекта.", "FORM"], ["arisen", "Arise — возникать.", "VOCAB_MEANING"]),
MA("irr-036 irr-abc 2 B2", "Распределите глаголы по моделям.", ["AAA", "ABB", "ABA", "ABC"], [
  ["put", 0], ["shut", 0], ["bring", 1], ["keep", 1], ["come", 2], ["run", 2], ["write", 3], ["know", 3]],
  "AAA — все формы одинаковы; ABB — V2=V3; ABA — V1=V3; ABC — все разные.", "FORM"),
MA("irr-037 irr-pron 2 B2", "Распределите по произношению окончания -ed.", ["/t/", "/d/", "/ɪd/"], [
  ["worked", 0], ["fixed", 0], ["called", 1], ["planned", 1], ["needed", 2], ["started", 2]],
  "После t/d — /ɪd/; после глухих — /t/; после звонких и гласных — /d/.", "THEORY"),
S("irr-038 irr-pron 2 B2", "Which form is pronounced /sed/?",
  ["said", "Said произносится /sed/."], ["sad", "Это прилагательное /sæd/.", "VOCAB_MEANING"], ["sayed", "Ошибочная форма.", "SPELLING"], ["seed", "Это другое слово.", "VOCAB_MEANING"]),
O("irr-039 irr-roles 2 B2", "Постройте пассивное предложение: «Решение было принято вчера».", ["The", "decision", "was", "made", "yesterday"], "Пассив Past Simple: was + V3 (made).", "STRUCTURE"),
O("irr-040 irr-abc 2 B2", "Постройте: «Ты когда-нибудь видел северное сияние?»", ["Have", "you", "ever", "seen", "the", "northern", "lights", "?"], "Have + подлежащее + ever + V3 (seen).", "STRUCTURE"),
I("irr-041 irr-abb 2 C1", "The new manager ___ (seek) advice from the board before making changes.", ["sought"], "Seek — sought — sought.", "FORM", [[["seeked"], "FORM", "Seek — неправильный."], [["saught"], "SPELLING", "Правильно: sought."]]),
I("irr-042 irr-abc 2 C1", "A problem has ___ (arise) with the payment system.", ["arisen"], "Arise — arose — arisen.", "FORM", [[["arose"], "FORM", "V2."], [["arised"], "FORM", "Неправильный."], [["risen"], "VOCAB_MEANING", "Risen — от rise (подниматься)."]]),
I("irr-043 irr-abc 2 C1", "All travel costs will be ___ (bear) by the client.", ["borne"], "Bear (нести расходы) — bore — borne.", "FORM", [[["born"], "SPELLING", "Born — только «рождён»."], [["beared"], "FORM", "Bear — неправильный."]]),
S("irr-044 irr-abc 2 B2", "They ___ the offer at the last minute.",
  ["withdrew", "Withdraw — withdrew — withdrawn."], ["withdrawed", "Неправильный.", "FORM"], ["withdrawn", "V3 без have.", "FORM"], ["withdraw", "Нужно прошедшее.", "FORM"])
];

// Deterministic form drills built from the verb bank (one item per verb per direction).
// Built once when the module loads; nothing is generated during a test.
const ru = v => v.russian.split(";")[0];
const drills = [];
IRREGULAR.forEach(v => {
  drills.push({ id: v.id + "-v2", v: 1, sub: "irr-forms", kind: "practice", type: "input", level: "B2", diff: 1, skill: "form",
    prompt: `${v.v1} (${ru(v)}) → V2 (Past Simple)`, accept: v.v2.slice(), explain: `${v.v1} — ${v.v2.join("/")} — ${v.v3.join("/")}. ${v.usageNotes || ""}`.trim(), tag: "FORM",
    rules: [[v.v3.filter(x => !v.v2.includes(x)), "FORM", "Это V3, а нужна форма Past Simple."], [[v.v1 + "ed", v.v1 + "d"].filter(x => !v.v2.includes(x)), "FORM", "Глагол неправильный: окончание -ed не подходит."]].filter(r => r[0].length), drill: "v1v2", verb: v.id });
  drills.push({ id: v.id + "-v3", v: 1, sub: "irr-forms", kind: "practice", type: "input", level: "B2", diff: 1, skill: "form",
    prompt: `${v.v1} (${ru(v)}) → V3 (Past Participle)`, accept: v.v3.slice(), explain: `${v.v1} — ${v.v2.join("/")} — ${v.v3.join("/")}. ${v.usageNotes || ""}`.trim(), tag: "FORM",
    rules: [[v.v2.filter(x => !v.v3.includes(x)), "FORM", "Это V2, а нужна форма V3."], [[v.v1 + "ed", v.v1 + "d"].filter(x => !v.v3.includes(x)), "FORM", "Глагол неправильный: окончание -ed не подходит."]].filter(r => r[0].length), drill: "v1v3", verb: v.id });
  const shown = v.v3[0] !== v.v1 ? v.v3[0] : v.v2[0];
  if (shown !== v.v1) drills.push({ id: v.id + "-back", v: 1, sub: "irr-forms", kind: "practice", type: "input", level: "B2", diff: 2, skill: "form",
    prompt: `${shown} (${ru(v)}) → V1`, accept: [v.v1], explain: `${v.v1} — ${v.v2.join("/")} — ${v.v3.join("/")}.`, tag: "FORM", rules: [], drill: "back", verb: v.id });
});
const formsLesson = L("irr-forms", "Тренажёр форм V1 → V2 → V3", "Автоматизировать формы всех 120 неправильных глаголов в трёх направлениях.", [
  p("Это банк форм для тренировки в трёх направлениях: **V1 → V2**, **V1 → V3** и **V2/V3 → V1**. В скобках стоит перевод — он снимает неоднозначность (например, _found_ — это и V2 от find, и самостоятельный глагол «основывать»; _lay_ — и «класть», и V2 от lie)."),
  tip("Для вариантов (learnt/learned, got/gotten) принимается любая стандартная форма. В контрольном тесте форменные задания комбинируются с контекстными предложениями.")
], []);
lessons.push(formsLesson);

export default block({ id: "irregular", n: 2, title: "Неправильные глаголы", short: "V1/V2/V3, модели, варианты, ловушки",
  blueprint: { size: 26, theory: 4, drills: 8 } }, lessons, practice.concat(drills));
