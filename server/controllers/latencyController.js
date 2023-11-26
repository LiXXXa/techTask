const asyncHandler = require('express-async-handler');
const latencyService = require('../services/latencyService.js');

exports.getLatency = asyncHandler(async (req, res, next) => {
    const result = await latencyService.getLatency();
    res.status(200).json(result);
});