const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config')

const JWT_SECRET = jwtSecret; // Replace with a secure value

// JWT middleware to authenticate the user based on the token
const authenticateUser = async (req, res, next) => {
    const token = await req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'Please authenticate with a valid token, authorization denied' }); // 401 Unauthorized (No token provided)
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Store the user id from the token in the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ msg: 'Token is not valid' }); // 401 Unauthorized (Token invalid)
    }
};


module.exports = authenticateUser