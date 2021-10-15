var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');
const { validateRegister, isLoggedIn, validateUsername } = require('../middleware/users');
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
        res.status(401).send({
            message: 'already have person',
        });
    })
});

router.post('/login', async function(req,res){
    loginID(req.body.email, req.body.password)
    .then(function(results){ 
        const username=results[0].username;
        const token = jwt.sign({
            username: username,
        },'SECRETKEY',{expiresIn:"5m"});
        return res.status(201).send({
            message: "login success",
            username,
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
    res.status(200).send({
        message:"correct secret",
    })
});

router.post('/changename',async function(req, res){
    console.log(req.body);
    changeUsername(req.body.username, req.body.cusername)
    .then(function(results){
        return res.status(201).send({
            message: "change success!",
        });
    })
    .catch(function(err){
        console.log(err);
        res.status(401).send({
            message: "another username",
        });
    })
});

router.post('/checkname',validateUsername ,async function(req, res){
    console.log(req.body);
    searchUsername(req.body.username)
    .then(function(rows){
        console.log(rows);
        return res.status(201).send({
            message: "can change username",
        });
    })
    .catch(function(err){
        res.status(401).send({
            message: "this already exist name",
        });
    })
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
        });
    })
}
searchID = function(email, username) {
    return new Promise(function(resolve, reject){
        const sql = 'select id, username from user where id=? or username=?';
        const params = [email,username];
        db.con.query(sql,params,function(err,rows){
            if(rows.length===0)
            {
                resolve(rows);
                 
            } else{
                reject(new Error("already have person"));
            }
        });
    })
}

searchUsername = function(username){
    return new Promise(function(resolve, reject){
        const sql = 'select username from user where username=?';
        const params = [username];
        db.con.query(sql, params, function(err,rows,results){
            if(rows.length===0){
                console.log("1");
                resolve();
            }
            else{
                console.log("2");
                 
                reject(new Error("error row is undefined"));
            }
        });
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

changeUsername = function(username,cusername) {
    return new Promise(function(resolve, reject){
        const sql = 'update user set username=? where username=?';
        const params = [cusername, username];
        db.con.query(sql, params, function(err,rows,results){
            if(err){
                reject(new Error("change error"));
            }
            else{
                resolve(rows);
            }
        })
    })
}
module.exports = router;
