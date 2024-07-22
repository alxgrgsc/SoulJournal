//import 
const mongoose = require('mongoose');

//schema for journal entry
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
  timestamps: true, 
  collection: 'journal_entries' 
});



//export model 
module.exports = mongoose.model('JournalEntry', journalEntrySchema);