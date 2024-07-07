const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  collection: 'journal_entries' // Explicitly specify the collection name
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;