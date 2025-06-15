const express = require('express');
const searchController = require('../controllers/search-controller');
const router = express.Router();

router.get('/search/name', auth, searchController.searchByName);
router.get('/search/phone', auth, searchController.searchByPhone);

module.exports = router;
