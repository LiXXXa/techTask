const Sequelize = require('sequelize');


module.exports = function (sequelize) {
    return sequelize.define('techtask', {
        id: {
            type: Sequelize.STRING(255),
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING(255),
            unique: true
        }
    }, {
        tableName: 'users',
        timestamps: false
    });
}