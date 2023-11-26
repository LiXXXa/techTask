const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.post('/', registrationController.signUp);


module.exports = router;