const asyncHandler = require("express-async-handler");
//db
const db = require('../dbrep');

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

exports.signUp = asyncHandler(async (req, res, next) => {
    console.log('signUp')
    try {
        const { id, password } = req.body;


        const finededUser = await db.users.findOne({
            where: {
                id: id
            }
        });
        if (finededUser?.dataValues) {
            res = {
                msg: `Пользователь с таким ${id} уже существует`
            }
        } else {

            const hashedPassword = bcrypt.hashSync(password, 10);
            console.log('hashedPassword', hashedPassword);

            const newUser = await db.users.create({id, password: hashedPassword});

            const accessToken = createToken(newUser.dataValues.id);
            const refreshToken = createRefreshToken(newUser.dataValues.id);
            console.log(process.env.SECRETKEY)
            console.log(accessToken)

            jwt.verify(accessToken, process.env.SECRETKEY, (err, user) => {
                console.log('err', err)
                console.log('user', user)
                if (err) return res.status(403).json({ error: 'Токен недействителен' });
                req.user = user;
            });

            console.log('accessToken', accessToken)
            console.log('refreshToken', refreshToken)

            res = {accessToken: accessToken, refreshToken: refreshToken};
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    return res;
});
