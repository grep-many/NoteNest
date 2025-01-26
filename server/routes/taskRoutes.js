const router = require('express').Router();
const { authenticateToken } = require('../middleware/AuthMiddleware');
const {
    getTask,
    addTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController.js');

router.get('/fetch',authenticateToken,getTask);
router.post('/add',authenticateToken,addTask);
router.put('/edit/:id',authenticateToken,updateTask);
router.delete('/remove/:id',authenticateToken,deleteTask);

module.exports = router;
