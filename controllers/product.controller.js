const { Op } = require('sequelize');
const csv = require('csvtojson')
const Product = require('../models/product.model');
const Size = require('../models/size.model');
const { createResponse } = require('../utils/commonFunctions.util');
const { MESSAGES } = require('../utils/constant.util');
const ProductVariant = require('../models/productVariant.model');

const get = async (req, res, next) => {
    try {
        const { search, sizes } = req.body;

        let find = {
            isDeleted: false,
        };

        let variantFind = {}

        if (search) {
            find['name'] = {
                [Op.substring]: search,
            };
        }

        if (sizes && sizes.length > 0) {
            variantFind['sizeId'] = {
                [Op.in]: sizes,
            };
        }

        const data = await Product.findAll({
            where: find,
            order: [['id', 'DESC']],
            attributes: [
                'id',
                'name',
                'price',
                'image',
                'description',
                'createdAt',
                'updatedAt',
            ],
            include: [
                {
                    model: ProductVariant,
                    where: variantFind,
                    required: true
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

        const data = await Product.findOne({
            where: {
                isDeleted: false,
                id: id,
            },
            include: [
                {
                    model: ProductVariant,
                    required: false
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
        console.log(' body', req.body);
        const { sizes } = req.body;
        const data = await Product.create(req.body);

        let variantData = sizes.map(item => {
            return {
                sizeId: item,
                productId: data.id
            }
        });

        await ProductVariant.bulkCreate(variantData);

        createResponse(req, true, data, MESSAGES.ADDED('Product'));
        return next();
    } catch (error) {
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};

const addBulk = async (req, res, next) => {
    try {
        console.log(' body', req.body);
        // const { sizes } = req.body;
        if(!req.file){
            throw {message:'Unable to upload'}
          }

        let csvData = Buffer.from(req.file.buffer).toString();
        let data = await csv().fromString(csvData);

        let grouped = groupBy(data, 'name');

        const groups = Object.keys(grouped).map((key) => {
            return {
                name: key,
                price: grouped[key][0].price,
                image: grouped[key][0].image,
                description: grouped[key][0].description,
                variants : grouped[key]
            };
        });

        groups.map( async(item) => {
            let productData = {
                name: item.name,
                price: item.price,
                image: item.image,
                description: item.description,

            }
            const data = await Product.create(productData);

            let variantData = item.variants.map(item => {
                return {
                    sizeId: item.sizeId,
                    productId: data.id
                }
            });
    
            await ProductVariant.bulkCreate(variantData);

        })
       

        createResponse(req, true, data, MESSAGES.ADDED('Products'));
        return next();
    } catch (error) {
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};

const groupBy = (items, key) => {
    return items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item],
        }),
        {}
    );
};

const edit = async (req, res, next) => {
    try {
        const { id } = req.params;

        let data = await Product.findByPk(id);

        if (!data) {
            throw { message: MESSAGES.NO_DATA };
        }

        const updated = await data.update(req.body);

        createResponse(req, true, updated, MESSAGES.UPDATED('Product'));
        return next();
    } catch (error) {
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        let data = await Product.findByPk(id);

        if (!data) {
            throw { message: MESSAGES.NO_DATA };
        }

        let dataToUpdate = {
            isDeleted: true,
        };

        const updated = await data.update(dataToUpdate);

        createResponse(req, true, updated, MESSAGES.DELETED('Product'));
        return next();
    } catch (error) {
        let message = error.message || MESSAGES.ERROR;
        createResponse(req, false, error, message);
        return next();
    }
};


const uploadImage = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { productId } = req.query;
  
      if(!req.file){
        throw {message:'Unable to upload'}
      }
      let { filename } = req.file;
  
  
      let fullFileName = 'images/'+ filename;
      
      let product =null;
      if(!productId){
        const dataToAdd = {
          // name,
          // email,
          // phone,
          // address,
          // introduction,
          // template,
          image: fullFileName,
        };
    
        product = await new Product(dataToAdd).save();
      }else{
        product = await Product.findByPk(productId);
        if(product){
            product.image = fullFileName;
            product = await product.save();
        }
      }
  
      const resp = {
        updatedProduct: product,
      };
  
      createResponse(req, true, resp , MESSAGES.UPDATED("Product"));
      return next();
    } catch (error) {
      createResponse(req, false, error.message || MESSAGES.ERROR);
      return next();
    }
  };
module.exports = {
    get,
    getOne,
    add,
    addBulk,
    edit,
    deleteOne,
    uploadImage
};
