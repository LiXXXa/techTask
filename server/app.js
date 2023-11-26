require('dotenv').config()
const express = require ('express');
const bodyparser = require ('body-parser');
const AppError = require('./apperror.js');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const upload = multer({ dest: 'uploads/' });

const fileRoute = require('./routes/fileRoute');
const usersRoute = require('./routes/usersRoute');
const authenticationRoute = require('./routes/authenticationRoute');
const registrationRoute = require('./routes/registrationRoute');
const latencyRoute = require('./routes/latencyRoute');
const bcrypt = require("bcrypt");


const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyparser.json());
const blacklist = new Set();


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Токен отсутствует или имеет неверный формат' });
    }
    const accessToken = token.replace('Bearer ', '');
    if (blacklist.has(accessToken)) {
        return res.status(401).json({ error: 'Доступ запрещен. Токен в черном списке' });
    }

    jwt.verify(accessToken, process.env.SECRETKEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Токен недействителен' });
        req.user = user;
        next();
    });
};

app.use('/signin', authenticationRoute);
app.use('/signup', registrationRoute);

app.use('/info', authenticateToken, usersRoute);
app.use('/file', authenticateToken, fileRoute);
app.use('/latency', authenticateToken,  latencyRoute);
app.use('/logout', (req, res) => {
    const token = req.header('Authorization');
    const accessToken = token.replace('Bearer ', '');
    const refreshToken = req.body.refreshToken;

    blacklist.add(refreshToken);
    blacklist.add(accessToken);
    res.json({ success: 'Вы успешно вышли из системы' });
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    next();
});
app.all('*', (req, res, next) => {
    next(new AppError(`Страница ${req.originalUrl} не существует`, 404));
});
module.exports = app;

