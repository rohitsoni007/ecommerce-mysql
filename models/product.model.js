const sequelize = require('../utils/dbConnection.util');
const Sequelize = require('sequelize');

const Product = sequelize.define(
    'product',
    {
        code: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: Sequelize.STRING,
        },
        nameAr: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.DECIMAL,
        },
        image: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
        },
        createdBy: {
            type: Sequelize.INTEGER,
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        deletedBy: {
            type: Sequelize.INTEGER,
        },
        deletedAt: {
            type: Sequelize.DATE,
        },
    },
    {
        indexes: [
            {
                name: 'product_code_index',
                using: 'BTREE',
                fields: ['code'],
            },
            {
                name: 'product_createdBy_index',
                using: 'BTREE',
                fields: ['createdBy'],
            },
            {
                name: 'product_isDeleted_index',
                using: 'BTREE',
                fields: ['isDeleted'],
            },
        ],
    }
);

Product.beforeUpdate((record, options) => {
    if (record.isDeleted) {
        record.deletedAt = new Date();
    }
});

module.exports = Product;
