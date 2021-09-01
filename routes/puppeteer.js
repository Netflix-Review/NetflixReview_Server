let puppeteer = require('puppeteer');

async function main(){
    let browser = await puppeteer.launch({headless:false});
    let page= await browser.newPage();
    await page.goto("https://www.netflix.com/browse/genre/34399");
    let eh = await page.$(".nm-content-horizontal-row");
    let title= await eh.$eval('span.nm-collections-title-name', function(e1){
        return e1.innerText;
    })
    console.log(title);
}


main();