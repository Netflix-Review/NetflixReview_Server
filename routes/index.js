var express = require('express');
var router = express.Router();
/* GET users listing. */
 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.get('/movie',async(req,res) => {
//     const movieList = await handleAsync();
//     console.log(movieList);
//     res.send(movieList); 
// });
module.exports = router;
