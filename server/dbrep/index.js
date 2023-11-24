
const Sequelize = require('sequelize');

const sequelize = new Sequelize('techtask', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
})
const Users = require('./users')(sequelize);
const Files = require('./files')(sequelize);
module.exports = {
    sequelize: sequelize,
    users: Users,
    files: Files
}

/*
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'techtask'
});
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();*/