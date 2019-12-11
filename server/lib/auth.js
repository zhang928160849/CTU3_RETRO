const passport = require('passport');
const localStrategy = require('passport-local').Strategy; 

var userModel = require('../models/UserModel');

passport.use(new localStrategy(
  {usernameField:'username'},async (username,password,done)=>{
    try {
      const user = await userModel.findOne({username:username}).exec();
      if(!user){
        return done(null,false,{message:'invalid user or password'});
      }

      if(user.password == password){
        return done(null,user);
      }else{
        return done(null,false,{message:'invalid user or password'});
      }

    } catch (error) {
      return done(error);
    }
  }
))

passport.serializeUser((user,done)=>{
  return done(null,user._id);
})

passport.deserializeUser(async (id,done)=>{
  try {
    const user = await userModel.findById(id).exec();
    return done(null,user);
  } catch (error) {
    return done(error);
  }
})

module.exports = {
  initialize: passport.initialize(),
  session: passport.session(),
  setUser: (req,res,next)=>{
    res.locals.user = req.user;
    return next();
  },
};