const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

router.route('/').post(userController.doEvent);

module.exports = router;