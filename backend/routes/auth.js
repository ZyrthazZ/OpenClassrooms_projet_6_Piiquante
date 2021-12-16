//Appelle le framework express
const express = require ('express');
//Appelle la fonction router d'express
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;