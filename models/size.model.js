const sequelize = require('../utils/dbConnection.util');
const Sequelize = require('sequelize');

const Size = sequelize.define(
    'size',
    {
        name: {
            type: Sequelize.STRING,
        },
        nameAr: {
            type: Sequelize.STRING,
        },
    },
    {
        indexes: [
            
        ],
    }
);

Size.beforeUpdate((record, options) => {
    if (record.isDeleted) {
        record.deletedAt = new Date();
    }
});

module.exports = Size;
