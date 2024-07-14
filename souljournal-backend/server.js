const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const journalRoutes = require('./routes/journalRoutes'); // Ensure this path is correct
const feedbackRoutes = require('./routes/feedbackRoutes'); // Ensure this path is correct
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3300;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Routes
app.use('/auth', authRoutes); // Use base path for auth routes
app.use('/journals', journalRoutes); // Use base path for journal routes
app.use('/feedback', feedbackRoutes); // Use base path for feedback routes
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello SoulJournal!');
});

// Load MongoDB URI from environment variables
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/SoulJournal';

// Connect to MongoDB
mongoose.connect(dbURI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});