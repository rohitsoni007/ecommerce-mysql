var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { registerValidation, loginValidation, socialLoginValidation, changePasswordValidation, editProfileValidation } = require("../validations/auth.validation");
const handleResponse = require("../middlewares/handleResponse.middleware");
const authorize = require("../middlewares/authorize.middleware");

router.post("/register", validate(registerValidation), authController.register, handleResponse);
router.post("/login", validate(loginValidation), authController.login, handleResponse);
router.get("/me", authorize, authController.me, handleResponse);
router.get("/edit-profile", authorize, validate(editProfileValidation), authController.editProfile, handleResponse);
router.get("/change-password", authorize, validate(changePasswordValidation), authController.changePassword, handleResponse);

module.exports = router;
