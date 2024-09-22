const { Op } = require('sequelize');
const Cart = require('../models/cart.model');
const { createResponse } = require('../utils/commonFunctions.util');
const { MESSAGES } = require('../utils/constant.util');
const Product = require('../models/product.model');

const get = async (req, res, next) => {
    try {
        const { id } = req.user;
        
        const find = {
            userId: id
        }
        

        const data = await Cart.findAll({
            where: find,
            order: [['id', 'DESC']],
            attributes: [
                'id',
                // 'userId',
                'productId',
                'quantity',
            ],
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
        const { productId } = req.body;
        console.log(' body', req.body);

        let existingCart = await Cart.findOne({
            where: {
                userId: id,
                productId
            }
        });
        let data = null;

        if(existingCart){
            existingCart.quantity = existingCart.quantity + 1
            data = await existingCart.save();

        }else{
            let cartData = {
                userId: id,
                ...req.body
            }
            data = await Cart.create(cartData);
        }

        createResponse(req, true, data, MESSAGES.ADDED('Cart'));
        return next();
    } catch (error) {
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};

const edit = async (req, res, next) => {
    try {
        const { id } = req.params;

        let data = await Cart.findByPk(id);

        if (!data) {
            throw { message: MESSAGES.NO_DATA };
        }

        const updated = await data.update(req.body);

        createResponse(req, true, updated, MESSAGES.UPDATED('Cart'));
        return next();
    } catch (error) {
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const userId = req.user.id
        const { id } = req.params;

        let data = await Cart.findByPk(id);

        if (!data) {
            throw { message: MESSAGES.NO_DATA };
        }

        await Cart.destroy({
            where: {
                id
            //   userId: userId,
            },
          });
        // const updated = await data.update(dataToUpdate);

        createResponse(req, true, null, MESSAGES.DELETED('Cart'));
        return next();
    } catch (error) {
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};
module.exports = {
    get,
    add,
    edit,
    deleteOne,
};
