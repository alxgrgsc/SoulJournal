//initialization and imports 
const express = require('express');
const router = express.Router();
const User = require('../models/User');

//user details route 
router.get('/details', async (req, res) => {
  try {
    const email = req.query.email;
    console.log('Received request for email:', email); 

    const user = await User.findOne({ email });
    console.log('User found:', user); 

    if (!user) {
      console.log('No user found for email:', email); 
      return res.status(404).json({ message: 'User not found' });
    }

    //send user details
    res.json({ firstName: user.firstname, lastName: user.lastname });
  } catch (error) {
    console.error('Error fetching user details:', error); 
    res.status(500).json({ message: 'Server error', error });
  }
});

//export router
module.exports = router;