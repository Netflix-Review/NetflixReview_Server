const axios = require("axios");
const cheerio = require("cheerio");

export const getHTML = async(keyword)=>{
    try{
        return await axios.get("https://www.netflix.com/kr/browse/genre/"+encodeURI(keyword));
    }catch(err){
        console.log(err);
    }
}

export const parsing = async(keyword)=>{
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $rankList = $(".nm-content-horizontal-row-item"); 
    let movie = [];
    await Promise.all($rankList.each( async (idx,node)=>{
        movie.push({
            title:$(node).find("span.nm-collections-title-name").text(),
            image:$(node).find("img.nm-collections-title-img").attr('src')
        })
        
    }));
    console.log(movie);
}
parsing(34399);

export {getHTML, parsing};