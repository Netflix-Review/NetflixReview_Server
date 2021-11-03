var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', async function(req,res){
    console.log(req.body.text);
     var promise = new Promise(function(resolve, reject){
         const sql = 'select * from tv where title like ?;'+ 'select * from drama where title like ?;'+ 'select * from movie where title like ?;';
         const params = [req.body.text];
         db.con.query(sql,['%'+params+'%','%'+params+'%','%'+params+'%'],function(err, results){
             if(err){
                 console.log(err);
                 reject(err);
             }
             resolve(results);
         });
     });
     promise.then(function(results){
         const count = results[0].length + results[1].length + results[2].length;
         if(Object.keys(results[0].length===0)) console.log("null");
         if(count===0){
             res.status(401).send({
                 message:"not found",
             });
         }
         else{
            res.status(201).send({
                results
            });
        }
     }), function(err){
         throw err;
     }
});
 
module.exports = router;