const asyncHandler = require('express-async-handler');
const db = require('../dbrep');


exports.getUserInfo = asyncHandler(async (req, res, next) => {
    console.log('getUserInfo');
    const {id} = req.body;
    const user = db.users.findOne({
        where: {id: id}
    });
    res  = user.dataValues.id || {msg: 'пользователь не найден'}
});

