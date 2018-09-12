const db = require('./dbconnect')
const puppeteer = require('puppeteer');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const getinfo = async(link) => {
    await delay(5000);
    return new Promise(async(res, rej) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link);
        await page.waitForSelector('tr');

        const td = await page.evaluate(() => {
            const list = Array.from(document.querySelectorAll('tr'));
            let obj = {};
            list.forEach((item) => obj[item.cells[0].innerText] = item.cells[1].innerText)
            return obj;
        });
        await browser.close();

        db("doanhnghiep").insert(td)
            .then(id => {
                console.log(id)
                res(id)
            })
    })
}

module.exports = getinfo;