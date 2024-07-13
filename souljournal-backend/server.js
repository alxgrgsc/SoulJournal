const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const journalRoutes = require('./routes/journalRoutes'); // Ensure this path is correct
const feedbackRoutes = require('./routes/feedbackRoutes'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/auth', authRoutes); // Use base path for auth routes
app.use('/journals', journalRoutes); // Use base path for journal routes
app.use('/feedback', feedbackRoutes); // Use base path for feedback routes

app.get('/', (req, res) => {
  res.send('Hello SoulJournal!');
});

const dbURI = 'mongodb://localhost:27017/SoulJournal';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});