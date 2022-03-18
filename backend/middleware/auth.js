//Appel du package jsonwebtoken
const jwt = require('jsonwebtoken');
//Appel du model Sauce
const Sauce = require('../models/Sauce');

//Ce middleware va essayer de sécuriser les requêtes
module.exports = (req, res, next) => {
    try {
        //Récupère dans authorization tout ce qui vient après l'espace, donc après "bearer"
        const token = req.headers.authorization.split(' ')[1];
        //On décode le token grâce à verify de jwt en vérifiant qu'il corresponde
        //à la clef secrète présente la fonction login
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        //On extraie l'ID utilisateur du token
        const userId = decodedToken.userId;
        //On vérifie si une sauce contient un userId égal à celui extrait du token
        var checkUserId = Sauce.findOne({
            userId: userId
        });
        //On vérifie qu'on a un userId dans l'objet checkUserId et qu'il diffère du userId extrait du token
        if (checkUserId.userId && checkUserId.userId !== userId) { // User login is not user that owns post
            throw "Invalid user ID";
        } else { // User login is user that owns post
            console.log("req.params.id", req.params.id)
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error("Invalid request !")
        });
    }
};