var express = require('express');
var router = express.Router();

//const db = require('../db');

router.post('/',function(req,res){
  console.log(req.body);
  const id = req.body.id;
  const rank = req.body.rank;
  console.log(id);
})

module.exports = router;


