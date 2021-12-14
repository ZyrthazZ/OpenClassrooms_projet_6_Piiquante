//Appel le framework express
const express = require('express');

//Permet de créer une application express
const app = express();

app.use((req, res, next) => {
    res.json({
        message: "Votre requête a bien été reçue !"
    });
});





//Exporte l'application pour qu'elle soit utilisable par les autres fichiers
module.exports = app;