const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  team: {
    type: String,
    required:true,
    trim:true,
    minlength:3,
  },
  username: {
    type: String,
    required:true,
    trim:true,
    index:{ unique: true},
    minlength:3,
  },
},{
  timestamp:true,
});

module.exports = mongoose.model('Member',UserSchema);