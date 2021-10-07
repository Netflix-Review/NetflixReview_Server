var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');
const { validateRegister, isLoggedIn } = require('../middleware/users');
const { render } = require('pug');

router.post('/sign-up',validateRegister ,async function(req,res){
    console.log(req.body.email, req.body.password, req.body.username);
    searchID(req.body.email, req.body.username)
    .then(function(results){
        insertUser(req.body.email, req.body.password, req.body.username)
        .then(function(result){
            return res.status(201).send({
                message: 'create ID success!',
            });
        })
        .catch(function(err){
            console.log(err);
            res.status(401).send({
                message: 'create error please call manger',
            });
        })
    })
    .catch(function(err){
        console.log(err);
        res.send("already have person");
    })
});

router.post('/login', async function(req,res){
    loginID(req.body.email, req.body.password)
    .then(function(results){ 
        const token = jwt.sign({
            username: req.body.username,
        },'SECRETKEY',{expiresIn:"5m"});
        return res.status(201).send({
            message: "login success",
            username: results,
            token,
        });
    })
    .catch(function(err){
        console.log(err);
        res.status(401).send({
            message: 'not correct id or password',
        });
    }) 
}); 

router.post('/auth', isLoggedIn ,async function(req,res){
    console.log(req.body);
    res.send("correct secret");
});

insertUser = function(email, password, username) {
    return new Promise(function(resolve, reject){
        const sql = 'insert into user (id,password,username) values (?,?,?)';
        const params = [email,password,username];
        db.con.query(sql,params,function(err,rows){
            if(err){
                reject(new Error("insert error"));
            }
            else{
                resolve(rows);
            }
        })
    })
}
searchID = function(email, username) {
    return new Promise(function(resolve, reject){
        const sql = 'select id, username from user where id=? or username=?';
        const params = [email,username];
        db.con.query(sql,params,function(err,rows){
            if(rows===undefined)
            {
                reject(new Error("error row is undefined"));
            } else{
                resolve();
            }
        })
    })
}

loginID = function(email, password) {
    return new Promise(function(resolve, reject){
        const sql = 'select username from user where id=? and password=?';
        const params = [email, password];
        db.con.query(sql, params, function(err,rows,results){
            if(rows.length===0){
                reject(new Error("id or password error"));
            }
            else {
                resolve(rows);
            }
        })
    })
}

module.exports = router;
