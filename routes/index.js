const router = require('express').Router();
const { PROJECT_NAME, PATH } = require('../utils/constant.util');

router.get('/', function (req, res, next) {
    res.render('index', { title: PROJECT_NAME, apiDocPath: PATH.API_DOCS });
});

module.exports = router;
