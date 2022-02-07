//Appelle le framework express
const express = require('express');

//appelle la route user
const userRoutes = require('./routes/user');
//appelle la route sauce
const saucesRoutes = require('./routes/sauces');
//appelle le model Sauce
const Sauce = require('./models/Sauce');

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

//appelle le package helmet
const helmet = require('helmet');
//envoie le package helmet dans l'application, ce qui va corriger beaucoup de failles de sécurité (plus de détails dans UsefulNotes.txt)
app.use(helmet());

//appelle le package cookie-session
const session = require('cookie-session');

//définit le temps d'expiration des cookies (en millisecondes)
const expireTime = new Date(Date.now() + 60 * 60 * 1000); //1 heure
//envoie le package cookie-session dans l'application
app.use(session({
    name: 'session',
    //keys : 
    keys: ['key1', 'key2'],
    cookie: {
        secure: true, 
        httpOnly: true, 
        domain: 'https://localhost:3000',
        expires: expireTime
    }
}));

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

//path indique le chemin du serveur
const path = require('path');
//Indique à express de gérer les images de manière statique dès qu'elle recoit une requête *
//vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Gère la userRoutes, qui appelle la route user.js qui appelle le controller user.js
app.use('/api/auth', userRoutes);

//Gère la saucesRoutes, qui appelle la route sauces.js qui appelle le controller sauces.js
app.use('/api/sauces', saucesRoutes);


//Exporte l'application pour qu'elle soit utilisable par les autres fichiers
module.exports = app;