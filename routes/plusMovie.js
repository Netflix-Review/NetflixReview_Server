var express = require('express');
var router = express.Router();

const db = require('../db');

 
router.post('/',function(req,res){
  console.log(req.body);
  const id = req.body.id;
  const rank = req.body.rank;
  const connect = db.con;
  if(rank==='Up'){
      connect.query(`update movie set movie.rank=movie.rank+1 where id='${id}'`,function (err,result){
        if(err) console.log("Up error"+err);
    });
    connect.query(`select movie.rank from movie where id='${id}'`,function(err,rows,result){
      res.send(rows);
      console.log(rows);
    });
  }
  else if(rank==='Down'){
      connect.query(`update movie set movie.rank=movie.rank-1 where id='${id}'`,function (err,result){
        if(err) console.log("Down err"+err);
    });
    connect.query(`select movie.rank from movie where id='${id}'`,function(err,rows,result){
        res.send(rows);
        console.log(rows);
    });
  }
})

module.exports = router;

