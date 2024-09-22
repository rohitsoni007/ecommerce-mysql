const sequelize = require('../utils/dbConnection.util');
const Sequelize = require('sequelize');
const Product = require('./product.model');
const User = require('./user.model');
const ProductVariant = require('./productVariant.model');

const OrderItem = sequelize.define(
    'order_item',
    {
        orderId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        productId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        productVariantId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        price: {
            type: Sequelize.DECIMAL,
            defaultValue: null,
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        total: {
            type: Sequelize.DECIMAL,
            defaultValue: null,
        },
        
    },
    {
        indexes: [
            {
                name: 'order_item_orderId_index',
                using: 'BTREE',
                fields: ['orderId'],
            },
        ],
    }
);

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
OrderItem.belongsTo(ProductVariant, { foreignKey: 'productVariantId' });

module.exports = OrderItem;
