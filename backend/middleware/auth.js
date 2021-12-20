//Appel du package jsonwebtoken
const jwt = require('jsonwebtoken');

//Ce middleware va essayer de sécuriser les requêtes
module.exports = (req, res, next) => {
    try {
        //Récupère dans authorization tout ce qui vient après l'espace, donc après "bearer"
        const token = req.headers.authorization.split(' ')[1];
        //Utilisation de la fonction verify de jwt qui va décoder le token et renvoyer une erreur en cas 
        //de non validité
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');
        //On extraie l'ID utilisateur du token
        const userId = decodedToken.userId;
        //Si le userId du corps de la requête et qu'il diffère du userId, renvoie une erreur
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        //Si on arrive au else, c'est que tout s'est bien passé
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error("Invalid request !")
        });
    }
};