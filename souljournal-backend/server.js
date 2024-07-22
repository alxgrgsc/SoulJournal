//imports 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const journalRoutes = require('./routes/journalRoutes'); // Ensure this path is correct
const feedbackRoutes = require('./routes/feedbackRoutes'); // Ensure this path is correct
const userRoutes = require('./routes/userRoutes');

//initialize express app and set port
const app = express();
const PORT = process.env.PORT || 3300;

//middleware
app.use(cors()); 
app.use(express.json());

//routes
app.use('/auth', authRoutes);
app.use('/journal', journalRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello SoulJournal!');
});

//MongoDB local connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/SoulJournal';

//connect to MongoDB
mongoose.connect(dbURI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

//start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});