const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Adjust the path as necessary

// Submit Feedback
router.post('/submit-feedback', async (req, res) => {
  const { name, feedback, email, stars } = req.body;
  console.log(req.body); // Log the feedback data
  if (!name || !feedback || !email || !stars) {
    return res.status(400).json({ error: 'Name, feedback, email, and stars are required' });
  }

  try {
    const newFeedback = new Feedback({ name, feedback, email, stars });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Feedback
router.get('/get-feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;