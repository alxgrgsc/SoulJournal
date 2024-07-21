const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  firstName: {
    type: String,
   
  },
  lastName: {
    type: String,

  },
  feedback: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);