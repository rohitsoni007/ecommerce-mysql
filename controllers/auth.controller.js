const User = require('../models/user.model');
const { createResponse, httpClient } = require('../utils/commonFunctions.util');
const { MESSAGES } = require('../utils/constant.util');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = process.env;
const bcrypt = require('bcrypt');

const _auth = {};

_auth.register = async (req, res, next) => {
    try {
        const {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
        } = req.body;

        if (email) {

            const exist = await User.findOne({
                where: {
                    email
                },
            });
            if (exist) {
                throw { message: MESSAGES.EMAIL_EXIST };
            }
        }



        const userData = {
            email,
            password: password ? bcrypt.hashSync(password, 10) : null,
            firstName,
            lastName,
        };

        let user = await new User(userData).save();
        
        user.password = undefined;
        const token = getToken(user.id);
        const resp = {
            user,
            token
        };

        createResponse(req, true, resp, MESSAGES.REGISTER );
        return next();
    } catch (error) {
        createResponse(req, false, error.message || MESSAGES.ERROR);
        return next();
    }
};

_auth.login = async (req, res, next) => {
    try {
        const { email, password, type } = req.body;

        const userFilter = {
            email,
        };

        const user = await User.findOne({ where: userFilter});

        if (!user) {
            throw { message: MESSAGES.EMAIL_NOT_EXIST };
        }

        console.log('~ user', user.isDeleted, user.isActive);
        if (user.isDeleted || !user.isActive) {
            throw { message: MESSAGES.ACCOUNT_DEACTIVATED };
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        
        if (!checkPassword) {
            throw { message: MESSAGES.INVALID_CREDENTIAL };
        }

        const token = getToken(user.id);

        user.password = undefined;

        const resp = {
            user,
            token,
        };


        createResponse(req, true, resp,  MESSAGES.LOGIN );
        return next();
    } catch (error) {
        createResponse(req, false, error.message || MESSAGES.ERROR);
        return next();
    }
};

_auth.me = async (req, res, next) => {
    try {
        const resp = {
            user: req.user,
        };


        createResponse(req, true, '', resp);
        return next();
    } catch (error) {
        createResponse(req, false, error.message || MESSAGES.ERROR);
        return next();
    }
};


_auth.editProfile = async (req, res, next) => {
    try {
        const { id } = req.user;

        const {
            firstName,
            lastName,
        } = req.body;


        const userFilter = {
            isDeleted: false,
            id: id,
        };

        
        const user = await User.findOne({ where: userFilter});

        if (!user) {
            throw { message: MESSAGES.EMAIL_NOT_EXIST };
        }

        if (user.isDeleted || !user.isActive) {
            throw { message: MESSAGES.ACCOUNT_DEACTIVATED };
        }
        
        if (!checkPassword) {
            throw { message: MESSAGES.INVALID_CREDENTIAL };
        }

        let dataToUpdate = {
            firstName,
            lastName,
        };

        const updated = await user.update(dataToUpdate);

        createResponse(req, true, updated, MESSAGES.UPDATED('Profile'));
        return next();
    } catch (error) {
        createResponse(req, false, error.message || MESSAGES.ERROR);
        return next();
    }
};

_auth.changePassword = async (req, res, next) => {
    try {
        const { id } = req.user;

        const { oldPassword, password, confirmPassword } = req.body;

        const userFilter = {
            isDeleted: false,
            id: id,
        };

        
        const user = await User.findOne({ where: userFilter});

        if (!user) {
            throw { message: MESSAGES.EMAIL_NOT_EXIST };
        }

        console.log('~ user', user.isDeleted, user.isActive);
        if (user.isDeleted || !user.isActive) {
            throw { message: MESSAGES.ACCOUNT_DEACTIVATED };
        }
        const checkPassword = bcrypt.compareSync(oldPassword, user.password);
        
        if (!checkPassword) {
            throw { message: MESSAGES.INVALID_CREDENTIAL };
        }

        let dataToUpdate = {
            password: password ? bcrypt.hashSync(password, 10) : null,
        };

        const updated = await user.update(dataToUpdate);


        createResponse(req, true, updated, MESSAGES.PASSWORD_CHANGED);
        return next();
    } catch (error) {
        createResponse(req, false, error.message || MESSAGES.ERROR);
        return next();
    }
};

const getToken = (id) => {
    const jwtObj = { id };

    const token = jwt.sign(jwtObj, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
    });
    return token;
};



module.exports = _auth;