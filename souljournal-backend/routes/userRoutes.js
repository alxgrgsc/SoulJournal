const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary

// Route to get user details by email
router.get('/details', async (req, res) => {
  try {
    const email = req.query.email;
    console.log('Received request for email:', email); // Debug log

    const user = await User.findOne({ email }); // Ensure this is awaited
    console.log('User found:', user); // Debug log

    if (!user) {
      console.log('No user found for email:', email); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the field names match what you expect on the client side
    res.json({ firstName: user.firstname, lastName: user.lastname });
  } catch (error) {
    console.error('Error fetching user details:', error); // Debug log
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;