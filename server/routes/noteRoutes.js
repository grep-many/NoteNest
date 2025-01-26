const router = require('express').Router();
const { authenticateToken } = require('../middleware/AuthMiddleware');
const {
    getNotes,
    addNotes,
    updateNotes,
    updateNotesIsPinned,
    deleteNotes,
} = require('../controllers/noteController');

router.get('/fetch',authenticateToken,getNotes);
router.post('/add',authenticateToken,addNotes);
router.put('/edit/:id',authenticateToken,updateNotes);
router.put('/pin/:id',authenticateToken,updateNotesIsPinned);
router.delete('/remove/:id',authenticateToken,deleteNotes);

module.exports = router;
