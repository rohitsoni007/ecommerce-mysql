const Joi = require('joi');
const log = require('../utils/debug.util');

const validate = function (schema) {
    return function (req, res, next) {
        try {
            if (!schema) {
                return next();
            }
            var obj = {};
            ['params', 'body'].forEach(function (key) {
                var k = key;
                if (schema[k]) {
                    obj[k] = req[k];
                }
            });
            var joiSchema = Joi.object(schema);
            var { error } = joiSchema.validate(obj);
            if (error) {
                var field = error.details[0].path.join('.');
                var message = error.details[0].message
                    .replace(/"/g, "'")
                    .replace('body.', '')
                    .replace('params.', '');
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: message,
                        error: { message, field },
                    });
            }
            return next();
        } catch (error) {
            log('error', error);
            return next();
        }
    };
};

module.exports = validate;
