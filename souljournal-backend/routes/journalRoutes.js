//initialize the router and import the JournalEntry model
const express = require('express');
const JournalEntry = require('../models/JournalEntry');
const router = express.Router();

//define async handler
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

//routes for journal entries
router.post('/new_entry', asyncHandler(async (req, res) => {
  const entry = new JournalEntry(req.body);
  await entry.save();
  res.status(201).send(entry);
}));

router.get('/entries', asyncHandler(async (req, res) => {
  // Check if an email query parameter is provided
  if (req.query.email) {
    const entriesByEmail = await JournalEntry.find({ email: req.query.email });
    return res.status(200).send(entriesByEmail);
  }
  // If no email query, return all entries
  const entries = await JournalEntry.find({});
  res.status(200).send(entries);
}));

router.route('/entries/:id')
  .get(asyncHandler(async (req, res) => {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).send({ error: 'Journal entry not found' });
    }
    res.status(200).send(entry);
  }))
  .put(asyncHandler(async (req, res) => {
    const entry = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!entry) {
      return res.status(404).send({ error: 'Journal entry not found' });
    }
    res.status(200).send(entry);
  }))
  .delete(asyncHandler(async (req, res) => {
    try {
      const entry = await JournalEntry.findByIdAndDelete(req.params.id);
      if (!entry) {
        return res.status(404).send({ error: 'Journal entry not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }));

//export router 
module.exports = router;