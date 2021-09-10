var express = require('express');
var router = express.Router();

const db = require('../db');

 
router.post('/',function(req,res){
  console.log(req.body);
  const id = req.body.id;
  const rank = req.body.rank;
  const connect = db.connection;
  if(rank==="Up"){
      connect.query(`update tv set tv.rank=tv.rank+1 where id='${id}'`,function (err,result){
        if(err) console.log("Up error"+err);
    });
    connect.query(`select tv.rank from tv where id='${id}'`,function(err,rows,result){
      res.send(rows);
      
    });
  }
  else if(rank==='Down'){
      connect.query(`update tv set tv.rank=tv.rank-1 where id='${id}'`,function (err,result){
      console.log(result);
      res.send("헐래벌떡은내꺼");
    });
  }
})

module.exports = router;


