// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
const cheerio = require("cheerio");

(async() => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    headless: false
  });

  // 새로운 페이지를 연다.
  const page = await browser.newPage();

  const $ = cheerio.load(html.data);
  const $rankList = $("#appMountPoint > div > div.nm-collections-page > main > section:nth-child(2) > div > ul > li");
  $rankList.each((idx,node)=>{
      console.log(idx);
  });
  // 페이지의 크기를 설정한다.
  await page.setViewport({
    width: 1366,
    height: 768
  });
  // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
  await page.goto('https://www.netflix.com/kr/browse/genre/34399');
})();