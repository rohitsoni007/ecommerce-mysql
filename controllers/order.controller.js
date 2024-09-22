const { Op } = require('sequelize');
const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');
const { createResponse } = require('../utils/commonFunctions.util');
const { MESSAGES } = require('../utils/constant.util');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

const get = async (req, res, next) => {
    try {
        const { search } = req.body;

        let find = {
            isDeleted: false,
            status: 'complete'
        };

        if (search) {
            find['title'] = {
                [Op.substring]: search,
            };
        }


        const data = await Order.findAll({
            where: find,
            order: [['id', 'DESC']],
            // attributes: [
            //     'id',
            //     'jobId',
            //     'title',
            //     'description',
            //     'color',
            //     'createdAt',
            //     'updatedAt',
            // ],
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'email',
                    ]
                },
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Product
                        }
                    ]
                }
            ]
        });

        createResponse(req, true, data);
        return next();
    } catch (error) {
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await Order.findOne({
            where: {
                isDeleted: false,
                id: id,
            },
            include: [
                {
                    model: OrderItem,
                }
            ]
        });

        createResponse(req, true, data);
        return next();
    } catch (error) {
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};

const add = async (req, res, next) => {
    try {
        const { id } = req.user;

        console.log(' body', req.body);

        const cart = await Cart.findAll({
            where: {
                userId: id
            },
            include: [
                {
                    model: Product,
                    required: false,
                    attributes: [
                        'id',
                        'name',
                        'price',
                        'image',
                        'description',
                    ],
                },
            ]
        });

        let finalTotal = cart.reduce((total, item)=>{
            return total + (Math.round(item.product.price) * item.quantity);
        }, 0)
        console.log('~ finalTotal', finalTotal);

        let orderData = {
            userId: id,
            total: finalTotal
        }

        const data = await Order.create(orderData);

        let orderItemData = cart.map(item => {
            return {
                orderId: data.id,
                productId: item.productId,
                price: item.product.price,
                quantity: item.quantity,
                total: item.product.price * item.quantity
            }
        });

        await OrderItem.bulkCreate(orderItemData);
        
        await Cart.destroy({ 
            where: {
                userId: id
            }
        });

        createResponse(req, true, url, MESSAGES.ADDED('Order'));
        return next();
    } catch (error) {
        console.log('~ error ', error);
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};



module.exports = {
    get,
    getOne,
    add,
};
