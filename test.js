const delay = () => { return new Promise(res => setTimeout(res, 5000)) }
const delayItem = async(item) => {
    await delay();
    console.log(item);
}
const arr = async(arr) => {
    for (let item of arr) {
        await delayItem(item);

    }
    console.log("Done!");
}
arr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);