var userModel = require('../server/models/UserModel');
var memberModel = require('../server/models/Member');
var async = require('async');
var commentModel = require('../server/models/Comment');
var retroTime = require('../server/models/retrotime')

function mainpage (req,res,next){
  var list_members = [];
  var list_comments = [];
  var list_retroTime = [];

  const users = userModel.find().sort([['team']]);
  const comment = commentModel.find();
  const retrotime = retroTime.find();

  var commentpromise = comment.exec();
  var userpromise = users.exec();
  var retrotimepromise = retrotime.exec();

  Promise.all([userpromise,commentpromise,retrotimepromise]).then(values=>{
    this.list_members = values[0];
    this.list_comments = values[1];
    this.list_retroTime = values[2];

    var commentsimp = [];
    var commentsbad = [];
    var commentsgood = [];

    for(var commentins of values[1]){
      console.log(commentins);
      commentins.commentD = commentins.commentD.slice(0,25);
      switch (commentins.category) {
        case 'good':
          commentsgood.push(commentins);
          break;
        case 'mid':
          commentsimp.push(commentins);          
          break;
        case 'bad':
          commentsbad.push(commentins);
          break;
      }
    }

    console.log('ssss'+commentsgood);

    res.render('main', { 
      members:values[0],
      comments:values[1],
      retrotimes:values[2],
      logged:false,
      commentsimp:commentsimp,
      commentsgood :commentsgood,
      commentsbad:commentsbad
    });
  });
}

exports.member_list = mainpage;

// function(req,res,next){
  // await userpromise.then(value=>{console.log('sss'+value)})
  // await users.exec(function (err, list_members) {
  //   console.log(err);
  //   if (err) { return next(err); }
  //   //Successful, so render
  //   // return list_members;
  //   this.list_members = list_members;
  // }).then();

  // userModel.find()
  // .sort([['team']])
  // .exec(function (err, list_members) {
  //   console.log(err);
  //   if (err) { return next(err); }
  //   //Successful, so render
  //   // return list_members;
  //   this.list_members = list_members;
  // });
// }


exports.comment_submit = function(req,res,next){
  var  date = new Date();
  console.log('www'+res.locals.user);
  const comment = new commentModel({
    retro:'retro1',
    username:res.locals.user.username,
    comment:date.getTime()  ,
    commentD:req.body.message,
    category:req.body.category,
    label:req.body.label,
    star:8
  });

  comment.save(err=>{
    console.log('wo'+err);
  })
  res.redirect(301,'/logonsubmit');
  // mainpage(req,res,next)
}

exports.comment_detail = function(req,res,next){
  
  const comment = commentModel.find({'comment':req.query.comment});
  var commentpromise = comment.exec();
  commentpromise.then(function(resq){
    
    res.send({  
      commentD:resq[0].commentD,
      label:resq[0].label,
      category:resq[0].category
    });
  })

}