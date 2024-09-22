const router = require('express').Router();
const cart = require('../controllers/cart.controller');
const {
    getOneValidation,
    addValidation,
    editValidation,
    getAllValidation,
} = require('../validations/cart.validation');
const handleResponse = require('../middlewares/handleResponse.middleware');
const validate = require('../middlewares/validate.middleware');
const authorize = require('../middlewares/authorize.middleware');

router.get('/', authorize, validate(), cart.get, handleResponse);
router.post('/', authorize, validate(addValidation), cart.add, handleResponse);
router.put('/:id', authorize, validate(editValidation), cart.edit, handleResponse);
router.delete('/:id', authorize, validate(getOneValidation), cart.deleteOne, handleResponse);

module.exports = router;
