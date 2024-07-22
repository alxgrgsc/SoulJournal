//import modules 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//schema for user 
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
});

//hash password before saving 
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 8);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

//export model
module.exports = mongoose.model('User', userSchema);