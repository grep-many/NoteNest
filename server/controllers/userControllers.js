const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/user.model');
const Note = require('../models/note.model');
const Task = require('../models/task.model');
const { jwtSecret, pepper } = require('../config/envConfig');

const validateRegister = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('name').isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
    body('password').isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters long'),
];

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters long'),
]

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const pepperedPassword = password + pepper;
        const hashedPassword = await bcrypt.hash(pepperedPassword, salt);

        const newUser = new User({
            email: email.toLowerCase(),
            name,
            password: hashedPassword,
        });

        await newUser.save();

        // const payload = { user: { id: newUser._id } };
        const payload = { id: newUser._id };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '30d' });

        res.status(201).json({ token, name, email, msg: 'SignUp Successful' });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ msg: 'Internal Server error' });
    }
}

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const pepperedPassword = password + pepper;
        const isMatch = await bcrypt.compare(pepperedPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // const payload = { user: { id: user._id } };
        const payload = { id: user._id };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '30d' });
        const name = user.name;

        res.status(200).json({ token, name, email, msg: 'Login Successful' });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ msg: 'Internal Server error' });
    }
}

module.exports = {
    validateRegister,
    validateLogin,
    registerUser,
    loginUser,
};