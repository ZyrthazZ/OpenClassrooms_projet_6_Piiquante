//Appelle le framework express
const express = require ('express');
//Appelle la fonction router d'express
const router = express.Router();

const authController = require('../controllers/user');

const passwordValidator = require('../middleware/passwordValidator');

router.post('/signup', passwordValidator,authController.signup);
router.post('/login', authController.login);

module.exports = router;