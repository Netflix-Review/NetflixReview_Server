var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
  db.getDrama((rows)=>{
    res.send(rows);
  });
  
});

module.exports = router;
