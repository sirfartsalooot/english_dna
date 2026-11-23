import os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
os.makedirs("./e2e-out/csv",exist_ok=True)
import asyncio, json, os, threading, functools, http.server, socketserver
class Q(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*a,**k): super().__init__(*a,directory=ROOT,**k)
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.ThreadingTCPServer(("127.0.0.1",8768),Q); threading.Thread(target=srv.serve_forever,daemon=True).start()
from playwright.async_api import async_playwright
URL="http://localhost:8768/"
S='./e2e-out/'
async def tap(pg,sel): await pg.locator(sel).first.click(); await pg.wait_for_timeout(250)
async def answer_current(pg):
    # answer whatever question is on screen, generically
    if await pg.locator('.tiles .tile:not([disabled])').count() and await pg.locator('.qmeta .tagchip:has-text("Несколько")').count()==0 and await pg.locator('.bpath').count()==0:
        await pg.locator('.tiles .tile:not([disabled])').first.click(); return 'single'
    if await pg.locator('.qmeta .tagchip:has-text("Несколько")').count():
        txt=await pg.locator('p.hint').first.inner_text(); need=int([w for w in txt.split() if w.isdigit()][0])
        have=await pg.locator('.tiles .tile.sel').count()
        for i in range(need-have): await pg.locator('.tiles .tile:not([disabled]):not(.sel)').first.click()
        return 'multi'
    if await pg.locator('.qmeta .tagchip:has-text("Сценарий")').count():
        for i in range(6):
            if await pg.locator('.tiles .tile').count()==0: break
            await pg.locator('.tiles .tile').first.click(); await pg.wait_for_timeout(120)
        return 'branch'
    if await pg.locator('.mitem').count():
        n=await pg.locator('.mitem').count()
        for i in range(n): await pg.locator('.mitem').nth(i).locator('.mc button').first.click()
        return 'match'
    if await pg.locator('.obank').count():
        n=await pg.locator('.obank .tok').count()
        for i in range(n): await pg.locator('.obank .tok:not([disabled])').first.click()
        return 'order'
    if await pg.locator('.fixs').count():
        await pg.locator('.fixs button').first.click(); await pg.locator('.content input.minput').fill('test'); return 'fix'
    if await pg.locator('.content input.minput').count():
        await pg.locator('.content input.minput').fill('was'); return 'input'
    return '?'
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--no-proxy-server"])
        ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True,accept_downloads=True)
        pg=await ctx.new_page(); errs=[]
        pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e)))
        pg.on('console',lambda m: m.type=='error' and errs.append('CONSOLE '+m.text))
        await pg.goto(URL); await pg.wait_for_selector('.bnav')
        # --- lesson + mini check
        await tap(pg,'.bnav button:has-text("Курс")'); await tap(pg,'.lv-card.lv-1')
        await tap(pg,'.row:has-text("Система: время × аспект")'); await pg.screenshot(path=S+'10_lesson.png')
        await tap(pg,'.footer .btn-dark')
        for i in range(3):
            await answer_current(pg); await tap(pg,'.footer .btn-dark:has-text("Проверить")')
            assert await pg.locator('.fb').count()>0, 'learning feedback missing'
            if i==0: await pg.screenshot(path=S+'11_check_fb.png', full_page=False)
            await tap(pg,'.footer .btn-dark:has-text("Дальше")')
        assert await pg.locator('.sum h2:has-text("Тренировка завершена")').count()==1
        await tap(pg,'.footer .btn-light'); await pg.wait_for_timeout(300)
        lessons_done = await pg.evaluate("""() => new Promise(r=>{const q=indexedDB.open('wordsword');q.onsuccess=()=>{const t=q.result.transaction('kv').objectStore('kv').get('course');t.onsuccess=()=>r(t.result)}})""")
        print('lesson done saved:', 'ten-sys' in (lessons_done or {}).get('lessons',{}))
        # --- block exam: no feedback, resume after reload
        await pg.goto(URL); await pg.wait_for_selector('.bnav')
        await tap(pg,'.bnav button:has-text("Тесты")'); await tap(pg,'.row:has-text("Времена и aspect")'); await tap(pg,'.footer .btn-dark:has-text("Начать")')
        await pg.wait_for_selector('.banner.exam')
        first_ids=[]
        for i in range(5):
            kind=await answer_current(pg)
            assert await pg.locator('.fb').count()==0, 'feedback visible in exam!'
            assert await pg.locator('.tile.good, .tile.badf, .mitem.good').count()==0, 'correctness revealed in exam!'
            await tap(pg,'.nav3 button[aria-label="Вперёд"]')
        await pg.screenshot(path=S+'12_exam.png')
        sess=await pg.evaluate("""() => new Promise(r=>{const q=indexedDB.open('wordsword');q.onsuccess=()=>{const t=q.result.transaction('sessions').objectStore('sessions').get('exam:block:tenses');t.onsuccess=()=>r(t.result)}})""")
        print('session saved, answered:', len(sess['attempt']['responses']))
        await pg.reload(); await pg.wait_for_selector('.bnav')
        cont=await pg.locator('.row:has-text("Контрольная: Времена")').count(); print('resume offered on Today:', cont>0)
        await tap(pg,'.row:has-text("Контрольная: Времена")'); await pg.wait_for_selector('.banner.exam')
        filled=await pg.locator('.nav3 .mid').inner_text(); print('filled after reload:', filled)
        # fill rest and finish
        total=int(filled.split('/')[1])
        for i in range(total):
            await tap(pg,'.nav3 .mid'); await pg.locator('.grid .cell').nth(i).click(); await pg.wait_for_timeout(150)
            await answer_current(pg)
        await tap(pg,'.footer .btn-dark:has-text("Завершить")'); await tap(pg,'.sheet .btn-dark')
        await pg.wait_for_selector('.sum'); await pg.screenshot(path=S+'13_results.png')
        await pg.locator('.content').evaluate('e=>e.scrollTo(0,99999)'); await pg.wait_for_timeout(200)
        await pg.locator('.cardx .row').first.click(); await pg.wait_for_timeout(300); await pg.screenshot(path=S+'14_results_review.png')
        atts=await pg.evaluate("""() => new Promise(r=>{const q=indexedDB.open('wordsword');q.onsuccess=()=>{const t=q.result.transaction('attempts').objectStore('attempts').getAll();t.onsuccess=()=>r(t.result)}})""")
        a1=[i['qid'] for i in atts[0]['items']]; print('attempt1', atts[0]['score'],'/',atts[0]['total'])
        # second attempt: freshness
        await tap(pg,'.footer .btn-dark:has-text("Ретест")'); await tap(pg,'.footer .btn-dark:has-text("Начать")'); await pg.wait_for_selector('.banner.exam')
        sess2=await pg.evaluate("""() => new Promise(r=>{const q=indexedDB.open('wordsword');q.onsuccess=()=>{const t=q.result.transaction('sessions').objectStore('sessions').get('exam:block:tenses');t.onsuccess=()=>r(t.result)}})""")
        a2=[i['qid'] for i in sess2['attempt']['items']]; ov=len(set(a1)&set(a2)); print('attempt2 overlap with attempt1:', ov, 'of', len(a2))
        # --- vocab level 2
        await pg.goto(URL); await pg.wait_for_selector('.bnav')
        await tap(pg,'.bnav button:has-text("Слова")'); await tap(pg,'.lv-card:has-text("General 200")'); await tap(pg,'.row:has-text("Набор 1–50")'); await tap(pg,'.lv-card.lv-2')
        for i in range(4):
            await pg.wait_for_selector('.tiles .tile'); await pg.locator('.tiles .tile').first.click(); await pg.wait_for_timeout(250); await tap(pg,'.footer .btn-dark')
        await pg.screenshot(path=S+'15_vocab.png')
        # --- dashboard + CSV
        await pg.goto(URL); await pg.wait_for_selector('.bnav'); await tap(pg,'.bnav button:has-text("Прогресс")')
        await pg.wait_for_selector('.heat'); await pg.screenshot(path=S+'16_dash.png', full_page=False)
        await pg.locator('.heat td button').first.click(); await pg.wait_for_selector('.sheet'); await pg.screenshot(path=S+'17_drill.png'); await tap(pg,'.sheet .btn-light')
        downloads=[]
        pg.on('download', lambda d: downloads.append(d))
        await pg.locator('button:has-text("Экспорт CSV")').click(); await pg.wait_for_timeout(2500)
        os.makedirs('./e2e-out/csv',exist_ok=True)
        for d in downloads: await d.save_as('./e2e-out/csv/'+d.suggested_filename)
        print('downloads:', [d.suggested_filename for d in downloads])
        await pg.locator('.content').evaluate('e=>e.scrollTo(0,99999)'); await pg.wait_for_timeout(200); await pg.screenshot(path=S+'18_export.png')
        # --- persistence after full browser restart (same storage state)
        state=await ctx.storage_state()
        n_before=await pg.evaluate("""() => new Promise(r=>{const q=indexedDB.open('wordsword');q.onsuccess=()=>{const t=q.result.transaction('events').objectStore('events').count();t.onsuccess=()=>r(t.result)}})""")
        print('events stored:', n_before)
        print('errors', errs)
        await b.close()
asyncio.run(main())
