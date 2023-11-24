require('dotenv').config()
const express = require ('express');
const fileRoute = require('./routes/fileRoute');
const usersRoute = require('./routes/usersRoute');

/*дб*/
//const Sequelize = require('sequelize');
//const db = require('./dbrep');

const router = express.Router();


const PORT = process.env.PORT || 5000;
const app = express();


app.use('/info', fileRoute); //
app.use('/latency', usersRoute);
/*app.use('/auth', usersRoute);
app.use('/file', usersRoute);
app.use('/file', usersRoute);*/
// Home page route.




app.all('*', (req, res, next) => {
    next(new AppError(`Страница ${req.originalUrl} не существует`, 404));
});
module.exports = app;

/*
await asd();
async function asd() {
    const res = await db.users.findAll({
        where: {
            id : 'anywaylissa@gmail.com'
        }
    });
    console.log(res)
}
*/

//app.listen(PORT, () => console.log(`server started on port ${PORT}`))