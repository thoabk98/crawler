const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.goto('https://www.anjsub.com/p/watch-devilman-crybaby.html', { waitUntil: 'networkidle2' });


    await browser.close();
})();