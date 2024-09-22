const { MESSAGES } = require('../utils/constant.util');
const log = require('../utils/debug.util');

const handleResponse = (req, res, next) => {
    try {
        let response = {};
        let respObj = req.respObj;

        response['success'] = respObj.success;

        if (respObj.data || respObj.data == null) {
            response['data'] = respObj.data;
        }
        if (respObj.message) {
            response['message'] = respObj.message;
        }

        if (response['success']) {
            return res.status(200).json(response);
        } else {
            if (response['data']) {
                response['error'] = response['data'];
                delete response.data;
            }
            if (response['message']) {
                if (response['message'] == MESSAGES.ERROR) {
                    log('!', response);
                    return res.status(500).json(response);
                }
            }
            log('!', response);
            return res.status(400).json(response);
        }
    } catch (error) {
        log('error', error);
        let errorObj = {
            success: false,
            message: MESSAGES.ERROR,
        };
        return res.status(500).json(errorObj);
    }
};

module.exports = handleResponse;
