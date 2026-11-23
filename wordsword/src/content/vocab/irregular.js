// Irregular verbs. Format: v1 | v2 | v3 | Russian prompt (unambiguous within this list) | plausible WRONG translation |
// example with [[target form]] | Russian example | usage note.  Alternatives are separated by "/" (first = main form).
// Pattern codes for lessons: AAA (cut-cut-cut), ABB (V2=V3), ABA (come-came-come), ABC (all different).
const RAW = `
be|was/were|been|быть, находиться|становиться|She has [[been]] in London since Monday.|Она в Лондоне с понедельника.|was — для I/he/she/it, were — для you/we/they
become|became|become|становиться (кем-то, каким-то)|приходить|He [[became]] team lead last year.|В прошлом году он стал тимлидом.|ABA: become — became — become
begin|began|begun|начинать(ся)|продолжать|The meeting has already [[begun]].|Встреча уже началась.|i-a-u
bend|bent|bent|сгибать, наклонять|ломать|She [[bent]] down to pick up the badge.|Она наклонилась, чтобы поднять бейдж.|
bet|bet|bet|делать ставку, держать пари|выигрывать|I [[bet]] you can't guess the result.|Спорим, ты не угадаешь результат.|AAA
bite|bit|bitten|кусать|жалить|The dog has never [[bitten]] anyone.|Собака никогда никого не кусала.|
blow|blew|blown|дуть|бросать|The wind has [[blown]] the papers off the desk.|Ветер сдул бумаги со стола.|
break|broke|broken|ломать, разбивать|резать|Someone has [[broken]] the coffee machine.|Кто-то сломал кофемашину.|
bring|brought|brought|приносить (сюда, к говорящему)|относить (туда)|Thanks for [[bringing]] the documents.|Спасибо, что принёс документы.|bring — к говорящему, take — от говорящего
broadcast|broadcast|broadcast|транслировать (по ТВ, радио)|записывать|The final was [[broadcast]] live.|Финал транслировали в прямом эфире.|AAA; broadcasted встречается редко
build|built|built|строить|разрушать|They [[built]] the platform in six months.|Они построили платформу за полгода.|
burn|burnt/burned|burnt/burned|гореть; жечь|тушить|I've [[burnt]] the toast again.|Я снова сжёг тост.|burnt — BrE, burned — AmE и BrE
buy|bought|bought|покупать|продавать|We [[bought]] new licences last week.|На прошлой неделе мы купили новые лицензии.|произношение /bɔːt/
catch|caught|caught|ловить; успеть (на транспорт)|пропустить|We [[caught]] the last train home.|Мы успели на последний поезд домой.|произношение /kɔːt/
choose|chose|chosen|выбирать|отказываться|Have you [[chosen]] a supplier yet?|Ты уже выбрал поставщика?|
come|came|come|приходить, приезжать|уходить|She [[came]] to the office early.|Она пришла в офис рано.|ABA
cost|cost|cost|стоить (о цене)|тратить|The repair [[cost]] more than we expected.|Ремонт обошёлся дороже, чем мы ожидали.|AAA
cut|cut|cut|резать; сокращать|склеивать|The company has [[cut]] its marketing budget.|Компания сократила маркетинговый бюджет.|AAA
deal|dealt|dealt|иметь дело (с), разбираться (с)|избегать|She [[dealt]] with the complaint quickly.|Она быстро разобралась с жалобой.|произношение /delt/
dig|dug|dug|копать|закапывать|They [[dug]] deeper into the data.|Они глубже копнули в данные.|
dive|dived/dove|dived|нырять|плавать|He [[dived]] into the pool.|Он нырнул в бассейн.|dove — AmE прошедшее
do|did|done|делать (выполнять, заниматься)|создавать (изготавливать)|Have you [[done]] the security training?|Ты прошёл обучение по безопасности?|do — действие/работа; make — создание
draw|drew|drawn|рисовать (линиями); вытягивать|красить|He [[drew]] a diagram on the whiteboard.|Он нарисовал схему на доске.|draw conclusions — делать выводы
dream|dreamt/dreamed|dreamt/dreamed|видеть сон; мечтать|спать|I [[dreamt]] about the exam last night.|Мне снился экзамен прошлой ночью.|dreamt — BrE, dreamed — оба варианта
drink|drank|drunk|пить|есть|I've [[drunk]] too much coffee today.|Я сегодня выпил слишком много кофе.|i-a-u
drive|drove|driven|водить (машину), ехать за рулём|ехать пассажиром|She [[drove]] to the airport.|Она поехала в аэропорт на машине.|
eat|ate|eaten|есть, кушать|пить|Have you [[eaten]] yet?|Ты уже ел?|ate: /et/ BrE, /eɪt/ AmE
fall|fell|fallen|падать|поднимать|Sales have [[fallen]] by 10%.|Продажи упали на 10%.|не путать с fell (рубить) — правильный
feed|fed|fed|кормить|голодать|Who [[fed]] the cat this morning?|Кто покормил кота утром?|
feel|felt|felt|чувствовать|видеть|I [[felt]] tired after the flight.|После перелёта я чувствовал усталость.|
fight|fought|fought|бороться; драться|мириться|They [[fought]] hard for the contract.|Они упорно боролись за контракт.|
find|found|found|находить|терять|I [[found]] the bug in line 42.|Я нашёл баг в строке 42.|found (основывать) — отдельный правильный глагол
fly|flew|flown|летать|ехать|We [[flew]] to Dubai on Sunday.|В воскресенье мы полетели в Дубай.|
forbid|forbade|forbidden|запрещать|разрешать|Smoking is [[forbidden]] in the building.|Курение в здании запрещено.|
forecast|forecast/forecasted|forecast/forecasted|прогнозировать|подсчитывать (итог)|Analysts [[forecast]] a slowdown.|Аналитики спрогнозировали замедление.|обе формы допустимы
forget|forgot|forgotten|забывать|вспоминать|I've [[forgotten]] my password.|Я забыл пароль.|forgot — AmE V3 тоже встречается в некоторых значениях; стандарт — forgotten
forgive|forgave|forgiven|прощать|обвинять|She has [[forgiven]] him for the mistake.|Она простила ему ошибку.|
freeze|froze|frozen|замерзать; замораживать; зависать (о программе)|таять|My laptop [[froze]] during the call.|У меня завис ноутбук во время звонка.|
get|got|got/gotten|получать; доставать|отдавать|I've [[got]] your message.|Я получил твоё сообщение.|gotten — AmE V3; have got = иметь (BrE)
give|gave|given|давать|брать|They've [[given]] us a discount.|Нам дали скидку.|
go|went|gone|идти, ехать (уходить)|приходить|He's [[gone]] home.|Он ушёл домой.|been to — был и вернулся; gone to — ушёл и ещё там
grow|grew|grown|расти; выращивать|уменьшаться|The team has [[grown]] to 40 people.|Команда выросла до 40 человек.|
hang|hung|hung|вешать; висеть|снимать|We [[hung]] the posters in the hall.|Мы повесили плакаты в холле.|hanged — только о казни
have|had|had|иметь|давать|We [[had]] a long meeting yesterday.|Вчера у нас было долгое совещание.|
hear|heard|heard|слышать|слушать|Have you [[heard]] the news?|Ты слышал новости?|произношение /hɜːd/
hide|hid|hidden|прятать(ся), скрывать|показывать|The setting is [[hidden]] in the menu.|Настройка спрятана в меню.|
hit|hit|hit|ударять; попадать (в цель)|промахиваться|We [[hit]] our sales target in May.|В мае мы выполнили план продаж.|AAA
hold|held|held|держать; проводить (мероприятие)|отменять|The conference was [[held]] in Kazan.|Конференция прошла в Казани.|
hurt|hurt|hurt|причинять боль; болеть|лечить|My back [[hurt]] after the long drive.|После долгой поездки у меня болела спина.|AAA
keep|kept|kept|хранить; продолжать (делать)|выбрасывать|She [[kept]] all the receipts.|Она сохранила все чеки.|
know|knew|known|знать|забывать|I've [[known]] her for years.|Я знаю её много лет.|
lay|laid|laid|класть горизонтально; накрывать (стол)|лежать|She [[laid]] the documents on the table.|Она положила документы на стол.|lay (класть) ≠ lie (лежать)
lead|led|led|вести; руководить|следовать|She [[led]] the project for two years.|Она руководила проектом два года.|
lean|leant/leaned|leant/leaned|прислоняться; наклоняться|выпрямляться|He [[leaned]] against the wall.|Он прислонился к стене.|leant — BrE
learn|learnt/learned|learnt/learned|учить (самому), узнавать|учить (кого-то), преподавать|We [[learned]] a lot from the failure.|Мы многому научились на этой неудаче.|learnt — BrE; learned — оба
leave|left|left|уходить, уезжать; оставлять|прибывать|I [[left]] my charger at the office.|Я оставил зарядку в офисе.|
lend|lent|lent|одалживать (давать в долг)|занимать (брать в долг)|Could you [[lend]] me your pen?|Не одолжишь ручку?|lend — давать; borrow — брать
let|let|let|позволять, разрешать|запрещать|My manager [[let]] me leave early.|Руководитель отпустил меня пораньше.|AAA
lie|lay|lain|лежать|класть горизонтально|The files have [[lain]] untouched for months.|Файлы месяцами лежали нетронутыми.|lie — lied — lied = лгать (правильный)
light|lit/lighted|lit/lighted|зажигать; освещать|гасить|They [[lit]] the candles.|Они зажгли свечи.|
lose|lost|lost|терять; проигрывать|находить|We [[lost]] the tender to a competitor.|Мы проиграли тендер конкуренту.|
make|made|made|делать (создавать, изготавливать)|выполнять (заниматься)|We've [[made]] a decision.|Мы приняли решение.|make a decision, make a mistake
mean|meant|meant|означать; иметь в виду|понимать|I [[meant]] to call you.|Я собирался тебе позвонить.|произношение /ment/
meet|met|met|встречать(ся); знакомиться|прощаться|We [[met]] at a conference in 2022.|Мы познакомились на конференции в 2022.|
overcome|overcame|overcome|преодолевать|избегать|They [[overcame]] the technical issues.|Они преодолели технические проблемы.|ABA, как come
pay|paid|paid|платить|получать|Have you [[paid]] the invoice?|Ты оплатил счёт?|орфография: paid (не payed)
prove|proved|proved/proven|доказывать; оказываться|опровергать|The idea [[proved]] successful.|Идея оказалась удачной.|proven — чаще AmE и как прилагательное
put|put|put|класть, ставить (куда-либо; общий глагол)|брать|I [[put]] the file in the shared folder.|Я положил файл в общую папку.|AAA
quit|quit/quitted|quit/quitted|бросать (работу, привычку)|начинать|She [[quit]] her job in March.|Она уволилась в марте.|quitted — BrE, редко
read|read|read|читать|писать|I [[read]] your report yesterday.|Я прочитал твой отчёт вчера.|V2/V3 произносятся /red/
ride|rode|ridden|ездить (верхом, на велосипеде)|идти пешком|Have you ever [[ridden]] a horse?|Ты когда-нибудь катался на лошади?|
ring|rang|rung|звонить (о звонке, телефоне)|молчать|The phone [[rang]] during the meeting.|Во время встречи зазвонил телефон.|i-a-u
rise|rose|risen|подниматься, расти (самому)|поднимать (что-то)|Prices have [[risen]] sharply.|Цены резко выросли.|raise — raised — raised (поднимать что-то)
run|ran|run|бежать; управлять (бизнесом, процессом)|стоять|She [[runs]] a small agency.|Она руководит небольшим агентством.|ABA
say|said|said|сказать (что-то; передать слова)|сказать кому-то, рассказать|He [[said]] that the deadline had moved.|Он сказал, что срок перенесли.|произношение /sed/; say something, tell someone
see|saw|seen|видеть|слышать|Have you [[seen]] the new design?|Ты видел новый дизайн?|
seek|sought|sought|искать (формально), добиваться|находить|The company [[sought]] legal advice.|Компания обратилась за юридической консультацией.|
sell|sold|sold|продавать|покупать|We [[sold]] 500 units last month.|В прошлом месяце мы продали 500 единиц.|
send|sent|sent|отправлять, посылать|получать|I've [[sent]] you the link.|Я отправил тебе ссылку.|
set|set|set|устанавливать (цель, срок, будильник)|отменять|We [[set]] a clear deadline.|Мы установили чёткий срок.|AAA
shake|shook|shaken|трясти; пожимать (руку)|держать неподвижно|They [[shook]] hands after the deal.|После сделки они пожали руки.|
shine|shone/shined|shone/shined|светить, сиять|темнеть|The sun [[shone]] all day.|Солнце светило весь день.|shined — «начистить» (обувь)
shoot|shot|shot|стрелять; снимать (видео)|монтировать|They [[shot]] the promo video in one day.|Промо-ролик сняли за один день.|
show|showed|shown/showed|показывать|прятать|She [[showed]] us the prototype.|Она показала нам прототип.|showed как V3 — редко
shrink|shrank|shrunk|сжиматься, уменьшаться|растягиваться|The market has [[shrunk]] this year.|Рынок в этом году сократился.|
shut|shut|shut|закрывать (захлопывать)|открывать|Please [[shut]] the door.|Пожалуйста, закрой дверь.|AAA
sing|sang|sung|петь|танцевать|She [[sang]] at the company party.|Она пела на корпоративе.|i-a-u
sink|sank|sunk|тонуть; погружаться|всплывать|The boat [[sank]] in minutes.|Лодка затонула за несколько минут.|i-a-u
sit|sat|sat|сидеть|стоять|We [[sat]] in the front row.|Мы сидели в первом ряду.|
sleep|slept|slept|спать|просыпаться|I [[slept]] badly before the exam.|Перед экзаменом я плохо спал.|
smell|smelt/smelled|smelt/smelled|пахнуть; нюхать|видеть|The room [[smelled]] of fresh paint.|В комнате пахло свежей краской.|smelt — BrE
speak|spoke|spoken|говорить (на языке); выступать|молчать|Have you [[spoken]] to HR?|Ты поговорил с отделом кадров?|speak — язык/выступление; talk — разговор
spell|spelt/spelled|spelt/spelled|писать / произносить по буквам|читать вслух|How do you [[spell]] your surname?|Как пишется ваша фамилия?|spelt — BrE
spend|spent|spent|тратить (деньги, время)|копить|We [[spent]] two days on testing.|Мы потратили два дня на тестирование.|
spill|spilt/spilled|spilt/spilled|проливать|вытирать|I [[spilled]] coffee on my keyboard.|Я пролил кофе на клавиатуру.|spilt — BrE
split|split|split|разделять, делить|соединять|We [[split]] the task into three parts.|Мы разделили задачу на три части.|AAA
spread|spread|spread|распространять(ся); намазывать|сокращать|The news [[spread]] quickly.|Новость быстро разлетелась.|AAA; произношение /spred/
stand|stood|stood|стоять|сидеть|We [[stood]] in the queue for an hour.|Мы простояли в очереди час.|
steal|stole|stolen|красть|возвращать|My bike was [[stolen]].|У меня украли велосипед.|
stick|stuck|stuck|приклеивать(ся); застревать|отрывать|We got [[stuck]] in traffic.|Мы застряли в пробке.|
strike|struck|struck|ударять; поражать (о мысли); бастовать|защищать|It [[struck]] me that we'd missed something.|Меня осенило, что мы что-то упустили.|stricken — прилагательное (поражённый)
swear|swore|sworn|клясться; ругаться|хвалить|He [[swore]] he hadn't seen the email.|Он поклялся, что не видел письма.|
swim|swam|swum|плавать|нырять|I've never [[swum]] in the ocean.|Я никогда не плавал в океане.|i-a-u
take|took|taken|брать; относить (туда); занимать (о времени)|приносить (сюда)|The migration [[took]] three weeks.|Миграция заняла три недели.|
teach|taught|taught|учить (кого-то), преподавать|учить (самому)|She [[taught]] me how to use the CRM.|Она научила меня пользоваться CRM.|
tear|tore|torn|рвать, разрывать|склеивать|He [[tore]] up the old contract.|Он порвал старый контракт.|tear /teə/ (рвать) ≠ tear /tɪə/ (слеза)
tell|told|told|сказать кому-то; рассказать|сказать (что-то; передать слова)|She [[told]] me about the changes.|Она рассказала мне об изменениях.|tell someone something
think|thought|thought|думать; считать|знать|I [[thought]] you were on holiday.|Я думал, ты в отпуске.|
throw|threw|thrown|бросать (кидать)|ловить|He [[threw]] the ball to me.|Он бросил мне мяч.|
undertake|undertook|undertaken|браться за (проект), предпринимать|отказываться|The firm [[undertook]] a full audit.|Компания провела полный аудит.|
understand|understood|understood|понимать|объяснять|I haven't [[understood]] the last part.|Я не понял последнюю часть.|
upset|upset|upset|расстраивать; нарушать (планы)|радовать|The delay [[upset]] the client.|Задержка расстроила клиента.|AAA
wake|woke|woken|просыпаться; будить|засыпать|I [[woke]] up at six.|Я проснулся в шесть.|
wear|wore|worn|носить (одежду), быть одетым в|снимать (одежду)|She [[wore]] a suit to the interview.|На собеседование она надела костюм.|
win|won|won|выигрывать (матч, приз, тендер)|проигрывать|We [[won]] the contract.|Мы выиграли контракт.|произношение /wʌn/
withdraw|withdrew|withdrawn|снимать (деньги); отзывать|вносить|They [[withdrew]] the offer.|Они отозвали предложение.|
write|wrote|written|писать|читать|Have you [[written]] the summary?|Ты написал резюме встречи?|
arise|arose|arisen|возникать (о проблеме, вопросе)|исчезать|A problem has [[arisen]] with the payment.|Возникла проблема с оплатой.|
bear|bore|borne|выносить, терпеть; нести (расходы)|избегать|The costs will be [[borne]] by the client.|Расходы возьмёт на себя клиент.|born — только «рождён»
beat|beat|beaten|побеждать (соперника); бить|проигрывать|We [[beat]] our competitors on price.|Мы обошли конкурентов по цене.|
`;

const split = s => s.split("/").map(x => x.trim()).filter(Boolean);
export const IRREGULAR = RAW.trim().split("\n").map((line, i) => {
  const [v1, v2, v3, ru, wrong, exS, exR, note] = line.split("|").map(s => (s || "").trim());
  const id = "irr-" + v1.replace(/\s+/g, "-");
  const target = (exS.match(/\[\[(.+?)\]\]/) || [])[1] || v1;
  const v2s = split(v2), v3s = split(v3);
  const pattern = v1 === v2s[0] && v1 === v3s[0] ? "AAA" : v2s[0] === v3s[0] ? "ABB" : v1 === v3s[0] ? "ABA" : "ABC";
  return {
    id, english: v1, russian: ru, testPrompt: ru, acceptedEnglishAnswers: [v1], acceptedRussianAnswers: [ru],
    exampleSentence: exS, exampleTranslation: exR, category: pattern, group: null, wrongRussian: wrong,
    clozeAnswers: v2s.includes(target) ? v2s.slice() : v3s.includes(target) ? v3s.slice() : [target], v1, v2: v2s, v3: v3s, usageNotes: note || "", level: "B2", tags: ["irregular", pattern], n: i + 1
  };
});
