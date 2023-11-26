
const express = require('express');
const router = express.Router();
const latencyController = require('../controllers/latencyController');

router.get('/', latencyController.getLatency);

module.exports = router;