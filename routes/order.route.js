const router = require('express').Router();
const order = require('../controllers/order.controller');
const {
    getOneValidation,
    addValidation,
    editValidation,
    getAllValidation,
} = require('../validations/cart.validation');
const handleResponse = require('../middlewares/handleResponse.middleware');
const validate = require('../middlewares/validate.middleware');
const authorize = require('../middlewares/authorize.middleware');
const permission = require('../middlewares/permission.middleware');

router.get('/', authorize, permission(['admin']), validate(), order.get, handleResponse);
router.get('/:id', authorize, permission(['admin']), validate(getOneValidation), order.getOne, handleResponse);
router.post('/', authorize, validate(), order.add, handleResponse);

module.exports = router;
