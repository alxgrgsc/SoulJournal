const express = require('express');
const JournalEntry = require('../models/JournalEntry'); // Adjust the path as necessary

const router = express.Router();

// Middleware for error handling in async routes
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/journal_entries', asyncHandler(async (req, res) => {
  const entry = new JournalEntry(req.body);
  await entry.save();
  res.status(201).send(entry);
}));

router.get('/journal_entries', asyncHandler(async (req, res) => {
  const entries = await JournalEntry.find({});
  res.status(200).send(entries);
}));

router.route('/journal_entries/:id')
  .get(asyncHandler(async (req, res) => {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).send({ error: 'Journal entry not found' });
    }
    res.status(200).send(entry);
  }))
  .patch(asyncHandler(async (req, res) => {
    const entry = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!entry) {
      return res.status(404).send({ error: 'Journal entry not found' });
    }
    res.status(200).send(entry);
  }))
  .delete(asyncHandler(async (req, res) => {
    const entry = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).send({ error: 'Journal entry not found' });
    }
    res.status(204).send();
  }));

module.exports = router;