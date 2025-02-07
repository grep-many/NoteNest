const Note = require('../models/note.model');

const getNotes = async (req, res) => {
    const { search } = req.query; // Extract the search query from the request

    try {
        const query = { user: req.user.id }; // Base query to fetch notes for the logged-in user

        // If there's a search query, add a regular expression to search fields
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } }, // Case-insensitive search in title
                { content: { $regex: search, $options: 'i' } }, // Case-insensitive search in content
                { tags: { $regex: search, $options: 'i' } }, // Case-insensitive search in tag
                {
                    tasks: {
                        $elemMatch: {
                            $or: [
                                { title: { $regex: search, $options: 'i' } }, // Search in task title
                            ]
                        }
                    }
                }
            ];
        }

        // Fetch notes based on the query and sort them
        const notes = await Note.find(query).sort({ isPinned: -1, createdAt: -1 });

        // Send the notes as a response
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
};

const addNotes = async (req, res) => {

    // Destructure note data from the request body
    const { title, content, tasks, tags } = req.body;

    try {
        // Create a new note instance
        const note = new Note({
            title,
            content,
            tasks: tasks || [],
            tags: tags || [],  // tagsis optional, so it can be null or undefined
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

const updateNotes = async (req, res) => {
    const { id } = req.params;
    const { title, content, tasks, tags } = req.body;

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
        note.content = content || note.content; // Same for content
        note.tasks = tasks || note.tasks; // Same for tasks (optional)
        note.tags = tags || note.tags; // Same for tags(optional)

        // Save the updated note to the database
        await note.save();

        // Send the updated note as a response
        res.status(200).json(note);
    } catch (error) {
        console.error('Error updating note:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
}

const updateNotesIsPinned = async (req, res) => {

    const { id } = req.params;

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

        note.isPinned = !note.isPinned; // Same for tags(optional)

        // Save the updated note to the database
        await note.save();

        // Send the updated note as a response
        res.status(200).json(note);
    } catch (error) {
        console.error('Error updating note:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
}

const deleteNotes = async (req, res) => {
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
        res.status(200).json({ msg: 'Note deleted' });
    } catch (error) {
        console.error('Error deleting note:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
}

module.exports = {
    getNotes,
    addNotes,
    updateNotes,
    updateNotesIsPinned,
    deleteNotes
}