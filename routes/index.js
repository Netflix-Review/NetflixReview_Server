var express = require('express');
var router = express.Router();
/* GET users listing. */
const db = require('../db');

router.get('/', function(req, res, next) {
  db.getMovie((rows)=>{
    res.render('index',{rows:rows});
  })
  //res.send('respond with a resource');
});
// router.get('/movie',async(req,res) => {
//     const movieList = await handleAsync();
//     console.log(movieList);
//     res.send(movieList); 
// });
module.exports = router;
