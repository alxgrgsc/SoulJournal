//initialize express router and import the Feedback model
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Adjust the path as necessary

//submit feedback route 
router.post('/submit-feedback', async (req, res) => {
  const { firstName, lastName, feedback, email, stars } = req.body;
  console.log('Received feedback data:', req.body); // Log the feedback data
  
  //validate input 
  if (!firstName || !lastName || !feedback || !email || !stars) {
    //debug log 
    console.log('Missing required fields');
    return res.status(400).json({ error: 'First name, last name, feedback, email, and stars are required' });
  }
  //save feedback
  try {
    const newFeedback = new Feedback({ firstName, lastName, feedback, email, stars });
    await newFeedback.save();
    console.log('Feedback saved:', newFeedback); // Debug log
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (error) {
    console.error('Error saving feedback:', error); // Debug log
    res.status(500).json({ error: error.message });
  }
});

//get feedback route
router.get('/get-feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    console.log('Fetched feedbacks:', feedbacks); // Debug log
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error); // Debug log
    res.status(500).json({ error: error.message });
  }
});

//export router
module.exports = router;