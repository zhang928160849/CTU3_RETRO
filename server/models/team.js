const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
  team: {
    type:String,
    required:true,
    trim:true,
    lowercase:true,
  },
  showComment: {
    type: String,
    required:true,
    trim:true,
    // minlength:3,
  },
},{
  timestamp:true,
});

module.exports = mongoose.model('Team',TeamSchema);