//Appelle le framework express
const express = require('express');
//Appelle la fonction router d'express
const router = express.Router();

//Appelle le controller des sauces, là où est implantée toute la logique
const saucesController = require('../controllers/sauces');

//Appelle le middleware permettant de sécuriser les authentifications sur les requêtes liées aux routes sauces
const auth = require ('../middleware/auth');

//Appelle multer, qui permettra de gérer les fichiers images sur les requêtes 
const multer = require ('../middleware/multer-config');

//Router permettant de créer une sauce
router.post('/', auth, multer, saucesController.createSauce);
/*
//Router permettant de modifier une sauce
router.put('/:id', auth, saucesController.modifySauce);

//Router permettant de supprimer une sauce
router.delete('/:id', auth, saucesController.deleteSauce);

//Router permettant de récupérer une sauce spécifique
router.get('/:id', auth, saucesController.getOneSauce);

//Router permettant de récupérer toutes les sauces
router.get('/', auth, saucesController.getAllSauces);

*/
module.exports = router;