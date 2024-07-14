const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Adjust the path as necessary

// Submit Feedback
router.post('/submit-feedback', async (req, res) => {
  const { name, feedback, email } = req.body;
  if (!name || !feedback || !email) {
    return res.status(400).json({ error: 'Name, feedback, and email are required' });
  }

  try {
    const newFeedback = new Feedback({ name, feedback, email });
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