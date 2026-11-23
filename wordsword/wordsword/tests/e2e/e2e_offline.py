import os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
os.makedirs("./e2e-out/csv",exist_ok=True)
import asyncio, threading, functools, http.server, socketserver
class Q(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*a,**k): super().__init__(*a,directory=ROOT,**k)
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.ThreadingTCPServer(("127.0.0.1",8769),Q); threading.Thread(target=srv.serve_forever,daemon=True).start()
from playwright.async_api import async_playwright
URL="http://localhost:8769/"; S='./e2e-out/'
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--no-proxy-server"])
        ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)
        pg=await ctx.new_page(); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_selector('.bnav')
        await pg.evaluate("navigator.serviceWorker.ready.then(()=>1)")
        await pg.wait_for_timeout(1500)
        # wrong-answer colour in learning mode
        await pg.click('.bnav button:has-text("Курс")'); await pg.click('.lv-card.lv-1'); await pg.click('.row:has-text("Система: время × аспект")'); await pg.click('.footer .btn-dark')
        await pg.wait_for_selector('.tiles .tile')
        # pick a wrong option: find tile whose text differs from correct (unknown) → pick each until wrong found? choose last tile
        await pg.locator('.tiles .tile').last.click(); await pg.click('.footer .btn-dark:has-text("Проверить")'); await pg.wait_for_timeout(400)
        print('badf tiles:', await pg.locator('.tile.badf').count(), 'sel after check:', await pg.locator('.tile.sel').count())
        await pg.screenshot(path=S+'20_wrong.png')
        await pg.click('.footer .btn-dark:has-text("Дальше")')
        # make an exam error so dashboard has heat map
        # offline reload
        await ctx.set_offline(True)
        await pg.goto(URL); await pg.wait_for_selector('.bnav', timeout=15000)
        await pg.click('.bnav button:has-text("Курс")'); await pg.click('.lv-card.lv-3'); await pg.click('.row:has-text("Обязанность")'); await pg.wait_for_timeout(500)
        txt=await pg.locator('.lesson').inner_text()
        print('OFFLINE lesson renders:', 'mustn' in txt)
        fonts=await pg.evaluate("document.fonts.check('16px Onest') && document.fonts.check('16px Newsreader')")
        print('offline fonts available:', fonts)
        await pg.goto(URL); await pg.wait_for_selector('.bnav'); await pg.click('.bnav button:has-text("Прогресс")'); await pg.wait_for_selector('.heat')
        await pg.locator('.heat td button').first.click(); await pg.wait_for_timeout(700); await pg.screenshot(path=S+'21_drill_offline.png')
        await pg.locator('.sheet .btn-light').last.click()
        await pg.screenshot(path=S+'22_offline_dash.png')
        print('errors', errs)
        await b.close()
asyncio.run(main())
