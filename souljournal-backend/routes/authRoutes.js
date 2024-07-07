const express = require('express');
const User = require('../models/User'); 
const bcrypt = require('bcrypt');

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    res.status(200).send({ message: 'User logged in successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;