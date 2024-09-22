const joi = require('joi');

const addValidation = {
    body: {
        name: joi.string().max(255).required(),
        price:joi.number().min(1).required(),
        image: joi.string().max(255).allow('', null).optional(),
        description: joi.string().max(1000).allow('', null).optional(),
        sizes: joi.array().items(joi.number().min(1)).allow('', null).optional(),
    },
};

const getOneValidation = {
    params: {
        id: joi.string().uuid().required(),
    },
};

const editValidation = {
    ...getOneValidation,
    body: {
        name: joi.string().max(255).required(),
        price:joi.number().min(1).required(),
        image: joi.string().max(255).allow('', null).optional(),
        description: joi.string().max(1000).allow('', null).optional(),
        sizes: joi.array().items(joi.number().min(1)).allow('', null).optional(),
    },
};

const getAllValidation = {
    body: {
        search: joi.string().max(255).allow('', null).optional(),
        sizes: joi.array().items(joi.number().min(1)).allow('', null).optional(),
    },
};

module.exports = {
    addValidation,
    editValidation,
    getAllValidation,
    getOneValidation,
};
