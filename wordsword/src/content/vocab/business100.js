// Business 100 — verbs for meetings, planning, evaluation, negotiation, projects, data and communication.
// Same format as General 200. Grammar notes (управление) are in the collocations column.
const RAW = `
# Планирование
allocate|выделять, распределять (ресурсы)|выделять, распределять (ресурсы, бюджет)|сокращать|We [[allocated]] 20% of the budget to marketing.|Мы выделили 20% бюджета на маркетинг.|allocate resources / budget to sth|
prioritise|расставлять приоритеты|расставлять приоритеты, ставить на первое место|откладывать|We need to [[prioritise]] the security fixes.|Нужно в первую очередь заняться исправлениями безопасности.|prioritise tasks; prioritise A over B|
schedule|назначать (на время), планировать в графике|назначать на определённое время (s…)|отменять|The call is [[scheduled]] for 10 a.m.|Звонок назначен на 10 утра.|schedule a meeting; be scheduled for|time
reschedule|переносить на другое время|переносить на другое время (назначить заново; r…)|отменять полностью|Can we [[reschedule]] for Thursday?|Можем перенести на четверг?|reschedule a meeting / for|time
postpone|откладывать (на более поздний срок)|откладывать на более поздний срок (p…)|ускорять|The launch was [[postponed]] until May.|Запуск отложили до мая.|postpone sth until / to|time
forecast|прогнозировать|прогнозировать (продажи, спрос)|подсчитывать факт|We [[forecast]] a 10% rise in demand.|Мы прогнозируем рост спроса на 10%.|forecast sales / demand|
estimate|оценивать приблизительно|оценивать приблизительно (сроки, затраты)|измерять точно|We [[estimate]] the project will take six weeks.|По нашей оценке, проект займёт шесть недель.|estimate costs; it is estimated that|
budget|планировать бюджет, закладывать в бюджет|закладывать в бюджет|тратить сверх плана|We've [[budgeted]] for two new hires.|Мы заложили в бюджет двух новых сотрудников.|budget for sth|
align|согласовывать, выравнивать (цели, позиции)|согласовывать, приводить в соответствие (цели, позиции)|разделять|Let's [[align]] on the priorities before Monday.|Давайте согласуем приоритеты до понедельника.|align with; align on; be aligned|
outline|кратко излагать, обрисовывать|кратко излагать, обрисовывать (план)|детально расписывать|She [[outlined]] the main risks.|Она кратко обрисовала основные риски.|outline a plan / proposal|
# Встречи и коммуникация
brief|инструктировать, вводить в курс|инструктировать, вводить в курс дела (brief sb on)|допрашивать|I'll [[brief]] the new team on the project.|Я введу новую команду в курс проекта.|brief sb on sth|
update|держать в курсе; обновлять|держать в курсе (update sb on); обновлять|скрывать информацию|I'll [[update]] you on the progress tomorrow.|Завтра расскажу тебе о прогрессе.|update sb on; keep sb updated|
clarify|уточнять, прояснять|уточнять, прояснять|запутывать|Could you [[clarify]] the deadline?|Не могли бы вы уточнить срок?|clarify a point / requirements|
confirm|подтверждать|подтверждать|отменять|Please [[confirm]] your attendance.|Пожалуйста, подтвердите участие.|confirm a booking; confirm that|
summarise|подводить итог, кратко излагать|подводить итог (summarise the discussion)|подробно расписывать|Let me [[summarise]] what we've agreed.|Позвольте подвести итог тому, о чём мы договорились.|summarise the key points|
present|представлять, презентовать|представлять, презентовать (результаты)|скрывать|She will [[present]] the results on Friday.|В пятницу она представит результаты.|present to sb; present findings|
propose|предлагать (официально, план)|официально предлагать (план, решение; propose that)|отклонять|We [[propose]] a phased rollout.|Мы предлагаем поэтапное внедрение.|propose a solution; propose doing|
follow up|связываться повторно, отслеживать (после встречи)|связаться повторно после встречи (follow up on)|забывать|I'll [[follow up]] with an email.|Я пришлю письмо по итогам.|follow up on; follow up with sb|
circulate|рассылать (документ кругу лиц)|рассылать (документ всем участникам)|засекречивать|I'll [[circulate]] the minutes after the meeting.|После встречи разошлю протокол.|circulate a draft / minutes|
address|рассматривать, заниматься (проблемой); обращаться|заниматься (проблемой), решать вопрос; обращаться (к аудитории)|игнорировать|We need to [[address]] these concerns.|Нам нужно заняться этими опасениями.|address an issue / concerns|
highlight|выделять, подчёркивать|подчёркивать, акцентировать (важное)|скрывать|The report [[highlights]] three key trends.|В отчёте выделены три ключевых тренда.|highlight a problem / the need for|
acknowledge|признавать; подтверждать получение|признавать (факт, ошибку); подтверждать получение|отрицать|Please [[acknowledge]] receipt of this email.|Пожалуйста, подтвердите получение письма.|acknowledge a mistake / receipt|
attend|посещать (мероприятие), присутствовать|присутствовать на (встрече, мероприятии)|пропускать|Will you [[attend]] the board meeting?|Ты будешь на заседании совета?|attend a meeting (без to!)|
chair|председательствовать, вести (встречу)|вести (встречу) как председатель|присутствовать как гость|Who's [[chairing]] the meeting today?|Кто сегодня ведёт встречу?|chair a meeting / committee|
facilitate|содействовать, облегчать; модерировать|модерировать (сессию); облегчать (процесс)|затруднять|She [[facilitated]] the workshop.|Она модерировала семинар.|facilitate a discussion / process|
# Оценка и анализ
assess|оценивать (ситуацию, риск; a…)|оценивать (ситуацию, риск, потребности; a…)|игнорировать|We need to [[assess]] the impact on customers.|Нужно оценить влияние на клиентов.|assess risks / needs / impact|evaluate
evaluate|оценивать (эффективность, результат; e…)|оценивать (эффективность, варианты, результат; e…)|внедрять|We'll [[evaluate]] the pilot after three months.|Мы оценим пилот через три месяца.|evaluate options / performance|evaluate
analyse|анализировать|анализировать|угадывать|We [[analysed]] customer churn.|Мы проанализировали отток клиентов.|analyse data / results|
review|пересматривать, проверять (документ)|просматривать и оценивать (документ, процесс), пересматривать|утверждать без проверки|Legal will [[review]] the contract.|Юристы проверят договор.|review a document / performance|
measure|измерять|измерять (показатели)|угадывать|How do we [[measure]] success?|Как мы измеряем успех?|measure performance / impact|
monitor|отслеживать, контролировать (состояние; m…)|отслеживать, контролировать состояние (m…)|забрасывать|We [[monitor]] server load 24/7.|Мы круглосуточно отслеживаем нагрузку на серверы.|monitor progress / performance|track
track|отслеживать (прогресс, заказ; t…)|отслеживать (прогресс, заказ, метрики; t…)|терять|You can [[track]] your order online.|Вы можете отслеживать заказ онлайн.|track progress; keep track of|track
benchmark|сравнивать с эталоном|сравнивать с эталоном, с лучшими практиками|копировать|We [[benchmarked]] our prices against competitors.|Мы сравнили наши цены с ценами конкурентов.|benchmark against|
identify|выявлять, определять|выявлять, определять (проблемы, причины)|скрывать|We [[identified]] three bottlenecks.|Мы выявили три узких места.|identify risks / opportunities|
quantify|количественно оценивать|выражать в цифрах, количественно оценивать|описывать качественно|Can we [[quantify]] the savings?|Можем ли мы выразить экономию в цифрах?|quantify the impact / benefits|
# Переговоры и сделки
negotiate|вести переговоры|вести переговоры, договариваться (об условиях)|диктовать условия|We [[negotiated]] a 10% discount.|Мы выторговали скидку 10%.|negotiate a deal / terms / with sb|
approve|одобрять, утверждать|одобрять, утверждать (официально)|отклонять|The board [[approved]] the budget.|Совет утвердил бюджет.|approve a plan; approve of sth (одобрять морально)|
reject|отклонять|отклонять, отвергать|утверждать|The client [[rejected]] our first proposal.|Клиент отклонил наше первое предложение.|reject a proposal / an application|
concede|уступать; признавать (неохотно)|уступать (в переговорах); неохотно признавать|настаивать|They [[conceded]] on the delivery terms.|Они уступили по условиям поставки.|concede a point; concede that|
compromise|идти на компромисс|идти на компромисс (compromise on)|упорствовать|Both sides had to [[compromise]].|Обеим сторонам пришлось пойти на компромисс.|compromise on sth; reach a compromise (n.)|
secure|обеспечивать, добиваться (сделки, финансирования)|добиться, получить (сделку, финансирование)|упустить|We [[secured]] funding for next year.|Мы получили финансирование на следующий год.|secure a deal / funding / a contract|
finalise|окончательно согласовывать, завершать|окончательно согласовать, доработать (финальную версию)|начинать|We're [[finalising]] the contract this week.|На этой неделе мы окончательно согласовываем договор.|finalise details / a deal|
sign off|утверждать, давать окончательное согласие|утвердить окончательно (дать «добро», sign off on)|возражать|The CFO needs to [[sign off]] on the budget.|Финансовый директор должен утвердить бюджет.|sign off on sth|
renew|продлевать (договор, подписку)|продлевать (договор, подписку)|расторгать|We [[renewed]] the contract for two years.|Мы продлили договор на два года.|renew a contract / licence|
terminate|расторгать, прекращать|расторгать (договор), прекращать|продлевать|Either party may [[terminate]] the agreement.|Любая из сторон может расторгнуть соглашение.|terminate a contract / employment|
# Проекты и исполнение
implement|внедрять (решение, систему)|внедрять (решение, систему)|откладывать|We [[implemented]] the new CRM in March.|В марте мы внедрили новую CRM.|implement a strategy / changes|
execute|выполнять, исполнять (план, стратегию)|исполнять, реализовывать (план, стратегию)|обдумывать|The plan was well designed but poorly [[executed]].|План был хорошо продуман, но плохо реализован.|execute a strategy / an order|
roll out|разворачивать, внедрять поэтапно|разворачивать поэтапно (для всех пользователей)|сворачивать|We'll [[roll out]] the update to all users next week.|На следующей неделе развернём обновление для всех пользователей.|roll out a feature / an update|
launch|запускать (продукт, кампанию)|запускать (продукт, кампанию)|закрывать|They [[launched]] the app in 12 countries.|Они запустили приложение в 12 странах.|launch a product / campaign|
coordinate|координировать|координировать, согласовывать действия|мешать|She [[coordinates]] the work of three teams.|Она координирует работу трёх команд.|coordinate with; coordinate efforts|
delegate|делегировать, поручать|делегировать, поручать (delegate sth to sb)|делать всё самому|Learn to [[delegate]] routine tasks.|Научитесь делегировать рутинные задачи.|delegate tasks / authority to|
oversee|курировать, руководить (контролировать)|курировать, надзирать за (проектом)|игнорировать|He [[oversees]] all international projects.|Он курирует все международные проекты.|oversee a project / operations|
streamline|оптимизировать, упрощать (процесс)|упрощать и ускорять (процесс)|усложнять|We [[streamlined]] the approval process.|Мы упростили процесс согласования.|streamline processes / operations|
iterate|делать итерации, дорабатывать по шагам|дорабатывать итерациями, многократно улучшать|бросать|We'll [[iterate]] on the design based on feedback.|Мы будем дорабатывать дизайн по отзывам.|iterate on sth|
escalate|эскалировать, передавать на уровень выше|передавать (проблему) на уровень выше; обостряться|скрывать|If it's not fixed by noon, [[escalate]] it to the manager.|Если до полудня не исправят — передай вопрос руководителю.|escalate an issue to sb|
resolve|урегулировать, разрешать (проблему, спор)|разрешать, урегулировать (проблему, спор)|обострять|The issue was [[resolved]] within an hour.|Проблему решили в течение часа.|resolve an issue / a conflict|
troubleshoot|искать и устранять неполадки|искать и устранять неполадки (диагностировать)|ломать|IT is [[troubleshooting]] the network.|ИТ-отдел ищет неполадки в сети.|troubleshoot a problem|
deploy|развёртывать (ПО); направлять (ресурсы)|развёртывать (ПО на сервере); направлять (ресурсы, людей)|откатывать|We [[deployed]] the fix to production.|Мы развернули исправление на проде.|deploy code / resources / staff|
# Данные и технологии
automate|автоматизировать|автоматизировать|делать вручную|We [[automated]] the monthly reports.|Мы автоматизировали ежемесячные отчёты.|automate a process / tasks|
integrate|интегрировать|интегрировать, встраивать (integrate with / into)|разделять|The tool [[integrates]] with Slack.|Инструмент интегрируется со Slack.|integrate with / into|
migrate|переносить (данные, систему)|переносить, мигрировать (данные, систему)|удалять|We [[migrated]] all data to the cloud.|Мы перенесли все данные в облако.|migrate to; migrate data|
upgrade|обновлять (до новой версии), повышать класс|обновлять до более новой/высокой версии (тарифа)|понижать|We [[upgraded]] to the premium plan.|Мы перешли на премиум-тариф.|upgrade to; upgrade software|
optimise|оптимизировать|оптимизировать|ухудшать|We [[optimised]] the checkout page.|Мы оптимизировали страницу оформления заказа.|optimise performance / costs|
scale|масштабировать|масштабировать (scale up / down)|сокращать до нуля|The platform can [[scale]] to millions of users.|Платформа может масштабироваться до миллионов пользователей.|scale up; scale back|
validate|валидировать, подтверждать корректность|подтверждать корректность (данных, гипотезы), валидировать|опровергать|We [[validated]] the idea with ten customers.|Мы проверили идею на десяти клиентах.|validate data / a hypothesis|
verify|удостоверяться, проверять достоверность|удостоверяться, проверять достоверность (фактов, личности)|подделывать|Please [[verify]] your email address.|Пожалуйста, подтвердите адрес электронной почты.|verify identity / information|
configure|настраивать (систему)|настраивать, конфигурировать (систему)|удалять|[[Configure]] the settings before the first run.|Настройте параметры перед первым запуском.|configure settings / a server|
back up|делать резервную копию|делать резервную копию (данных)|удалять|[[Back up]] your files before the update.|Сделайте резервную копию файлов перед обновлением.|back up data; a backup (n.)|
# Финансы
invest|инвестировать, вкладывать|инвестировать, вкладывать (invest in)|выводить средства|We [[invested]] heavily in training.|Мы много вложили в обучение.|invest in; invest time / money|
purchase|приобретать (формально)|приобретать (формальный синоним buy)|продавать|You can [[purchase]] additional licences online.|Дополнительные лицензии можно приобрести онлайн.|purchase goods / licences|
procure|закупать (через процедуру закупок)|закупать через процедуру закупок (procurement)|продавать|The department [[procures]] equipment through tenders.|Отдел закупает оборудование через тендеры.|procure goods / services|
invoice|выставлять счёт|выставлять счёт (invoice sb for)|оплачивать счёт|We'll [[invoice]] you at the end of the month.|Мы выставим вам счёт в конце месяца.|invoice a client for sth|
reimburse|возмещать (расходы)|возмещать (расходы сотруднику, клиенту)|штрафовать|The company will [[reimburse]] your travel expenses.|Компания возместит ваши командировочные расходы.|reimburse sb for sth|
outsource|передавать на аутсорс|передавать на аутсорс (внешнему подрядчику)|делать своими силами|We [[outsource]] our payroll.|Мы передали расчёт зарплаты на аутсорс.|outsource sth to|
fund|финансировать|финансировать|облагать налогом|The project is [[funded]] by a grant.|Проект финансируется грантом.|fund a project; be funded by|
generate|генерировать, приносить (доход)|приносить (доход), генерировать (лиды)|тратить|The campaign [[generated]] 500 leads.|Кампания принесла 500 лидов.|generate revenue / leads / ideas|
exceed|превышать|превышать (ожидания, бюджет)|не дотягивать|Sales [[exceeded]] expectations.|Продажи превзошли ожидания.|exceed expectations / the budget|
incur|нести (расходы, убытки)|нести, понести (расходы, убытки)|получать прибыль|The company [[incurred]] heavy losses.|Компания понесла крупные убытки.|incur costs / losses / fees|
# Люди и команда
hire|нанимать (h…)|нанимать на работу (h…)|увольнять|We're [[hiring]] two engineers.|Мы нанимаем двух инженеров.|hire staff; hire sb as|hire
recruit|набирать, подбирать (персонал; r…)|набирать, подбирать персонал (r…)|сокращать|It's hard to [[recruit]] senior developers.|Сложно найти старших разработчиков.|recruit staff / candidates|hire
onboard|вводить в должность, адаптировать (новичка)|проводить онбординг, адаптировать нового сотрудника|увольнять|We [[onboard]] new hires in their first week.|Новичков мы адаптируем в первую неделю.|onboard new employees / clients|
train|обучать|обучать (персонал)|экзаменовать|We [[trained]] all managers in GDPR.|Мы обучили всех менеджеров требованиям GDPR.|train sb in / on; train staff|
mentor|наставлять|быть наставником, наставлять|контролировать|She [[mentors]] two junior analysts.|Она наставник двух младших аналитиков.|mentor sb|
promote|повышать (в должности); продвигать|повышать в должности; продвигать (продукт)|понижать|He was [[promoted]] to head of sales.|Его повысили до руководителя отдела продаж.|promote sb to; promote a product|
appoint|назначать (на должность)|назначать на должность (appoint sb as)|увольнять|They [[appointed]] a new CEO.|Они назначили нового генерального директора.|appoint sb (as) CEO|
resign|увольняться по собственному желанию|увольняться по собственному желанию, уходить в отставку|нанимать|She [[resigned]] after five years.|Она уволилась через пять лет.|resign from a position|
retain|удерживать, сохранять (клиентов, сотрудников)|удерживать (клиентов, сотрудников)|терять|We need to [[retain]] our best people.|Нам нужно удержать лучших сотрудников.|retain staff / customers|
motivate|мотивировать|мотивировать|демотивировать (лишать стимула)|Bonuses alone don't [[motivate]] people.|Одни лишь бонусы не мотивируют людей.|motivate sb to do|
collaborate|сотрудничать|сотрудничать (collaborate with / on)|конкурировать|We [[collaborated]] with the design team.|Мы работали совместно с командой дизайна.|collaborate with sb on sth|
lay off|сокращать (увольнять по сокращению)|сокращать (увольнять из-за сокращения штата)|нанимать|The company [[laid off]] 200 employees.|Компания сократила 200 сотрудников.|lay off staff; be laid off|
assign|поручать, назначать (задачу)|поручать (задачу), назначать на задачу (assign sth to sb)|отменять|I've [[assigned]] the ticket to Maria.|Я назначил тикет на Марию.|assign a task to sb|
# Риски и контроль
mitigate|смягчать (риск, последствия)|смягчать (риск, последствия)|усугублять|We added a backup supplier to [[mitigate]] the risk.|Мы добавили резервного поставщика, чтобы снизить риск.|mitigate risks / impact|
comply|соблюдать (требования)|соблюдать (требования, закон; comply with)|нарушать|All suppliers must [[comply]] with the policy.|Все поставщики обязаны соблюдать политику.|comply with regulations|
enforce|обеспечивать соблюдение (правил)|обеспечивать соблюдение (правил, закона)|отменять|The new rules will be strictly [[enforced]].|За соблюдением новых правил будут строго следить.|enforce a rule / policy|
audit|проводить аудит|проводить аудит, проверять (счета, процессы)|подделывать|External consultants [[audited]] our accounts.|Внешние консультанты провели аудит нашей отчётности.|audit accounts / processes|
authorise|санкционировать, разрешать (официально)|официально санкционировать, давать полномочия|запрещать|Only managers can [[authorise]] refunds.|Только руководители могут санкционировать возвраты.|authorise payment / sb to do|
ensure|гарантировать, обеспечивать|гарантировать, обеспечивать (ensure that)|рисковать|Please [[ensure]] that all fields are completed.|Пожалуйста, убедитесь, что все поля заполнены.|ensure that; ensure quality|
anticipate|предвидеть, ожидать (и готовиться)|предвидеть (и заранее готовиться)|не замечать|We [[anticipate]] some delays in Q3.|Мы ожидаем некоторых задержек в третьем квартале.|anticipate problems / demand|
flag|отмечать, обращать внимание (на проблему)|сигнализировать о проблеме, отметить (flag sth to sb)|скрывать|Thanks for [[flagging]] the issue.|Спасибо, что обратил внимание на проблему.|flag an issue / a risk|
minimise|сводить к минимуму|сводить к минимуму|максимизировать|We want to [[minimise]] downtime.|Мы хотим свести простои к минимуму.|minimise risk / costs / downtime|
`;

export const BUSINESS = [];
let cat = "";
RAW.trim().split("\n").forEach(line => {
  if (line.startsWith("#")) { cat = line.slice(1).trim(); return; }
  const [en, ru, prompt, wrong, exS, exR, coll, group] = line.split("|").map(s => (s || "").trim());
  const target = (exS.match(/\[\[(.+?)\]\]/) || [])[1] || en;
  const accepted = [en];
  const IZE = new Set(["prioritise", "summarise", "finalise", "optimise", "authorise", "minimise"]);
  if (IZE.has(en)) accepted.push(en.replace(/ise$/, "ize"));
  if (en === "analyse") accepted.push("analyze");
  const cloze = [target];
  if (IZE.has(en)) cloze.push(target.replace(/is(e|ed|es|ing)$/, "iz$1"));
  if (target === "analysed") cloze.push("analyzed");
  BUSINESS.push({
    id: "bus-" + en.replace(/\s+/g, "-"), english: en, russian: ru, testPrompt: prompt || ru, acceptedEnglishAnswers: accepted, acceptedRussianAnswers: [ru],
    exampleSentence: exS, exampleTranslation: exR, category: cat, group: group || null, wrongRussian: wrong, clozeAnswers: cloze,
    collocations: coll ? coll.split(";").map(s => s.trim()) : [], usageNotes: "", level: "B2", tags: ["business"], n: BUSINESS.length + 1
  });
});
