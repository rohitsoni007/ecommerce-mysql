const PROJECT_NAME = 'E Commerce';
const path = require('path');
const enums = require('../config/enums');

const PATH = {
    API_DOCS: '/api-docs',
    PUBLIC: path.join(__dirname, '../public'),
    TEMPLATE: path.join(__dirname, '../templates'),
};


const MESSAGES = {
    REGISTER: `Register successfully`,
    LOGIN: `Logged in successfully`,
    INVITE_USER: `User invited successfully`,
    EMAIL_EXIST: `Email already exists`,
    EMAIL_NOT_EXIST: `Email does not exists`,
    USER_NOT_EXIST: `User does not exists`,
    NAME_EXIST: `Name already exist`,
    INVALID_CREDENTIAL: `Invalid credentials`,
    INCORRECT_OLD_PASSWORD: `Old password is incorrect`,
    TOKEN_MISSING: `Missing authorization token`,
    SIGNATURE_MISSING: `Missing authorization signature`,
    PAYLOAD_MISSING: `Missing payload`,
    TOKEN_EXPIRED: `Token is expired`,
    TOKEN_INVALID: `Token is invalid`,
    PAYLOAD_INVALID: `Payload is invalid`,
    ACCOUNT_NOT_EXIST: `Account does not exists`,
    PERMISSION_DENIED: `You do not have permission to access this route`,
    ACCOUNT_DEACTIVATED: `Account de-activated`,
    RESET_TOKEN_INVALID: `Token is not valid or expired`,
    PASSWORD_RESET: `Password reset successfully`,
    PASSWORD_CHANGED: `Password changed successfully`,
    UPLOAD_FAILED: `Unable to upload`,
    UPLOAD_SUCCESS: `Image uploaded successfully`,
    EMAIL_SENT: `Email sent successfully`,
    PAYMENT_SUCCESSFUL: `Payment successfully`,
    PAYMENT_FAILED: `Payment failed`,
    IMAGE_EXT_INVALID:
        `Allowed extensions are ` + enums.images.extensions.toString(', '),
    NO_DATA: `No data found`,
    ADDED: (type) => `${type} added successfully`,
    UPDATED: (type) => `${type} updated successfully`,
    DELETED: (type) => `${type} deleted successfully`,
    ERROR: `Something went wrong, please try again later`,

    ALREADY: (type) => `${type} already exist`,
};

module.exports = {
    PROJECT_NAME,
    PATH,
    MESSAGES,
};
