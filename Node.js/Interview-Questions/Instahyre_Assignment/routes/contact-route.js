const express = require('express');
const contactController = require('../controllers/contact-controller');
const router = express.Router();

router.post('/contacts', auth, contactController.addContacts);

module.exports = router;
