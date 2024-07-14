require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const journalRoutes = require('./routes/journalRoutes'); // Ensure this path is correct
const feedbackRoutes = require('./routes/feedbackRoutes'); // Ensure this path is correct

const app = express();
const PORT = 3300;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/auth', authRoutes); // Use base path for auth routes
app.use('/journals', journalRoutes); // Use base path for journal routes
app.use('/feedback', feedbackRoutes); // Use base path for feedback routes

app.get('/', (req, res) => {
  res.send('Hello SoulJournal!');
});

// Load MongoDB URI from environment variables
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/SoulJournal';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // Verify the JWT_SECRET is loaded
});