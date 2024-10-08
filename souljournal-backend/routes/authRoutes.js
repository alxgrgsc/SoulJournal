//imports, and initialization
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();
require('dotenv').config(); 

//user registration route 
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    //validate input
    if (!email || !password || !firstname || !lastname) {
      return res.status(400).send({ error: 'Email, password, firstname, and lastname are required' });
    }

    //check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'User already exists' });
    }

    //create new user
    const user = new User({ email, password, firstname, lastname });
    await user.save();

    //send response
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred during registration' });
  }
});

//user login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate route input
    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    //compare passwords 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    //generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //send response
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ error: 'An error occurred during login' });
  }
});

//export module
module.exports = router;