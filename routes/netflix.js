var express = require('express');
var router = express.Router();
 
const axios = require("axios");
const cheerio = require("cheerio");
var html = "";
let movie = [];
async function getHTML(){
    try{
        console.log("getHtml");
        return await axios.get("https://www.netflix.com/kr/browse/genre/34399");
    }catch(err){
        console.log(err);
    }
}

async function parsing(){
    html = await getHTML();
    const $ = cheerio.load(html.data);
    const $rankList = $(".nm-content-horizontal-row-item"); 
     
    $rankList.each((idx,node)=>{
        movie.push({
            title:$(node).find("span.nm-collections-title-name").text(),
            image:$(node).find("img.nm-collections-title-img").attr('src')
        })
    });
    return movie;
}
parsing();
router.get('/', function(req, res,next) {
    res.send(movie);
  }); 

  module.exports = router;