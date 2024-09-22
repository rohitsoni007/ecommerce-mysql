const router = require('express').Router();
const product = require('../controllers/product.controller');
const {
    getOneValidation,
    addValidation,
    editValidation,
    getAllValidation,
} = require('../validations/product.validation');
const handleResponse = require('../middlewares/handleResponse.middleware');
const validate = require('../middlewares/validate.middleware');
const authorize = require('../middlewares/authorize.middleware');
const upload = require("../middlewares/multer.middleware");
const permission = require('../middlewares/permission.middleware');

router.post('/get', validate(getAllValidation), product.get, handleResponse);
router.get('/:id', validate(getOneValidation), product.getOne, handleResponse);
router.post('/add', authorize, permission(['admin','seller']), validate(addValidation), product.add, handleResponse);
router.post('/add-bulk', authorize, permission(['admin','seller']), upload.single('products'), product.addBulk, handleResponse);
router.put('/:id', authorize, permission(['admin','seller']), validate(editValidation), product.edit, handleResponse);
router.delete('/:id', authorize, permission(['admin','seller']), validate(getOneValidation), product.deleteOne, handleResponse);
router.post("/image", authorize, permission(['admin','seller']), upload.single('image'), product.uploadImage, handleResponse);

module.exports = router;
