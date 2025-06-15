const express = require('express');
const spamController = require('../controllers/spam-controller');
const router = express.Router();

router.post('/spam', auth, spamController.markSpam);

module.exports = router;
