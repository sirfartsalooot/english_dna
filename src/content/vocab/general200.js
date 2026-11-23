// General 200 — a CURATED list of high-frequency English verbs (core vocabulary of general and
// workplace English). It is NOT an exact statistical frequency ranking: no authoritative corpus was
// available offline when the list was compiled. Format:
// english | russian | RU→EN prompt (empty = russian) | plausible WRONG translation | example with [[target]] | Russian | collocations (;) | group
// Prompts are unambiguous within this dictionary: near-synonyms get a disambiguating hint or a first-letter hint.
const RAW = `
# Ядро
be|быть, являться|быть, являться, находиться|становиться|The office [[is]] closed on Sundays.|Офис по воскресеньям закрыт.|be ready; be late; be responsible for|
have|иметь|иметь, обладать|давать|We [[have]] three new clients this month.|В этом месяце у нас три новых клиента.|have a meeting; have lunch; have a look|
do|делать (выполнять, заниматься)|делать (выполнять работу, заниматься)|создавать, изготавливать|Who [[did]] the analysis?|Кто делал анализ?|do research; do business; do your best|makedo
make|делать (создавать, производить)|делать (создавать, производить)|выполнять работу|We [[made]] a few changes to the plan.|Мы внесли несколько изменений в план.|make a decision; make a mistake; make money|makedo
say|сказать (что-то, передать слова)|сказать что-то (без адресата: ___ that...)|рассказать кому-то|She [[said]] the figures were wrong.|Она сказала, что цифры неверные.|say hello; say no; say goodbye|speech
tell|сказать кому-то, рассказать|сказать кому-то, рассказать (___ me)|произнести вслух|Can you [[tell]] me the address?|Можешь сказать мне адрес?|tell the truth; tell a story; tell sb to do|speech
get|получать; становиться (общее)|получать, доставать (общее, разговорное; g…)|отдавать|I [[got]] your email this morning.|Я получил твоё письмо сегодня утром.|get feedback; get better; get ready|
go|идти, ехать|идти, ехать (уходить)|приходить|Let's [[go]] through the agenda.|Давайте пройдёмся по повестке.|go ahead; go wrong; go on|
come|приходить, приезжать|приходить, приезжать (сюда)|уходить|Can you [[come]] to the meeting at 3?|Можешь прийти на встречу в 3?|come back; come up with; come true|
know|знать|знать|догадываться|Do you [[know]] who's in charge?|Ты знаешь, кто отвечает?|know sb well; know about; let sb know|
take|брать; занимать (о времени)|брать; занимать (о времени)|давать|The update [[took]] two hours.|Обновление заняло два часа.|take time; take part; take a break|bring
see|видеть|видеть|слышать|I can't [[see]] the attachment.|Я не вижу вложения.|see a doctor; see the point; see you|look
think|думать, считать|думать, считать (иметь мнение)|знать наверняка|I [[think]] we should wait.|Думаю, нам стоит подождать.|think about; think of; think twice|
look|смотреть (на что-то); выглядеть|смотреть (на что-то, look at); выглядеть|видеть|[[Look]] at this chart.|Посмотри на этот график.|look at; look for; look forward to|look
want|хотеть|хотеть|требовать|I [[want]] to change the date.|Я хочу перенести дату.|want sb to do; want to know|
give|давать|давать|брать|Please [[give]] me a minute.|Дайте мне минуту.|give advice; give feedback; give up|
use|использовать|использовать, пользоваться|выбрасывать|We [[use]] Slack for quick questions.|Мы используем Slack для быстрых вопросов.|use a tool; use data; used to|
find|находить|находить|терять|I can't [[find]] the latest version.|Не могу найти последнюю версию.|find out; find a solution; find it hard|
ask|спрашивать; просить|спрашивать; просить|отвечать|Can I [[ask]] a quick question?|Можно задать быстрый вопрос?|ask a question; ask for help; ask sb to do|
work|работать|работать|отдыхать|The new feature doesn't [[work]] on iOS.|Новая функция не работает на iOS.|work on; work out; work from home|
seem|казаться|казаться (производить впечатление)|оказываться точно|The client [[seems]] happy with the results.|Похоже, клиент доволен результатами.|seem to be; it seems that|
feel|чувствовать|чувствовать (себя)|выглядеть|I [[feel]] much better today.|Сегодня я чувствую себя гораздо лучше.|feel free; feel like; feel sure|
try|пытаться, пробовать|пытаться, пробовать|избегать|[[Try]] restarting the app.|Попробуй перезапустить приложение.|try to do; try doing; try on|
leave|уходить, уезжать; оставлять|уходить, уезжать; оставлять|прибывать|I [[left]] my laptop in the car.|Я оставил ноутбук в машине.|leave a message; leave early; leave out|
call|звонить; называть|звонить (по телефону); называть|писать (сообщение)|I'll [[call]] you after lunch.|Позвоню тебе после обеда.|call back; call off; call a meeting|
put|класть, ставить|класть, ставить (куда-либо)|брать|[[Put]] the files in the shared folder.|Положи файлы в общую папку.|put off; put forward; put together|
keep|хранить; продолжать|хранить, держать; продолжать (делать)|выбрасывать|Please [[keep]] me updated.|Пожалуйста, держи меня в курсе.|keep in touch; keep doing; keep track of|
let|позволять (let sb do)|позволять (let sb do; l…)|запрещать|[[Let]] me check the schedule.|Дай я проверю расписание.|let sb know; let go; let down|allow
mean|означать; иметь в виду|означать; иметь в виду|понимать|What do you [[mean]] by "soon"?|Что ты имеешь в виду под «скоро»?|mean to do; mean a lot|
become|становиться|становиться (кем-то, каким-то)|приходить|She [[became]] a partner in 2021.|Она стала партнёром в 2021 году.|become clear; become available|
# Речь и общение
talk|разговаривать|разговаривать (с кем-то, talk to)|кричать|We need to [[talk]] about the budget.|Нам нужно поговорить о бюджете.|talk to; talk about; talk sb into|speech
speak|говорить (на языке); выступать|говорить (на языке); выступать (с речью)|молчать|Do you [[speak]] German?|Вы говорите по-немецки?|speak English; speak up; speak at a conference|speech
explain|объяснять|объяснять|спрашивать|Could you [[explain]] the difference?|Не мог бы ты объяснить разницу?|explain sth to sb; explain why|
describe|описывать|описывать|изображать (рисовать)|[[Describe]] the problem in detail.|Опиши проблему подробно.|describe sth as; describe how|
mention|упоминать|упоминать|подчёркивать|She didn't [[mention]] the price.|Она не упомянула цену.|mention sth to sb; not to mention|
discuss|обсуждать|обсуждать|спорить|Let's [[discuss]] it tomorrow.|Давайте обсудим это завтра.|discuss sth (без about!)|
agree|соглашаться|соглашаться|спорить|I [[agree]] with your point.|Я согласен с твоим мнением.|agree with sb; agree on sth; agree to do|
argue|спорить; утверждать|спорить; утверждать (приводя доводы)|соглашаться|They [[argued]] about the budget.|Они спорили о бюджете.|argue with sb; argue that|
answer|отвечать (на вопрос, звонок)|отвечать (на вопрос, звонок; a…)|спрашивать|Nobody [[answered]] the phone.|Никто не ответил на звонок.|answer a question; answer the phone|reply
reply|отвечать (на письмо, сообщение)|отвечать (на письмо, сообщение; r…, + to)|пересылать|Please [[reply]] to this email by Friday.|Пожалуйста, ответьте на это письмо до пятницы.|reply to sb; reply-all|reply
suggest|предлагать (идею)|предлагать (идею, вариант; suggest doing)|требовать|I [[suggest]] postponing the launch.|Предлагаю отложить запуск.|suggest that; suggest doing|
promise|обещать|обещать|угрожать|He [[promised]] to send the report.|Он пообещал прислать отчёт.|promise to do; keep a promise|
offer|предлагать (что-то дать, сделать)|предлагать (дать или сделать что-то; offer to do)|просить|They [[offered]] me a job.|Мне предложили работу.|offer help; offer a discount; offer to do|
warn|предупреждать|предупреждать (об опасности)|успокаивать|I [[warned]] them about the risks.|Я предупредил их о рисках.|warn sb about; warn sb not to do|
complain|жаловаться|жаловаться|хвалить|Customers [[complained]] about the delay.|Клиенты жаловались на задержку.|complain about; complain to sb|
apologise|извиняться|извиняться|благодарить|I [[apologise]] for the confusion.|Приношу извинения за путаницу.|apologise for; apologise to sb|
thank|благодарить|благодарить|извиняться|I wanted to [[thank]] you for your help.|Хотел поблагодарить тебя за помощь.|thank sb for|
invite|приглашать|приглашать|выгонять|They [[invited]] us to the launch event.|Нас пригласили на презентацию.|invite sb to; invite sb to do|
admit|признавать|признавать (вину, факт)|отрицать|He [[admitted]] making a mistake.|Он признал, что ошибся.|admit doing; admit that|
deny|отрицать|отрицать|признавать|She [[denied]] sending the email.|Она отрицала, что отправляла письмо.|deny doing; deny that|
claim|утверждать; заявлять права|утверждать (что-то, не доказав); требовать (компенсацию)|доказывать|They [[claim]] the product is 100% safe.|Они утверждают, что продукт на 100% безопасен.|claim that; claim compensation|
recommend|рекомендовать|рекомендовать|запрещать|I'd [[recommend]] booking in advance.|Я бы рекомендовал бронировать заранее.|recommend doing; recommend that|
persuade|убеждать (сделать что-то)|убеждать сделать что-то (persuade sb to do)|разубеждать|We [[persuaded]] them to extend the deadline.|Мы убедили их продлить срок.|persuade sb to do|
convince|убеждать (в чём-то)|убеждать в чём-то (convince sb of / that)|сомневаться|The data [[convinced]] me that we were wrong.|Данные убедили меня, что мы ошибались.|convince sb of; convince sb that|
inform|сообщать, информировать|сообщать официально, информировать (inform sb of)|скрывать|Please [[inform]] us of any changes.|Пожалуйста, сообщайте нам о любых изменениях.|inform sb of / about|
# Мышление
believe|верить; считать|верить; полагать|сомневаться|I [[believe]] this is the right decision.|Я считаю, что это правильное решение.|believe in; believe that|
understand|понимать|понимать|объяснять|I don't [[understand]] the error message.|Я не понимаю сообщение об ошибке.|understand why; make oneself understood|
remember|помнить, вспоминать|помнить, вспоминать|забывать|[[Remember]] to save your work.|Не забудь сохранить работу.|remember to do; remember doing|
forget|забывать|забывать|вспоминать|Don't [[forget]] your badge.|Не забудь бейдж.|forget to do; forget about|
learn|учить (самому), узнавать|учить (самому), узнавать (о чём-то)|учить кого-то|I'm [[learning]] Python.|Я учу Python.|learn from; learn about; learn how to|learn
teach|учить (кого-то), преподавать|учить (кого-то), преподавать|учиться самому|She [[teaches]] data analysis.|Она преподаёт анализ данных.|teach sb to do; teach sb sth|learn
study|изучать, учиться|изучать (подробно), учиться (в вузе)|забывать|We [[studied]] the market carefully.|Мы тщательно изучили рынок.|study for an exam; study at university|learn
consider|рассматривать, обдумывать|рассматривать (вариант), обдумывать (consider doing)|отвергать|We're [[considering]] a new supplier.|Мы рассматриваем нового поставщика.|consider doing; consider sb/sth (to be)|
decide|решать (принимать решение)|решать (принимать решение)|откладывать|We [[decided]] to cancel the trip.|Мы решили отменить поездку.|decide to do; decide on; decide whether|
expect|ожидать (считать вероятным)|ожидать (считать вероятным)|надеяться|We [[expect]] the results by Friday.|Мы ожидаем результаты к пятнице.|expect sb to do; as expected|
hope|надеяться|надеяться|ожидать (как вероятное)|I [[hope]] you're well.|Надеюсь, у тебя всё хорошо.|hope to do; hope for; hope so|
wonder|интересоваться, задаваться вопросом|задаваться вопросом, интересоваться (I ___ if...)|знать точно|I [[wonder]] if you could help me.|Не могли бы вы мне помочь?|wonder if / whether; wonder why|
realise|осознавать|осознавать, понимать (вдруг)|забывать|I didn't [[realise]] it was so late.|Я не понимал, что уже так поздно.|realise that; realise a plan (осуществить)|
recognise|узнавать (кого-то); признавать|узнавать (знакомое); признавать (официально)|путать|I didn't [[recognise]] her at first.|Я сначала её не узнал.|recognise sb; recognise the need for|
imagine|представлять (себе)|представлять себе, воображать|вспоминать|[[Imagine]] the app had a million users.|Представь, что у приложения миллион пользователей.|imagine doing; imagine that|
guess|угадывать, догадываться|угадывать, догадываться|знать наверняка|Can you [[guess]] the total cost?|Угадаешь общую стоимость?|guess right; I guess (разг. «думаю»)|
doubt|сомневаться|сомневаться|верить|I [[doubt]] they'll agree.|Сомневаюсь, что они согласятся.|doubt that / whether; no doubt|
prefer|предпочитать|предпочитать|ненавидеть|I [[prefer]] email to phone calls.|Я предпочитаю почту звонкам.|prefer A to B; prefer to do|
notice|замечать|замечать|игнорировать|Did you [[notice]] the typo?|Ты заметил опечатку?|notice that; notice sb doing|look
compare|сравнивать|сравнивать|смешивать|Let's [[compare]] the two offers.|Давайте сравним два предложения.|compare with / to; compared to|
choose|выбирать|выбирать|отказываться|You can [[choose]] any date.|Можно выбрать любую дату.|choose between; choose to do|
plan|планировать|планировать|импровизировать|We [[plan]] to launch in May.|Мы планируем запуск в мае.|plan to do; plan ahead|
solve|решать (задачу, проблему)|решать (задачу, проблему)|создавать (проблему)|We finally [[solved]] the problem.|Мы наконец решили проблему.|solve a problem; solve a puzzle|
check|проверять|проверять|подтверждать|[[Check]] your spelling before sending.|Проверь орфографию перед отправкой.|check in; check out; check that|
mind|возражать (против)|возражать, быть против (Do you ___ if...?)|соглашаться|Do you [[mind]] if I join?|Не возражаешь, если я присоединюсь?|mind doing; never mind|
# Движение и положение
move|двигать(ся); переезжать|двигать(ся); переезжать|оставаться|We [[moved]] to a new office.|Мы переехали в новый офис.|move on; move in; move forward|
turn|поворачивать(ся); превращаться|поворачивать(ся)|останавливаться|[[Turn]] left at the lights.|На светофоре поверните налево.|turn on/off; turn down; turn into|
follow|следовать (за)|следовать (за кем-то/чем-то)|опережать|Please [[follow]] the instructions.|Пожалуйста, следуйте инструкциям.|follow up; follow the rules; as follows|
return|возвращать(ся)|возвращать(ся)|уезжать|She [[returned]] from Tokyo yesterday.|Вчера она вернулась из Токио.|return to; return a call|
arrive|прибывать|прибывать (arrive at / in)|отправляться|The parcel [[arrived]] this morning.|Посылка пришла сегодня утром.|arrive at the office; arrive in Paris|
enter|входить; вводить (данные)|входить; вводить (данные)|выходить|[[Enter]] your password.|Введите пароль.|enter a room; enter data; enter a market|
travel|путешествовать, ездить|путешествовать, ездить (в поездки)|оставаться дома|I [[travel]] a lot for work.|Я много езжу по работе.|travel abroad; travel by train|
walk|идти пешком, гулять|идти пешком, гулять|бежать|I usually [[walk]] to work.|Я обычно хожу на работу пешком.|walk sb through (объяснить по шагам)|
run|бежать; управлять (бизнесом)|бежать; управлять (бизнесом), запускать (программу)|стоять|She [[runs]] a design studio.|Она руководит дизайн-студией.|run a business; run a test; run out of|
fall|падать|падать, снижаться (fall — fell — fallen)|подниматься|Profits [[fell]] by 5%.|Прибыль снизилась на 5%.|fall behind; fall apart; fall in love|
rise|подниматься, расти (сам; r…)|подниматься, расти (сам, без объекта; r…)|поднимать что-то|Costs [[rose]] sharply in March.|В марте расходы резко выросли.|rise by 10%; rise to the challenge|rise
raise|поднимать (что-то)|поднимать что-то (raise prices, raise a question)|подниматься самому|She [[raised]] an important question.|Она подняла важный вопрос.|raise prices; raise concerns; raise money|rise
carry|нести, носить|нести (в руках), перевозить|ронять|Can you [[carry]] this box?|Можешь донести эту коробку?|carry out (выполнять); carry on|bring
bring|приносить (сюда)|приносить (сюда, к говорящему)|относить туда|[[Bring]] your laptop to the workshop.|Принесите ноутбук на семинар.|bring up; bring sb along|bring
send|отправлять|отправлять, посылать|получать|I'll [[send]] you the invite.|Я пришлю тебе приглашение.|send off; send back; send sb sth|
set|устанавливать|устанавливать (цель, срок)|отменять|Let's [[set]] a deadline.|Давайте установим срок.|set up; set a goal; set an alarm|
stand|стоять; выносить|стоять; терпеть (can't ___)|сидеть|I can't [[stand]] long meetings.|Терпеть не могу долгие совещания.|stand up; stand for; stand out|
sit|сидеть|сидеть|стоять|Please [[sit]] down.|Садитесь, пожалуйста.|sit down; sit an exam (BrE)|
stay|оставаться; останавливаться|оставаться; останавливаться (в отеле)|уезжать|We [[stayed]] at a hotel near the venue.|Мы остановились в отеле рядом с площадкой.|stay in touch; stay late; stay at|
reach|достигать, дотягиваться; связаться|достигать (цели, места); дозвониться|терять|We [[reached]] an agreement.|Мы достигли соглашения.|reach a goal; reach sb by phone|
cross|пересекать|пересекать, переходить|обходить|[[Cross]] the street at the lights.|Переходите улицу на светофоре.|cross out; cross one's mind|
drive|водить машину, ехать за рулём|водить машину, ехать за рулём|ехать пассажиром|She [[drives]] to work.|Она ездит на работу на машине.|drive growth; drive sb crazy|
fly|летать, лететь|летать, лететь|плыть|We're [[flying]] to Almaty tomorrow.|Завтра мы летим в Алматы.|fly economy; time flies|
pull|тянуть|тянуть (на себя)|толкать|[[Pull]] the door to open it.|Потяните дверь на себя, чтобы открыть.|pull out; pull together|push
push|толкать; продвигать|толкать; продвигать (настаивать)|тянуть|They're [[pushing]] for a quick decision.|Они настаивают на быстром решении.|push for; push back (переносить)|push
# Изменения и состояния
change|менять(ся)|менять(ся), изменять(ся)|сохранять|We [[changed]] the meeting time.|Мы изменили время встречи.|change one's mind; change plans|
grow|расти; выращивать|расти (развиваться), выращивать (g…)|уменьшаться|The company [[grew]] fast last year.|В прошлом году компания быстро росла.|grow up; grow a business|rise
increase|увеличивать(ся)|увеличивать(ся) (в объёме, числе; i…)|уменьшать|We need to [[increase]] the budget.|Нам нужно увеличить бюджет.|increase by / to; increase sales|rise
reduce|сокращать, уменьшать|сокращать, уменьшать|увеличивать|We [[reduced]] costs by 15%.|Мы сократили расходы на 15%.|reduce costs; reduce risk|
improve|улучшать(ся)|улучшать(ся)|ухудшать|The update [[improved]] performance.|Обновление улучшило производительность.|improve quality; improve on|
develop|развивать(ся); разрабатывать|развивать(ся); разрабатывать (продукт)|разрушать|They [[developed]] a new app.|Они разработали новое приложение.|develop skills; develop a product|
continue|продолжать(ся)|продолжать(ся)|прекращать|Please [[continue]] with your presentation.|Пожалуйста, продолжайте выступление.|continue to do / doing|
stop|останавливать(ся), прекращать|останавливать(ся), прекращать|начинать|[[Stop]] the recording, please.|Остановите запись, пожалуйста.|stop doing; stop to do|
start|начинать; запускать (s…)|начинать; запускать (s…)|заканчивать|Let's [[start]] the meeting.|Давайте начнём встречу.|start doing / to do; start a business|begin
begin|начинать(ся) (b…)|начинать(ся) (книжн.-нейтр.; b…)|заканчивать|The conference [[begins]] on Monday.|Конференция начинается в понедельник.|begin with; to begin with|begin
finish|заканчивать (f…)|заканчивать (дело, работу; f…)|начинать|Have you [[finished]] the slides?|Ты закончил слайды?|finish doing; finish off|finish
end|заканчиваться, завершать(ся) (e…)|заканчиваться, завершаться (e…)|начинаться|The contract [[ends]] in June.|Контракт заканчивается в июне.|end up; end with|finish
remain|оставаться (в состоянии)|оставаться (в том же состоянии; формальнее stay)|меняться|Prices [[remain]] high.|Цены остаются высокими.|remain calm; it remains to be seen|
happen|происходить, случаться|происходить, случаться|планировать|What [[happened]] to the server?|Что случилось с сервером?|happen to do; happen to sb|
appear|появляться; казаться|появляться (возникать)|исчезать|A warning [[appeared]] on the screen.|На экране появилось предупреждение.|appear to be; appear in court|
disappear|исчезать|исчезать|появляться|The file [[disappeared]] from the folder.|Файл исчез из папки.|disappear without a trace|
exist|существовать|существовать|исчезать|Does this feature [[exist]] in the free plan?|Есть ли эта функция в бесплатном тарифе?|exist in; no longer exist|
depend|зависеть|зависеть (depend on)|влиять|It [[depends]] on the budget.|Это зависит от бюджета.|depend on; it depends|
matter|иметь значение|иметь значение|мешать|It doesn't [[matter]] who starts.|Неважно, кто начнёт.|it doesn't matter; matter to sb|
belong|принадлежать|принадлежать (belong to)|заимствовать|This laptop [[belongs]] to the company.|Этот ноутбук принадлежит компании.|belong to; belong together|
fail|терпеть неудачу; не суметь|терпеть неудачу, проваливать (экзамен)|добиваться успеха|The test [[failed]] twice.|Тест дважды не прошёл.|fail to do; fail an exam|
succeed|добиваться успеха|добиваться успеха (succeed in doing)|проваливаться|She [[succeeded]] in closing the deal.|Ей удалось заключить сделку.|succeed in doing; succeed sb (сменить)|
survive|выживать, пережить|выживать, пережить (кризис)|погибать|The company [[survived]] the crisis.|Компания пережила кризис.|survive a crisis|
break|ломать|ломать, разбивать; нарушать (правило)|чинить|Don't [[break]] the rules.|Не нарушай правила.|break down; break the news; break a record|
fix|чинить, исправлять|чинить, исправлять (ошибку)|ломать|They [[fixed]] the bug overnight.|Они исправили баг за ночь.|fix a bug; fix a date|
# Владение и деньги
buy|покупать|покупать|продавать|We [[bought]] a new server.|Мы купили новый сервер.|buy from; buy time|
sell|продавать|продавать|покупать|They [[sell]] software subscriptions.|Они продают подписки на ПО.|sell out; sell well|
pay|платить|платить|получать оплату|Who [[paid]] for lunch?|Кто заплатил за обед?|pay for; pay attention; pay off|
spend|тратить (деньги, время)|тратить (деньги, время)|экономить|We [[spent]] a week on research.|Мы потратили неделю на исследование.|spend time on / doing|
cost|стоить|стоить (о цене)|тратить|How much does it [[cost]]?|Сколько это стоит?|cost a fortune; cost sb sth|
lose|терять; проигрывать|терять; проигрывать|находить|We [[lost]] an important client.|Мы потеряли важного клиента.|lose money; lose weight; lose track of|
win|выигрывать|выигрывать (приз, матч, тендер)|проигрывать|We [[won]] the contract.|Мы выиграли контракт.|win an award; win a deal|
own|владеть|владеть (быть собственником)|арендовать|Who [[owns]] the data?|Кому принадлежат данные?|own a company; own up (признаться)|
share|делиться; совместно использовать|делиться; совместно использовать|скрывать|Can you [[share]] your screen?|Можешь показать свой экран?|share a screen; share an opinion|
borrow|брать взаймы|брать взаймы (у кого-то)|давать взаймы|Can I [[borrow]] your charger?|Можно взять твою зарядку?|borrow from sb|money
lend|давать взаймы|давать взаймы, одалживать (кому-то)|брать взаймы|Could you [[lend]] me 10 euros?|Не одолжишь 10 евро?|lend sb sth; lend a hand|money
save|сохранять; экономить; спасать|сохранять (файл); экономить; спасать|тратить|Don't forget to [[save]] the file.|Не забудь сохранить файл.|save time; save money; save a file|
waste|тратить впустую|тратить впустую|экономить|Let's not [[waste]] time.|Давайте не терять время зря.|waste time / money|
earn|зарабатывать|зарабатывать|тратить|She [[earns]] more than her manager.|Она зарабатывает больше своего руководителя.|earn money; earn a living; earn respect|
receive|получать (официально; r…)|получать (официально, формально; r…)|отправлять|We [[received]] your application.|Мы получили вашу заявку.|receive feedback; receive a payment|
provide|предоставлять, обеспечивать|предоставлять, обеспечивать (provide sb with)|лишать|We [[provide]] 24/7 support.|Мы обеспечиваем круглосуточную поддержку.|provide sb with sth; provide for|
include|включать (в состав)|включать (в состав)|исключать|The price [[includes]] VAT.|Цена включает НДС.|including; include sth in|
contain|содержать (внутри)|содержать (в себе)|выпускать|The file [[contains]] personal data.|Файл содержит персональные данные.|contain information|
collect|собирать (коллекционировать)|собирать (данные, вещи); забирать (кого-то)|раздавать|We [[collect]] feedback after each session.|Мы собираем отзывы после каждой сессии.|collect data; collect sb from the station|
deliver|доставлять; выполнять (обещанное)|доставлять; выполнять обещанное (deliver results)|заказывать|The team always [[delivers]] on time.|Команда всегда сдаёт работу вовремя.|deliver results; deliver a talk|
# Действия и работа
build|строить|строить|разрушать|We're [[building]] a new platform.|Мы строим новую платформу.|build trust; build a team|
create|создавать|создавать|уничтожать|[[Create]] a new folder for the project.|Создай новую папку для проекта.|create value; create an account|
produce|производить|производить, выпускать (продукцию)|потреблять|The factory [[produces]] 500 units a day.|Завод выпускает 500 единиц в день.|produce results; produce a report|
design|проектировать, разрабатывать дизайн|проектировать, разрабатывать дизайн|копировать|She [[designed]] the new logo.|Она разработала новый логотип.|design a system; be designed to|
write|писать|писать|читать|I'll [[write]] a short summary.|Я напишу краткое резюме.|write down; write up; write to sb|
read|читать|читать|писать|Have you [[read]] the brief?|Ты прочитал бриф?|read through; read about|
open|открывать|открывать|закрывать|[[Open]] the attachment.|Откройте вложение.|open a file; open an account|
close|закрывать|закрывать|открывать|Please [[close]] all tabs before the update.|Перед обновлением закройте все вкладки.|close a deal; close down|
cut|резать; сокращать|резать; сокращать (расходы)|увеличивать|They [[cut]] the price by half.|Они снизили цену вдвое.|cut costs; cut down on|
hold|держать; проводить (мероприятие)|держать; проводить (встречу, мероприятие)|отменять|We'll [[hold]] a meeting on Monday.|В понедельник мы проведём встречу.|hold a meeting; hold on|
catch|ловить; успевать (на транспорт)|ловить; успевать (на поезд); заразиться|пропускать|I need to [[catch]] the 7 o'clock train.|Мне нужно успеть на поезд в 7.|catch a cold; catch up|
throw|бросать|бросать (кидать)|ловить|Don't [[throw]] away the receipt.|Не выбрасывай чек.|throw away; throw a party|
drop|ронять; падать; отказываться от|ронять; снижаться резко; отказываться от (идеи)|поднимать|Sales [[dropped]] in January.|В январе продажи упали.|drop by; drop out; drop an idea|
fill|наполнять; заполнять|наполнять; заполнять (fill in a form)|опустошать|Please [[fill]] in this form.|Пожалуйста, заполните эту форму.|fill in / out; fill a position|
cover|покрывать; охватывать|покрывать (расходы); охватывать (тему)|раскрывать|The report [[covers]] the last quarter.|Отчёт охватывает последний квартал.|cover costs; cover for sb|
join|присоединяться|присоединяться, вступать|покидать|Will you [[join]] us for lunch?|Присоединишься к нам за обедом?|join a team; join a call|
meet|встречать(ся); знакомиться|встречать(ся), знакомиться; выполнять (meet a deadline)|прощаться|Nice to [[meet]] you.|Приятно познакомиться.|meet a deadline; meet expectations|
visit|посещать|посещать, навещать|покидать|We [[visited]] the factory last week.|На прошлой неделе мы посетили завод.|visit a client; visit a website|
wait|ждать|ждать (wait for)|спешить|Can you [[wait]] a moment?|Можешь подождать минутку?|wait for; can't wait to|
watch|смотреть (фильм, процесс), наблюдать|смотреть (фильм, процесс), наблюдать|видеть|We [[watched]] the demo together.|Мы вместе посмотрели демо.|watch out; watch a video|look
listen|слушать|слушать (listen to)|слышать|Please [[listen]] carefully.|Пожалуйста, слушайте внимательно.|listen to sb|hear
hear|слышать|слышать|слушать|I can't [[hear]] you — you're on mute.|Я тебя не слышу — у тебя выключен микрофон.|hear about; hear from sb|hear
help|помогать|помогать|мешать|Can you [[help]] me with this?|Можешь помочь мне с этим?|help sb (to) do; can't help doing|
support|поддерживать|поддерживать|противостоять|We fully [[support]] the proposal.|Мы полностью поддерживаем предложение.|support a decision; customer support|
allow|разрешать (allow sb to do)|разрешать (allow sb to do; a…)|запрещать|The policy [[allows]] remote work.|Политика разрешает удалённую работу.|allow sb to do; allow for|allow
need|нуждаться, нужно|нуждаться (I ___ help)|иметь лишнее|We [[need]] more time.|Нам нужно больше времени.|need to do; need sth|
require|требовать (формально)|требовать (быть необходимым — формально)|предлагать|The role [[requires]] fluent English.|Должность требует свободного английского.|require sb to do; be required|
involve|включать в себя; вовлекать|включать в себя (предполагать); вовлекать|исключать|The job [[involves]] a lot of travel.|Работа предполагает много поездок.|involve doing; be involved in|
manage|управлять; справляться|управлять (руководить); справиться (manage to do)|проваливать|She [[manages]] a team of ten.|Она руководит командой из десяти человек.|manage to do; manage a project|
handle|справляться с, обрабатывать|справляться с (ситуацией), обрабатывать (запросы)|избегать|Who [[handles]] customer complaints?|Кто занимается жалобами клиентов?|handle a situation; handle requests|
prepare|готовить(ся)|готовить(ся) (prepare for)|импровизировать|I need to [[prepare]] for the interview.|Мне нужно подготовиться к собеседованию.|prepare for; prepare a report|
protect|защищать|защищать|атаковать|We must [[protect]] customer data.|Мы должны защищать данные клиентов.|protect from / against|
prevent|предотвращать|предотвращать, не допускать|вызывать|Backups [[prevent]] data loss.|Резервные копии предотвращают потерю данных.|prevent sb from doing|
cause|вызывать, быть причиной|вызывать, быть причиной|предотвращать|What [[caused]] the outage?|Что вызвало сбой?|cause problems; cause sb to do|
affect|влиять (на)|влиять на (affect sth)|не замечать|The delay will [[affect]] our plans.|Задержка повлияет на наши планы.|affect performance; be affected by|
avoid|избегать|избегать|искать|Try to [[avoid]] jargon.|Старайтесь избегать жаргона.|avoid doing; avoid mistakes|
accept|принимать (соглашаться)|принимать (предложение, условия)|отклонять|We [[accepted]] their offer.|Мы приняли их предложение.|accept an offer; accept responsibility|
refuse|отказываться|отказываться (refuse to do)|соглашаться|He [[refused]] to sign.|Он отказался подписывать.|refuse to do; refuse an offer|
pick|выбирать; срывать; забирать|забирать (кого-то, pick up); отбирать|бросать|I'll [[pick]] you up at eight.|Я заберу тебя в восемь.|pick up; pick out|
add|добавлять|добавлять|удалять|[[Add]] me to the channel.|Добавь меня в канал.|add to; add up|
remove|удалять, убирать|удалять, убирать|добавлять|Please [[remove]] my name from the list.|Пожалуйста, удалите моё имя из списка.|remove from|
replace|заменять|заменять|сохранять|We need to [[replace]] the old printer.|Нужно заменить старый принтер.|replace A with B|
test|тестировать, проверять|тестировать|игнорировать|We [[tested]] the app on 20 devices.|Мы протестировали приложение на 20 устройствах.|test a hypothesis; test sb on|
print|печатать|печатать (на принтере)|сканировать|Could you [[print]] the agenda?|Не распечатаешь повестку?|print out|
download|скачивать|скачивать|загружать на сервер|[[Download]] the latest version.|Скачайте последнюю версию.|download a file|
sign|подписывать|подписывать|расторгать|Please [[sign]] here.|Подпишите здесь, пожалуйста.|sign a contract; sign up; sign in|
cancel|отменять|отменять|подтверждать|They [[cancelled]] the meeting.|Они отменили встречу.|cancel an order; cancel a subscription|
book|бронировать|бронировать|отменять|I've [[booked]] a room for Monday.|Я забронировал переговорку на понедельник.|book a table; book a flight|
order|заказывать; приказывать|заказывать (товар, еду)|отменять|We [[ordered]] new laptops.|Мы заказали новые ноутбуки.|order online; order sb to do|
count|считать (количество); рассчитывать на|считать (пересчитывать); рассчитывать на (count on)|делить|You can [[count]] on me.|Можешь на меня рассчитывать.|count on; count the votes|
`;

const LETTER = /\(([a-z])…\)$/;
const isIrreg = new Set(["be","have","do","make","say","tell","get","go","come","know","take","see","think","give","find","feel","leave","put","keep","let","mean","become","speak","understand","forget","learn","teach","choose","run","fall","rise","bring","send","set","stand","sit","drive","fly","grow","begin","break","buy","sell","pay","spend","cost","lose","win","lend","build","write","read","cut","hold","catch","throw","meet","hear"]);
export const GENERAL = [];
let cat = "";
RAW.trim().split("\n").forEach(line => {
  if (line.startsWith("#")) { cat = line.slice(1).trim(); return; }
  const [en, ru, prompt, wrong, exS, exR, coll, group] = line.split("|").map(s => (s || "").trim());
  const target = (exS.match(/\[\[(.+?)\]\]/) || [])[1] || en;
  const accepted = [en];
  const IZE = new Set(["apologise", "realise", "recognise"]);
  if (IZE.has(en)) accepted.push(en.replace(/ise$/, "ize"));
  const clozeAnswers = [target];
  // spelling variants in the cloze gap (realised/realized, apologise/apologize, cancelled/canceled)
  if (IZE.has(en)) clozeAnswers.push(target.replace(/is(e|ed|es|ing)$/, "iz$1"));
  if (/lled$/.test(target)) clozeAnswers.push(target.replace(/lled$/, "led"));
  GENERAL.push({
    id: "gen-" + en, english: en, russian: ru, testPrompt: prompt || ru, acceptedEnglishAnswers: accepted, acceptedRussianAnswers: [ru],
    exampleSentence: exS, exampleTranslation: exR, category: cat, group: group || null, wrongRussian: wrong, clozeAnswers,
    collocations: coll ? coll.split(";").map(s => s.trim()) : [], usageNotes: "", level: "B2", tags: ["general", isIrreg.has(en) ? "irregular" : "regular"],
    irregularId: isIrreg.has(en) ? "irr-" + en : null, n: GENERAL.length + 1
  });
});
