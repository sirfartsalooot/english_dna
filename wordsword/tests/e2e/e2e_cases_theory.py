import os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
os.makedirs("./e2e-out/csv",exist_ok=True)
import asyncio, json, os, threading, functools, http.server, socketserver
class Q(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*a,**k): super().__init__(*a,directory=ROOT,**k)
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.ThreadingTCPServer(("127.0.0.1",8770),Q); threading.Thread(target=srv.serve_forever,daemon=True).start()
from playwright.async_api import async_playwright
URL="http://localhost:8770/"
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
        ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)
        pg=await ctx.new_page(); errs=[]
        pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e)))
        await pg.goto(URL); await pg.wait_for_selector('.bnav')
        await tap(pg,'.bnav button:has-text("Тесты")'); await tap(pg,'.row:has-text("Контрольная Case Lab")'); await tap(pg,'.footer .btn-dark:has-text("Начать")')
        await pg.wait_for_selector('.banner.exam'); kinds={}
        total=int((await pg.locator('.nav3 .mid').inner_text()).split('/')[1])
        for i in range(total):
            k=await answer_current(pg); kinds[k]=kinds.get(k,0)+1
            if k=='branch': await pg.screenshot(path=S+'30_branch_exam.png')
            if k=='order' and kinds[k]==1: await pg.screenshot(path=S+'31_order.png')
            if k=='fix' and kinds[k]==1: await pg.screenshot(path=S+'32_fix.png')
            if k=='match' and kinds[k]==1: await pg.screenshot(path=S+'33_match.png')
            assert await pg.locator('.fb, .tile.good, .bstep .fbk').count()==0, 'feedback leaked in exam'
            if i<total-1: await tap(pg,'.nav3 button[aria-label="Вперёд"]')
        print('formats answered:', kinds, 'filled:', await pg.locator('.nav3 .mid').inner_text())
        await tap(pg,'.footer .btn-dark:has-text("Завершить")'); await tap(pg,'.sheet .btn-dark'); await pg.wait_for_selector('.sum')
        print('result:', (await pg.locator('.kpis').inner_text()).replace('\n',' '))
        # open a branch review
        await pg.locator('.content').evaluate('e=>e.scrollTo(0,99999)')
        n=await pg.locator('.cardx').count(); opened=False
        for i in range(n):
            c=pg.locator('.cardx').nth(i)
            await c.locator('.row').first.click(); await pg.wait_for_timeout(150)
            if await c.locator('.bpath').count(): await c.scroll_into_view_if_needed(); await pg.screenshot(path=S+'34_branch_review.png'); opened=True; break
            await c.locator('.row').first.click()
        print('branch review with per-step feedback:', opened)
        # new blocks: course list, a lesson + mini-check in block 18, Theory Check across 18 blocks
        await pg.goto(URL); await pg.wait_for_selector('.bnav'); await tap(pg,'.bnav button:has-text("Курс")')
        print('blocks listed:', await pg.locator('.lv-card').count())
        await pg.locator('.lv-card:has-text("Register / Nuance")').click(); await pg.wait_for_timeout(300)
        await tap(pg,'.row:has-text("Вежливое несогласие")'); await pg.screenshot(path=S+'40_lesson18.png')
        await tap(pg,'.footer .btn-dark')
        for i in range(3):
            await answer_current(pg); await tap(pg,'.footer .btn-dark:has-text("Проверить")'); await tap(pg,'.footer .btn-dark:has-text("Дальше")')
        print('block 18 mini-check done:', await pg.locator('.sum h2').count()==1)
        await pg.goto(URL); await pg.wait_for_selector('.bnav'); await tap(pg,'.bnav button:has-text("Тесты")')
        await tap(pg,'.row:has-text("Theory Check")'); await tap(pg,'.footer .btn-dark:has-text("Начать")'); await pg.wait_for_selector('.banner.exam')
        sess=await pg.evaluate("""() => new Promise(r=>{const q=indexedDB.open('wordsword');q.onsuccess=()=>{const t=q.result.transaction('sessions').objectStore('sessions').get('exam:theory');t.onsuccess=()=>r(t.result)}})""")
        mods=set(v['module'] for v in sess['attempt']['snapshot'].values())
        print('theory check items:', len(sess['attempt']['items']), 'blocks covered:', len(mods))
        total=len(sess['attempt']['items'])
        for i in range(total):
            await answer_current(pg)
            if i<total-1: await tap(pg,'.nav3 button[aria-label="Вперёд"]')
        await tap(pg,'.footer .btn-dark:has-text("Завершить")'); await tap(pg,'.sheet .btn-dark'); await pg.wait_for_selector('.sum')
        print('theory result:', (await pg.locator('.kpis').inner_text()).replace('\n',' '))
        await pg.screenshot(path=S+'41_theory_result.png')
        print('errors', errs)
        await b.close()
asyncio.run(main())
