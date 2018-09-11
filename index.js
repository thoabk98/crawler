const GetLink = require('./link')
const GetInfo = require('./info')
const link = "https://doanhnghiepmoi.vn/Ha-Noi/page-1/";

(async() => {
    const links = await GetLink(link);
    links.forEach(async(item) => {
        console.log(item)
            // const info = await GetInfo(item);
    });

})();