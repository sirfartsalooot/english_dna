import { test } from "node:test";
import assert from "node:assert/strict";
import { IDBFactory } from "fake-indexeddb";
import { createStore, migrateLegacyVocab } from "../src/engine/store.js";
import { openDB, makeDB, MIGRATIONS } from "../src/engine/db.js";
import { createAttempt, finish } from "../src/engine/exam.js";
import { makeBackup, validateBackup } from "../src/engine/csv.js";
import { rngFrom } from "../src/engine/util.js";
import * as C from "../src/content/index.js";

test("migration v1 creates all stores and is idempotent on reopen", async () => {
  const idb = new IDBFactory();
  const db1 = await openDB(idb, "t1"); assert.deepEqual([...db1.objectStoreNames].sort(), ["attempts", "events", "kv", "sessions"]); db1.close();
  const db2 = await openDB(idb, "t1"); assert.equal(db2.version, 1); db2.close();
  assert.equal(typeof MIGRATIONS[1], "function");
});

test("progress survives closing and reopening the database (app restart)", async () => {
  const idb = new IDBFactory();
  const s1 = createStore({ idb, name: "restart" }); await s1.init();
  await s1.saveDoc("vocab:general-1", { stats: { "gen-ask": { c: 3, w: 1 } } }, 0);
  const att = createAttempt(C.TEST_BY_ID["block:tenses"], {}, { rng: rngFrom(1) });
  att.responses[att.items[0].qid] = 0; await s1.putSession({ id: "exam:block:tenses", attempt: att });
  assert.equal(s1.status.state, "saved");
  s1.db().raw.close();
  const s2 = createStore({ idb, name: "restart" }); await s2.init();
  assert.deepEqual((await s2.get("vocab:general-1")).stats["gen-ask"], { c: 3, w: 1 });
  const restored = (await s2.getSession("exam:block:tenses")).attempt;
  assert.equal(restored.items.length, att.items.length); assert.equal(restored.responses[att.items[0].qid], 0, "unfinished exam answers restored");
});

test("finishing an exam is atomic: attempt + events + exposure saved, session removed", async () => {
  const idb = new IDBFactory(); const s = createStore({ idb, name: "commit" }); await s.init();
  const att = createAttempt(C.TEST_BY_ID["block:conditionals"], {}, { rng: rngFrom(4) }); att.id = "att-x";
  await s.putSession({ id: "exam:block:conditionals", attempt: att });
  const { attempt, events } = finish(att);
  await s.commitAttempt(attempt, events, { exposure: { "block:conditionals": Object.fromEntries(att.items.map(i => [i.qid, 1])) } }, "exam:block:conditionals");
  assert.equal((await s.attempts()).length, 1); assert.equal((await s.events()).length, att.items.length);
  assert.equal(await s.getSession("exam:block:conditionals"), undefined);
  assert.equal(Object.keys((await s.get("exposure"))["block:conditionals"]).length, att.items.length);
});

test("JSON backup round-trip: export → validate → import into a fresh database", async () => {
  const idbA = new IDBFactory(); const a = createStore({ idb: idbA, name: "a" }); await a.init();
  await a.saveDoc("course", { lessons: { "ten-sys": { doneAt: 5 } } }, 0);
  await a.addEvents([{ id: "e1", ts: 10, questionId: "ten-001", moduleId: "tenses", isCorrect: true }]);
  const backup = JSON.parse(JSON.stringify(makeBackup(await a.dumpAll(), 1, C.CONTENT_VERSION)));
  assert.equal(validateBackup(backup).ok, true);
  const idbB = new IDBFactory(); const b = createStore({ idb: idbB, name: "b" }); await b.init();
  await b.replaceAll(backup.data);
  assert.equal((await b.get("course")).lessons["ten-sys"].doneAt, 5); assert.equal((await b.events()).length, 1);
});

test("legacy vocab-app progress is migrated with remapped ids", () => {
  const legacy = JSON.stringify({ v: 1, stats: { 1: { c: 2, w: 0 } }, levels: { 1: { learned: [1, 2], size: 20, runs: 3 } }, test: { current: { order: [3, 1], answers: { 3: "hello" }, idx: 0 }, history: [{ ts: 5, score: 100, total: 123 }] } });
  const m = migrateLegacyVocab(legacy);
  assert.deepEqual(m.levels[1].learned, ["ai-1", "ai-2"]); assert.deepEqual(m.stats["ai-1"], { c: 2, w: 0 });
  assert.deepEqual(m.test.current.order, ["ai-3", "ai-1"]); assert.equal(m.test.current.answers["ai-3"], "hello");
  assert.equal(migrateLegacyVocab("not json"), null);
});
