var commentModel = require('../server/models/Comment');

exports.member_list =  function(req,res,next){
  commentModel.find()
  .sort([['star']])
  .exec(function (err, list_members) {
    console.log(err);
    if (err) { return next(err); }
    //Successful, so render
    // return list_members;
    console.log('eee',list_members);
    res.render('main', { members:list_members });
  });
}