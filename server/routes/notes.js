const express = require('express');
const { body, validationResult } = require('express-validator');
const authenticateUser = require('../middleware/authenticateUser'); // Ensure correct import path
const Note = require('../models/Note');
const router = express.Router();

// ==============================
// Route 1: Get all the notes (GET "/api/auth/fetchNotes") Login required
// ============================== 
router.get('/fetchNotes', authenticateUser, async (req, res) => {
  try {
    // Fetch all notes of the logged-in user from the database
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });

    // Send the notes as a response
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
  }
});

// ==============================
// Route 2: Add new note (POST "/api/auth/addNote") Login required
// ==============================
router.post(
  '/addNote',
  [
    // Validate title (min length: 2 characters)
    body('title').isLength({ min: 2 }).withMessage('Title should be at least 2 characters long'),

    // Validate description (min length: 5 characters)
    body('description').isLength({ min: 5 }).withMessage('Description should be at least 5 characters long'),

    body('tag').optional()
  ],
  authenticateUser,
  async (req, res) => {
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // 400 Bad Request (Validation failed)
    }

    // Destructure note data from the request body
    const { title, description, tag } = req.body;

    try {
      // Create a new note instance
      const note = new Note({
        title,
        description,
        tag,  // Tag is optional, so it can be null or undefined
        user: req.user.id, // Associate the note with the logged-in user
      });

      // Save the note to the database
      await note.save();

      // Send the new note as a response
      res.status(201).json(note); // 201 Created (Note added successfully)
    } catch (error) {
      console.error('Error adding note:', error.message);
      res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
  }
);

// ==============================
// Route 3: Update existing note (PUT "/api/auth/updateNote/:id") Login required
// ==============================
router.put(
  '/updateNote/:id',
  [
    // Validate title (min length: 2 characters)
    body('title').isLength({ min: 2 }).withMessage('Title should be at least 2 characters long'),

    // Validate description (min length: 5 characters)
    body('description').isLength({ min: 5 }).withMessage('Description should be at least 5 characters long'),

    // Optional tag validation (if you want to enforce a format)
    body('tag').optional(),
  ],
  authenticateUser,
  async (req, res) => {
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // 400 Bad Request (Validation failed)
    }

    const { id } = req.params;
    const { title, description, tag } = req.body;

    try {
      // Find the note by its ID
      const note = await Note.findById(id);
      if (!note) {
        return res.status(404).json({ msg: 'Note not found' }); // 404 Not Found
      }

      // Check if the logged-in user is the owner of the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Unauthorized' }); // 401 Unauthorized
      }

      // Update the note with the new data if provided
      note.title = title || note.title; // If title is provided, update it; otherwise, keep the old one
      note.description = description || note.description; // Same for description
      note.tag = tag || note.tag; // Same for tag (optional)

      // Save the updated note to the database
      await note.save();

      // Send the updated note as a response
      res.json(note);
    } catch (error) {
      console.error('Error updating note:', error.message);
      res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
  }
);

// ==============================
// Route 4: Delete existing note (DELETE "/api/auth/deleteNote/:id") Login required
// ==============================
router.delete('/deleteNote/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the note by its ID and check if it belongs to the logged-in user
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' }); // 404 Not Found
    }

    // Check if the logged-in user is the owner of the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' }); // 401 Unauthorized
    }

    // Delete the note from the database
    await Note.findByIdAndDelete(id);

    // Send a success message after deleting the note
    res.json({ msg: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
  }
});


module.exports = router;
