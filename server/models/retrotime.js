const mongoose = require('mongoose');

const RetroTimeSchema = mongoose.Schema({
  team: {
    type: String,
    required:true,
    trim:true,
    minlength:3,
  },
  type: {
    type: String,
    // required:true,
    trim:true,
    // minlength:3,
  },
  url: {
    type: String,
    // required:true,
    trim:true,
    // minlength:3,
  },
  release:{
    type: String,
    trim: true,
    required:true
  }
},{
  timestamp:true,
});

module.exports = mongoose.model('RetroTime',RetroTimeSchema);