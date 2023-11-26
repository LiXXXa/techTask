const asyncHandler = require('express-async-handler');
const authService = require('../services/authenticationService.js');


exports.signIn = asyncHandler(async (req, res, next) => {

    const result = await authService.signIn(req);
    console.log( result)
    res.status(200).json({result});
});

exports.refreshSignIn = asyncHandler(async (req, res, next) => {
    const result = await authService.refreshSignIn(req);
    console.log('result', result)
    res.json(result);
});