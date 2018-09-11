const db = require('./dbconnect')
const rq = require('request')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer');

const getinfo = async(link) => {

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

        console.log(td);
        db("doanhnghiep").insert(td)
            .then(id => {
                res(id)
            })

    })

}

module.exports = getinfo;