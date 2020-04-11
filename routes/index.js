var express = require('express');
var router = express.Router();
var userModel = require('../server/models/UserModel');
var memberscontrol = require('../controller/member')
const passport = require('passport');

function redirectIfLoggedIn(req,res,next){
  if(req.user) return res.redirect('/logonsubmit')
  return next();
}

/* GET home page. */
router.get('/logon', redirectIfLoggedIn,function(req, res, next) {
  // req.session.visits = req.session.visits?req.session.visits+1:1;
  res.render('logon',{logged:true});
});

router.get('/main', function(req, res, next) {
  res.render('main');
});

router.get('/findIsVisible',memberscontrol.findIsVisible)

router.get('/logonsubmit',(req,res,next)=>{
  if(req.user){
    return next();
  }
  return res.status(401).end();
}, memberscontrol.member_list);
// router.post('/logonsubmit', memberscontrol.member_list);
router.post('/logonsubmit', passport.authenticate('local',{
  successRedirect:'logonsubmit',
  failureRedirect:'/logon'
}));
router.post('/commentsubmit',memberscontrol.comment_submit);
router.get('/commentdetail',memberscontrol.comment_detail);

router.get('/commentswitch',memberscontrol.comment_switch);
router.get('/analysis',memberscontrol.analysis_items);


module.exports = router;
