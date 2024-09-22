const sequelize = require('../utils/dbConnection.util');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define(
    'user',
    {
        email: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        password: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        firstName: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        lastName: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        deletedBy: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: 'user',
        },
        deletedAt: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        indexes: [
            {
                name: 'user_email_index',
                using: 'BTREE',
                fields: ['email'],
            },
            {
                name: 'user_isDeleted_index',
                using: 'BTREE',
                fields: ['isDeleted'],
            },
            {
                name: 'user_isActive_index',
                using: 'BTREE',
                fields: ['isActive'],
            },
        ],
    }
);



User.beforeUpdate((record, options) => {
    if (record.isDeleted) {
        record.deletedAt = new Date();
    }
});


module.exports = User;
