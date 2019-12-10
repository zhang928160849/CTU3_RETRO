const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required:true,
    trim:true,
    index:{ unique: true},
    minlength:3,
  },
  password: {
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    index:{ unique: true},
    minlength: 8,
  },
  name: {
    type:String,
    required:true,
    trim:true,
    lowercase:true,
  },
  team: {
    type: String,
    required:true,
    trim:true,
    minlength:3,
  },
},{
  timestamp:true,
});

module.exports = mongoose.model('User',UserSchema);