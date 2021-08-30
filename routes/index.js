var express = require('express');
var router = express.Router();
const request = require('request');

const options = {
  method: 'GET',
  url: 'https://unogsng.p.rapidapi.com/genres',
  headers: {
    'x-rapidapi-host': 'unogsng.p.rapidapi.com',
    'x-rapidapi-key': '412cd19b01msh0b3fcf00757d8d6p1f9bedjsnf7eed9375b4a',
    useQueryString: true
  }
};


router.get('/',async(req,res)=>{ 
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    let data=[];
    data=JSON.parse(body);
    res.send(data);
  });
  
}); 

module.exports = router;


