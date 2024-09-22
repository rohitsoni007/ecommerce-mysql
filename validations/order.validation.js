const joi = require('joi');



const getOneValidation = {
    params: {
        id: joi.string().uuid().required(),
    },
};





module.exports = {
    getOneValidation
};
