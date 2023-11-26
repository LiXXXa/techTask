const Sequelize = require('sequelize');


module.exports = function (sequelize) {
    return sequelize.define('techtask', {
        id: {
            type: Sequelize.STRING(255),
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING(255)
        },
        bearer_token: {
            type: Sequelize.STRING(255)
        },
        refresh_token: {
            type: Sequelize.STRING(255)
        },
        uuid: {
            type: Sequelize.STRING(255)
        }
    }, {
        tableName: 'users',
        timestamps: false
    });
}