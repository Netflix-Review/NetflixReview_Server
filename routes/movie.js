var express = require('express');
var router = express.Router();
/* GET users listing. */
const db = require('../db');

router.get('/', function(req, res, next) {
  db.getMovie((rows)=>{
    res.send(rows);
    console.log(rows);
  })
  
});

module.exports = router;
