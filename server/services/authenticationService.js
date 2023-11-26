const asyncHandler = require('express-async-handler');
//db
const Sequelize = require('sequelize');
const db = require('../dbrep');

const randtoken = require('rand-token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const TOKEN_EXPIRATION ='10m'
const REFRESH_TOKEN_EXPIRATION ='7d'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: TOKEN_EXPIRATION });
};
const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};


exports.signIn = asyncHandler(async (req, res, next) => {
    const {body} = req;
    console.log('signIn service')


    try {
        const { id, password } = req.body;

        const user = await db.users.findOne({ where: { id } });

        if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
            return res = { error: 'Неверные учетные данные' };
        }

        const accessToken = createToken(user.dataValues.id);
        const refreshToken = createRefreshToken(user.dataValues.id);

        res = { accessToken: accessToken, refreshToken: refreshToken };
    } catch (error) {
        console.error(error);
        res={ error: 'Internal Server Error' };
    }
    return res;
});

exports.refreshSignIn = asyncHandler(async (req, res, next) => {

    try {
        const { refreshToken } = req.body;


        jwt.verify(refreshToken, process.env.SECRETKEY, (err, user) => {
            if (err) return res.status(403).json({ error: 'Refresh токен недействителен' });

            const accessToken = createToken(user.id);

            res  ={ accessToken:accessToken };
        });
    } catch (error) {
        console.error(error);
        res = { error: 'Internal Server Error' };
    }
return res;
});

