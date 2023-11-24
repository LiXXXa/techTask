const Sequelize = require('sequelize');


module.exports = function (sequelize) {
    return sequelize.define('techtask', {
        id: {
            type: Sequelize.STRING(255),
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(255),
            unique: true
        },
        extension: {
            type: Sequelize.STRING(10),
        },
        mimetype: {
            type: Sequelize.STRING(50),
        },
        size: {
            type: Sequelize.DECIMAL(10,2),
        },
        date: {
            type: Sequelize.SMALLINT.UNSIGNED
        },
    }, {
        tableName: 'files',
        timestamps: false
    });
}