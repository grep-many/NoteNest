const Task = require('../models/task.model');

const getTask = async (req, res) => {
    const { search } = req.query; // Extract the search query from the request

    try {
        const query = { user: req.user.id }; // Base query to fetch tasks for the logged-in user

        // If there's a search query, add a regular expression to search fields
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } }, // Case-insensitive search in title
                { content: { $regex: search, $options: 'i' } }, // Case-insensitive search in title
                { tags: { $regex: search, $options: 'i' } }, // Case-insensitive search in tags
            ];
        }

        // Fetch tasks based on the query and sort them
        const tasks = await Task.find(query).sort({ isPinned: -1,createdAt: -1,status: 1 });

        // Send the tasks as a response
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
};

const addTask = async (req, res) => {

    // Destructure task data from the request body
    const { title, content, tags } = req.body;

    try {
        // Create a new task instance
        const task = new Task({
            title: title,
            content: content,
            tags: tags || [],  // tags is optional, so it can be null or undefined
            user: req.user.id, // Associate the task with the logged-in user
        });

        // Save the task to the database
        await task.save();

        // Send the new task as a response
        res.status(201).json(task); // 201 Created (Task added successfully)
    } catch (error) {
        console.error('Error adding task:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, content, tags, isPinned, status } = req.body;

    try {
        // Find the task by its ID
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' }); // 404 Not Found
        }


        // Check if the logged-in user is the owner of the task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' }); // 401 Unauthorized
        }

        // Update the task with the new data if provided
        if (title !== undefined) task.title = title;
        if (content !== undefined) task.content = content;
        if (tags !== undefined) task.tags = tags;
        if (isPinned !== undefined) task.isPinned = isPinned; // Update if provided
        if (status !== undefined) task.status = status; // Update if provided
        task.createdAt = Date.now()

        // Save the updated task to the database
        await task.save();

        // Send the updated task as a response
        res.status(200).json(task);
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the task by its ID and check if it belongs to the logged-in user
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' }); // 404 Not Found
        }

        // Check if the logged-in user is the owner of the task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' }); // 401 Unauthorized
        }

        // Delete the task from the database
        await Task.findByIdAndDelete(id);

        // Send a success message after deleting the task
        res.status(200).json({ msg: 'Task deleted' });
    } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
}

module.exports = {
    getTask,
    addTask,
    updateTask,
    deleteTask
}