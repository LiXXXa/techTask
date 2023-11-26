const asyncHandler = require('express-async-handler');
const registrationService = require('../services/registrationService.js');
const db = require('../dbrep');


exports.signUp = asyncHandler(async (req, res, next) => {
    const result = await registrationService.signUp(req);
    res.status(200).json(result);
});
