//Appelle le framework express
const express = require ('express');
//Appelle la fonction router d'express
const router = express.Router();

const authController = require('../controllers/user');

const emailValidator = require('../middleware/emailValidator');

const passwordValidator = require('../middleware/passwordValidator');

router.post('/signup', emailValidator, passwordValidator, authController.signup);
router.post('/login', emailValidator, passwordValidator, authController.login);

module.exports = router;