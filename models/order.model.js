const sequelize = require('../utils/dbConnection.util');
const Sequelize = require('sequelize');
const Product = require('./product.model');
const User = require('./user.model');
const OrderItem = require('./orderItem.model');

const Order = sequelize.define(
    'order',
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
        total: {
            type: Sequelize.DECIMAL,
            defaultValue: null,
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'in-progess',
        },
        paymentStatus: {
            type: Sequelize.STRING,
            defaultValue: 'in-complete',
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        deletedBy: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
        deletedAt: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
    },
    {
        indexes: [
            {
                name: 'order_userId_index',
                using: 'BTREE',
                fields: ['userId'],
            },
        ],
    }
);

User.beforeUpdate((record, options) => {
    if (record.isDeleted) {
        record.deletedAt = new Date();
    }
});

Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });


module.exports = Order;
