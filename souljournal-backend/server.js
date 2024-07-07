const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Adjust the path as necessary
const journalRoutes = require('./routes/journalRoutes'); // Require the journalRoutes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authRoutes);
app.use(journalRoutes); // Use journalRoutes with a base path

app.get('/', (req, res) => {
  res.send('Hello SoulJournal!');
});

const dbURI = 'mongodb://localhost:27017/SoulJournal';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});