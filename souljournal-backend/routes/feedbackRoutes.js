const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// post feedback
router.post('/feedback', async(req, res) =>{
  try{
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// get all feedback 
router.get('/feedback', async(req, res) =>{
  try{
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch(err){
    res.status(400).json({error : err.message});
  }
});

module.exports = router;