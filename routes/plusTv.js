var express = require('express');
var router = express.Router();

const db = require('../db');

 
router.post('/',function(req,res){
  const id = req.body.id;
  const rank = req.body.rank;
  const connect = db.con;
  if(rank==='Up'){
      connect.query(`update tv set tv.rank=tv.rank+1 where id='${id}'`,function (err,result){
        if(err) console.log("Up error"+err);
    });
    const sql = 'select tv.rank, tv.rankdown from tv where id=?';
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
      connect.query(`update tv set tv.rankdown=tv.rankdown+1 where id='${id}'`,function (err,result){
        if(err) console.log("Down err"+err);
    });
    const sql = 'select tv.rank, tv.rankdown from tv where id=?';
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


