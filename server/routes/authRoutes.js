const router = require('express').Router();
const {
    validateRegister,
    validateLogin,
    registerUser,
    loginUser,
} = require('../controllers/userControllers');

router.post('/register',validateRegister,registerUser);
router.post('/login',validateLogin,loginUser);

module.exports = router;