const express = require('express');
const authRoutes = require('./auth-route');
const contactRoutes = require('./contact-route');
const spamRoutes = require('./spam-route');
const searchRoutes = require('./search-route');
const auth = require('../middelware/auth-middleware');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contacts', auth, contactRoutes);
router.use('/spam', auth, spamRoutes);
router.use('/search', auth, searchRoutes);

module.exports = router;
