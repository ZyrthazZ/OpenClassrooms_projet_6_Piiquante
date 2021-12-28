//Appelle le framework express
const express = require('express');



//const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

//Appelle le package mongoose et connecte l'app à la base de données MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://zyrthazz:project6@project6databasecluster.ntwb4.mongodb.net/project6databasecluster?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Permet de créer une application express
const app = express();

//Appel de la fonction "bodyparser" d'express, transformant les requêtes en string
app.use(express.json());

//path indique le chemin du serveur
const path = require('path');

//Middleware gérant les problèmes de CORS (Cross Origin Resource Sharing)
app.use((req, res, next) => {
    //Accepte les requêtes depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Accepte les requêtes comprenant certains headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //Accepte d'envoyer des requêtes avec des verbes HTTPS spécifiques
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Indique à express de gérer les images de manière statique dès qu'elle recoit une requête *
//vers la route /images
app.use('images/', express.static(path.join(__dirname, 'images')));

//app.use(saucesRoutes);
app.use('/api/auth', userRoutes);


//Exporte l'application pour qu'elle soit utilisable par les autres fichiers
module.exports = app;