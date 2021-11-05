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
    const sql = 'select movie.rank, movie.rankdown from movie where id=?';
    connect.query(sql,[id],function(err,rows,results){
      console.log(rows[0].rank);
      const RankResult = (rows[0].rank/(rows[0].rank+rows[0].rankdown))*100;
      console.log(RankResult);
      res.status(201).send({
        RankResult,
      })
    });
  }
  else if(rank==='Down'){
      connect.query(`update movie set movie.rank=movie.rank-1 where id='${id}'`,function (err,result){
        if(err) console.log("Down err"+err);
    });
    const sql = 'select movie.rank, movie.rankdown from movie where id=?';
    connect.query(sql,[id],function(err,rows,results){
      console.log(rows[0].rank);
      const RankResult = (rows[0].rank/(rows[0].rank+rows[0].rankdown))*100;
      console.log(RankResult);
      res.status(201).send({
        RankResult,
      })
    });
  }
})

module.exports = router;


