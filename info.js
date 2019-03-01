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
        const data = {
            "Tên công ty": td["Tên công ty\t"],
            "Mã số thuế": td["Mã số thuế\t"],
            "Ngày cấp": td["Ngày cấp\t"],
            "Tình trạng hoạt động": td["Tình trạng hoạt động\t"],
            "Nơi đăng ký quản lý": td["Nơi đăng ký quản lý\t"],
            "Địa chỉ trụ sở": td["Địa chỉ trụ sở\t"],
            "Điện thoại": td["Điện thoại\t"],
            "Giám đốc": td["Giám đốc\t"],
            "Chủ sở hữu": td["Chủ sở hữu\t"],
            "Ngành nghề kinh doanh": td["Ngành nghê kinh doanh\t"],
            "Tài khoản ngân hàng": td["Tài khoản ngân hàng\t"],
            "Ghi chú": td["Ghi chú\t"],
            "FAX": td["FAX\t"],

        }
        await browser.close();

        db("doanhnghiep").insert(data)
            .then(id => {
                console.log(id)
                res(id)
            })
    })
}

module.exports = getinfo;