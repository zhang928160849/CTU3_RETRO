const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  retro: {
    type: String,
    required:true,
    trim:true,
    minlength:3,
  },
  username: {
    type: String,
    required:true,
    trim:true,
    // index:{ unique: true},
    minlength:3,
  },
  comment: {
    type: Number,
    required:true,
    trim:true,
    minlength:3,
  },
  commentD: {
    type: String,
    maxlength:50,
  },
  category: {
    type: String,
    trim:true,
    enum: ['good', 'bad', 'mid'], 
  },  
  label: {
    type: String,
    trim:true
  },  
  star: {
    type: Number,
  },
},{
  timestamp:true,
});

module.exports = mongoose.model('Comment',UserSchema);