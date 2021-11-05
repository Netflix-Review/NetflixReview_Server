var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', async function(req,res){
    console.log(req.body.text);
     var promise = new Promise(function(resolve, reject){
         const sql = 'select * from tv where title like ?;'+ 'select * from drama where title like ?;'+ 'select * from movie where title like ?;';
         const params = [req.body.text];
         db.con.query(sql,['%'+params+'%','%'+params+'%','%'+params+'%'],function(err,rows ,results){
             if(err){
                 console.log(err);
                 reject(err);
             }
             resolve(rows);
         });
     });
     promise.then(function(rows){
         const count = rows[0].length + rows[1].length + rows[2].length;
         if(Object.keys(rows[0].length===0)) console.log("null");

         if(count===0){
             res.status(401).send({
                 message:"not found",
             });
         }
         else{
            res.send(rows);
        }
     }), function(err){
         throw err;
     }
});
 
module.exports = router;