const express = require('express');
const router = express.Router();

const saucesController = require('../controllers/sauces');

//Réponse simple pour savoir si le serveur répond bien 
router.use((req, res, next) => {
    res.json({
        message: "Votre requête a bien été reçue !"
    });
});



module.exports = router;