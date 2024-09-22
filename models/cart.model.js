const sequelize = require('../utils/dbConnection.util');
const Sequelize = require('sequelize');
const Product = require('./product.model');

const Cart = sequelize.define(
    'cart',
    {
        // id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true
        // },
        userId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        productId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
    },
    {
        indexes: [
            {
                name: 'cart_userId_index',
                using: 'BTREE',
                fields: ['userId'],
            },
            {
                name: 'cart_productId_index',
                using: 'BTREE',
                fields: ['productId'],
            },
        ],
    }
);

Cart.belongsTo(Product, { foreignKey: 'productId' });


module.exports = Cart;
