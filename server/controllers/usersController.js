const asyncHandler = require('express-async-handler');
const usersService = require('../services/usersService.js');

exports.getUserInfo = asyncHandler(async (req, res, next) => {
    const result = await usersService.getUserInfo(req);
    res.status(200).json(result);
});

