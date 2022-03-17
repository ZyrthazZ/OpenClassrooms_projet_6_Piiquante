//Appel du package jsonwebtoken
const jwt = require('jsonwebtoken');

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
        //Si on a un userId dans le corps de la requête et que celui-ci diffère du userId extrait, 
        //on retourne une erreur
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