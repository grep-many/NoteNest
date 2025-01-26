const express = require('express');
const router = express.Router();
const {serverCheck} = require('../controllers/serverControllers');

router.get('/',serverCheck);

module.exports = router;