const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { authValidation } = require('../../validations');
const { authController } = require('../../controllers');

const router = express.Router();

router.route('/register').post(validate(authValidation.register), authController.register);
router.route('/login').post(validate(authValidation.login), authController.login);
router.route('/logout').post(auth(), validate(authValidation.logoutn), authController.logout);

module.exports = router;
