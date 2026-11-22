// 30-day route. Each day: ~20 min theory, ~30 min vocabulary, ~35 min grammar/cases, ~20 min error review.
// Items point to real content; items for blocks not yet available in this build are shown as "ещё нет в сборке".
const T = (block, lessons) => ({ k: "lesson", block, lessons, min: 20 });
const V = (dict, set, note) => ({ k: "vocab", dict, set, note, min: 30 });
const G = (block, note) => ({ k: "practice", block, note, min: 35 });
const X = (test, note) => ({ k: "test", test, note, min: 35 });
const CL = note => ({ k: "cases", note, min: 35 });
const R = () => ({ k: "review", min: 20 });

export const PLAN = [
  // Неделя 1: фундамент, времена, General 1–70, Business 1–25, неправильные глаголы
  { day: 1, week: 1, title: "Система времён", items: [T("tenses", ["ten-sys", "ten-simple"]), V("general", "general-1", "слова 1–25"), G("tenses", "Simple и вопросы"), R()] },
  { day: 2, week: 1, title: "Continuous и стативы", items: [T("tenses", ["ten-cont", "ten-stative"]), V("general", "general-1", "слова 26–50"), G("tenses", "Continuous / stative"), R()] },
  { day: 3, week: 1, title: "Present Perfect", items: [T("tenses", ["ten-pp", "ten-ppc"]), V("irregular", "irr-1", "глаголы 1–50"), G("tenses", "PP vs Past Simple"), R()] },
  { day: 4, week: 1, title: "Прошедшее и будущее", items: [T("tenses", ["ten-pastperf", "ten-future"]), V("general", "general-2", "слова 51–70"), G("tenses", "Past Perfect, future"), R()] },
  { day: 5, week: 1, title: "Придаточные и сочетания", items: [T("tenses", ["ten-timecl", "ten-mix"]), V("business", "business-1", "слова 1–25"), CL("кейсы по временам"), R()] },
  { day: 6, week: 1, title: "Неправильные глаголы", items: [T("irregular", ["irr-roles", "irr-aaa", "irr-abb", "irr-abc"]), V("irregular", "irr-2", "глаголы 51–100"), G("irregular", "формы V1→V2→V3"), R()] },
  { day: 7, week: 1, title: "Контроль недели 1", items: [T("irregular", ["irr-aba", "irr-variants", "irr-confusing", "irr-pron"]), V("irregular", "irr-3", "глаголы 101–120"), X("block:tenses", "контрольная по временам"), X("block:irregular", "контрольная по глаголам")] },
  // Неделя 2: modals, conditionals, passive, gerund; General 71–140; Business 26–50
  { day: 8, week: 2, title: "Модальные: основа", items: [T("modals", ["mod-basics", "mod-ability", "mod-permission"]), V("general", "general-2", "слова 71–100"), G("modals"), R()] },
  { day: 9, week: 2, title: "Обязанность и совет", items: [T("modals", ["mod-obligation", "mod-advice"]), V("general", "general-3", "слова 101–120"), G("modals"), R()] },
  { day: 10, week: 2, title: "Выводы и modal perfect", items: [T("modals", ["mod-deduction-present", "mod-deduction-past", "mod-perfect-crit", "mod-will-would"]), V("business", "business-1", "слова 26–50"), CL("кейсы по модальным"), R()] },
  { day: 11, week: 2, title: "Conditionals 0–3", items: [T("conditionals", ["cond-zero-first", "cond-second", "cond-third"]), V("general", "general-3", "слова 121–140"), G("conditionals"), R()] },
  { day: 12, week: 2, title: "Mixed, unless, инверсия", items: [T("conditionals", ["cond-mixed", "cond-unless", "cond-inversion"]), V("business", "business-1", "повторение 1–50"), G("conditionals"), R()] },
  { day: 13, week: 2, title: "Wish и нереальное прошлое", items: [T("conditionals", ["cond-wish", "cond-unreal-past", "cond-variants"]), V("general", "general-2", "итоговая 50/50"), X("block:modals"), X("block:conditionals")] },
  { day: 14, week: 2, title: "Passive и Gerund", items: [T("passive"), T("gerund"), V("general", "general-3", "повторение"), R()] },
  // Неделя 3
  { day: 15, week: 3, title: "Reported Speech", items: [T("reported"), V("general", "general-3", "итоговая 50/50"), CL("смешанные кейсы"), R()] },
  { day: 16, week: 3, title: "Relative Clauses", items: [T("relative"), V("general", "general-4", "слова 151–175"), G("tenses", "повторение слабых тем"), R()] },
  { day: 17, week: 3, title: "Articles", items: [T("articles"), V("general", "general-4", "слова 176–200"), G("modals", "повторение слабых тем"), R()] },
  { day: 18, week: 3, title: "Prepositions", items: [T("prepositions"), V("business", "business-2", "слова 51–75"), G("conditionals", "повторение слабых тем"), R()] },
  { day: 19, week: 3, title: "Linking Words", items: [T("linking"), V("general", "general-4", "итоговая 50/50"), CL("кейсы: ветвление"), R()] },
  { day: 20, week: 3, title: "Phrasal Verbs", items: [T("phrasal"), V("business", "business-2", "повторение 51–75"), X("theory", "Theory Check"), R()] },
  { day: 21, week: 3, title: "Collocations", items: [T("collocations"), V("general", null, "полный контрольный General 200"), X("cases", "контрольная Case Lab"), R()] },
  // Неделя 4
  { day: 22, week: 4, title: "Word Formation", items: [T("wordform"), V("business", "business-2", "слова 76–100"), G("irregular", "формы"), R()] },
  { day: 23, week: 4, title: "Quantifiers / Comparison", items: [T("quantifiers"), V("business", "business-2", "итоговая 50/50"), CL("кейсы: hotspot"), R()] },
  { day: 24, week: 4, title: "Advanced Grammar", items: [T("advanced"), V("business", null, "полный контрольный Business 100"), G("tenses"), R()] },
  { day: 25, week: 4, title: "Register / Nuance", items: [T("register"), V("irregular", null, "полный контрольный Irregular"), G("modals"), R()] },
  { day: 26, week: 4, title: "Смешанный экзамен 1", items: [X("mixed"), V("general", "general-1", "повторение сложных"), R()] },
  { day: 27, week: 4, title: "Слабые места", items: [R(), G("conditionals", "по карте ошибок"), V("general", "general-2", "повторение сложных"), CL()] },
  { day: 28, week: 4, title: "Theory Check 2", items: [X("theory"), V("general", "general-3", "повторение сложных"), R()] },
  { day: 29, week: 4, title: "Case Lab 2", items: [X("cases"), V("general", "general-4", "повторение сложных"), R()] },
  { day: 30, week: 4, title: "Финальный смешанный экзамен", items: [X("mixed", "сравните с днём 26"), V("general", null, "полный контрольный General 200"), R()] }
];
