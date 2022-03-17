//On appelle le package email-validator
const emailValidator = require('email-validator');


module.exports = (req, res, next) => {
    if (!emailValidator.validate(req.body.email)) {
        res.status(400).json({
            message: "Erreur ! Veuillez rentrer votre adresse mail au bon format !"
        })
    } else {
        next();
    }
};