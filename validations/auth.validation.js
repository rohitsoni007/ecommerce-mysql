const Joi = require('joi');

const registerValidation = {
    body: {
        email: Joi.string().email().trim().max(255).allow('', null).optional(),
        password: Joi.string().min(6).max(10)
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'))
        .allow('', null).optional(),
        confirmPassword: Joi.any()
            .equal(Joi.ref('password'))
            .allow('', null)
            .optional()
            .label('Confirm password')
            .messages({ 'any.only': '{{#label}} does not match' }),
        firstName: Joi.string().max(255).allow('', null).optional(),
        lastName: Joi.string().max(255).allow('', null).optional(),
    },
};

const loginValidation = {
    body: {
        email: Joi.string().email().trim().max(255).required(),
        password: Joi.string().min(6).max(10).required(),
        
    },
};

const changePasswordValidation = {
    body: {
        oldPassword: Joi.string().min(6).max(10).allow('', null).optional(),
        password: Joi.string().min(6).max(10)
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'))
        .allow('', null).optional(),
        confirmPassword: Joi.any()
            .equal(Joi.ref('password'))
            .allow('', null)
            .optional()
            .label('Confirm password')
            .messages({ 'any.only': '{{#label}} does not match' }),
    },
};

const editProfileValidation =  {
    body: {
        firstName: Joi.string().max(255).allow('', null).optional(),
        lastName: Joi.string().max(255).allow('', null).optional(),
    },
}


module.exports = {
    registerValidation,
    loginValidation,
    editProfileValidation,
    changePasswordValidation
};
