const axios = require('axios');

const createResponse = (req, success, data, message) => {
    let respObj = {};
    respObj['success'] = success;
    if (data || data == null) {
        respObj['data'] = data;
    }
    if (message) {
        respObj['message'] = message;
    }
    req.respObj = respObj;
    return;
};





module.exports = {
    createResponse,
};
