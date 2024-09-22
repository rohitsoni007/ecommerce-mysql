const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { MESSAGES } = require('../utils/constant.util');
const log = require('../utils/debug.util');
const { JWT_SECRET } = process.env;

const authorize = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')?.pop();
        console.log('~ token', token);
        if (!token) {
            throw { message: MESSAGES.TOKEN_MISSING, statusCode: 400 };
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('~ decoded', decoded);
        if (!decoded) {
            throw { message: MESSAGES.TOKEN_INVALID, statusCode: 401 };
        }

        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw { message: MESSAGES.ACCOUNT_NOT_EXIST, statusCode: 401 };
        }
        if (user.isDeleted || !user.isActive) {
            throw { message: MESSAGES.ACCOUNT_DEACTIVATED, statusCode: 401 };
        }

        req.user = user;
        return next();
    } catch (err) {
        log('error', err);
        let message = null;
        if (err.name == 'TokenExpiredError') {
            message = MESSAGES.TOKEN_EXPIRED;
        } else if (err.name == 'JsonWebTokenError') {
            message = MESSAGES.TOKEN_INVALID;
        } else {
            message = err.message || MESSAGES.ERROR;
        }
        let errorObj = {
            message: message,
            error: err,
        };
        return res.status(err.statusCode || 401).json(errorObj);
    }
};

module.exports = authorize;
