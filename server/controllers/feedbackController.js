const Feedback = require('../models/feedback.model')

const getFeedback = async (req, res) => {

    try {

        const feedback = await Feedback.find({ rating: { $gt: 3 } });

        // Send the tasks as a response
        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error fetching feedback:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
};


const addFeedback = async (req, res) => {

    // Destructure task data from the request body
    const { name, review, rating } = req.body;

    try {
        // Create a new feedback instance
        const feedback = new Feedback({
            name: name,
            review: review,
            rating: rating,
            user: req.user.id,
        });

        // Save the task to the database
        await feedback.save();

        // Send the new task as a response
        res.status(201).json(feedback); // 201 Created (Task added successfully)
    } catch (error) {
        console.error('Error adding feedback:', error.message);
        res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
}

module.exports = {
    getFeedback,
    addFeedback,
}