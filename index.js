const GetLink = require('./link')
const GetInfo = require('./info')
const link = "https://doanhnghiepmoi.vn/Ha-Noi/";
const curr = 1;
const next = (i) => {
    if (i < 9235) page(link, i, next)
}
const page = async(link, curr, callback) => {
    const pagelink = link + "page-" + curr + "/";
    const links = await GetLink(pagelink);
    const delay = () => { return new Promise(res => setTimeout(res, 5000)) }
    const delayItem = async(item) => {
        await delay();
        await GetInfo(item);
    };
    const arr = async(arr) => {
        for (let item of arr) {
            await delayItem(item);
        }
        callback(++curr);
        console.log("Done!");
    }
    arr(links)

}
page(link, curr, next);