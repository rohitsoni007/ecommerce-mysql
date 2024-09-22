const { MESSAGES } = require('../utils/constant.util');
const log = require('../utils/debug.util');

const permission = (roles) => {
    return (req, res, next) => {
        try {
            const { id, type } = req.user;

            if (!roles) {
                return next();
            }

            if (roles.indexOf(type) == -1) {
                throw { message: MESSAGES.PERMISSION_DENIED, statusCode: 401 };
            }

            return next();
        } catch (err) {
            log('error', err);
            const message = err.message || MESSAGES.ERROR;
            const errorObj = {
                message: message,
                error: err,
            };
            return res.status(err.statusCode || 401).json(errorObj);
        }
    };
};

module.exports = permission;
