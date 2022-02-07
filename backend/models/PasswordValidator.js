//On appelle le package password-validator
const passwordValidator = require('password-validator');

//On créé le schéma de mot de passe
const passwordSchema = new passwordValidator();

//On ajout les propriétés du mot de passe dans le schéma
passwordSchema
    //Le mot de passe a minimum 8 charactères
    .is().min(8)
    //Le mot de passe a maximum 25 charactères
    .is().max(25)
    //Le mot de passe doit avoir au moins une majuscule
    .has().uppercase()
    //Le mot de passe doit avoir au moins une minuscule
    .has().lowercase()
    //Le mot de passe doit avoir au moins 2 nombres
    .has().digits(2)
    //Le mot de passe doit avoir au moins un charactère spécial
    .has().symbols()
    //Le mot de passe ne doit pas contenir d'espace
    .has().not().spaces()
    //Le mot de passe ne doit pas figurer parmi cette blacklist
    .is().not().oneOf(["Passw0rd1*", "Password123*"]);

module.exports = passwordSchema;