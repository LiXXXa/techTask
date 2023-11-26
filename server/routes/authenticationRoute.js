const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

router.post('/', async (req, res, next) => {
    console.log('Authentication route called');
    let result = await authenticationController.signIn(req, res, next);
    console.log('res', await result)
});
router.post('/new_token',  async (req, res, next) => {
    console.log('Authentication route called newToken');
    let result = await authenticationController.refreshSignIn(req, res, next);
    console.log('res', await result)
});

module.exports = router;