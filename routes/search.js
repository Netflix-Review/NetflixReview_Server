var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', async function(req,res){
    console.log(req.body.text);
     var promise = new Promise(function(resolve, reject){
         const sql = 'select id from tv where title like ?';
         const params = [req.body.text];
         db.con.query(sql,'%'+params+'%',function(err, results){
             if(err){
                 console.log(err);
                 reject(err);
             }
             resolve(results);
         });
     });
     promise.then(function(results){
         console.log(results.length);
         if(results.length===0){
             res.status(401).send({
                 message:"not found",
             });
         }
         else{
            res.status(201).send({
                results,
            });
        }
     }), function(err){
         throw err;
     }
});
 
module.exports = router;