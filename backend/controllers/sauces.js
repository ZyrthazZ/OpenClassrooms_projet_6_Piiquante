
//Appel du modèle Sauce (schéma Mongoose)
const Sauce = require('../models/Sauce');


//Logique utilisée pour la création d'une sauce dans routes/sauces.js
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({
            message: "Nouvelle sauce enregistrée !"
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

//Logique utilisée pour la modification d'une sauce dans routes/sauces.js 
exports.modifySauce = (req, res, next) => {

};

//Logique utilisée pour la suppression d'une sauce dans routes/sauces.js
exports.deleteSauce = (req, res, next) => {

};

//Logique utilisée pour la récupération d'une sauce spécifique dans routes/sauces.js
exports.getOnSauce = (req, res, next) => {

};

//Logique utilisée pour la récupération de toutes les sauces dans routes/sauces.js
exports.getAllSauces = (req, res, next) => {

};
