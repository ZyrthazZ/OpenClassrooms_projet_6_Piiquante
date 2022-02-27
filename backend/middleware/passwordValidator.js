//On appelle le schéma du mot de passe
const passwordSchema = require('../models/PasswordValidator');


module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({
            message: "Erreur ! Votre mot de passe n'est pas valable. Il doit contenir 8 charactères au minimum, avoir des majuscules, des minulscules, 2 chiffres minimum et des charactères spéciaux !"
        })
    } else {
        next();
    }
};