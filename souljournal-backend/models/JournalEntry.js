const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  email: { type: String, required: true },
  mood: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  } 
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  collection: 'journal_entries' // Explicitly specify the collection name
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;