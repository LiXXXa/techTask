
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
