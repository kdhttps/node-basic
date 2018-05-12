const mongoose = require('mongoose');

// define the schema for our user
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// create the model for badgeCategory and expose it to our app
module.exports = mongoose.model('User', userSchema);
