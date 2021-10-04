var express = require('express');
var router = express.Router();
const db = require('../db');

router.post('/', async  function(req, res) {
  console.log(req.body.email, req.body.password, req.body.username);
  
  const returnData = await insertUser(req.body.email,req.body.password,req.body.username);
  console.log(returnData);
  const sucess = {}
  res.send(true);
  
});

const insertUser = async (email, password, username) => {
  const sql = 'insert into user (id,password,username) values (?,?,?)';
  const params = [email,password,username];
  db.con.query(sql, params); 
};

module.exports = router;
