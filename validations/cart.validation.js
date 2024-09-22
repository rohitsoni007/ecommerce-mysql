const joi = require('joi');

const addValidation = {
    body: {
        productId: joi.string().uuid().required(),
        quantity: joi.number().min(1).required(),
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
        quantity: joi.number().min(1).required(),
    },
};



module.exports = {
    addValidation,
    editValidation,
};
