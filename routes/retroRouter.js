var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('logon', { logged: false });
});

router.get('/logon',function(req,res,next){
  res.render('logon');
});



module.exports = router;
