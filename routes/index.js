var express = require('express');
var router = express.Router();
/* GET users listing. */
const db = require('../db');

router.get('/', function(req, res, next) {
  res.send("main index");
});

module.exports = router;
