const sequelize = require('../utils/dbConnection.util');
const Sequelize = require('sequelize');

const ProductVariant = sequelize.define(
    'product_variant',
    {
        code: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        sizeId: {
            type: Sequelize.INTEGER,
        },
        productId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
    },
    {
        indexes: [
            {
                name: 'product_variant_code_index',
                using: 'BTREE',
                fields: ['code'],
            },
        ],
    }
);

ProductVariant.beforeUpdate((record, options) => {
    if (record.isDeleted) {
        record.deletedAt = new Date();
    }
});

module.exports = ProductVariant;
