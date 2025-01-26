const router = require('express').Router();
const { authenticateToken } = require('../middleware/AuthMiddleware');
const {
    getFeedback,
    addFeedback,
} = require('../controllers/feedbackController.js');

router.get('/fetch',getFeedback);
router.post('/add',authenticateToken,addFeedback);

module.exports = router;
