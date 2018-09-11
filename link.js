const puppeteer = require('puppeteer');

function getlink(pagelink) {
    return new Promise(async(res, rej) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(pagelink);
        //await page.waitForNavigation();
        await page.screenshot({ path: 'screenshot11.png' });
        await page.waitForSelector(".search-results > a")
        const link = await page.evaluate(() => {
            const list = Array.from(document.querySelectorAll(".search-results > a"));
            return list.map(i => i.href)
        })
        res(link);
        await browser.close()

    })

}
module.exports = getlink;