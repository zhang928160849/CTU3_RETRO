var express = require('express');
var router = express.Router();
var userModel = require('../server/models/UserModel');
var memberscontrol = require('../controller/member')
const passport = require('passport');


/* GET home page. */
router.get('/logon', function(req, res, next) {
  // req.session.visits = req.session.visits?req.session.visits+1:1;
  res.render('logon',{logged:true});
});

router.get('/main', function(req, res, next) {
  res.render('main');
});

router.get('/logonsubmit', memberscontrol.member_list);
// router.post('/logonsubmit', memberscontrol.member_list);
router.post('/logonsubmit', passport.authenticate('local',{
  successRedirect:'logonsubmit',
  failureRedirect:'/logon'
}));
router.post('/commentsubmit',memberscontrol.comment_submit);
router.get('/commentdetail',memberscontrol.comment_detail);


module.exports = router;
