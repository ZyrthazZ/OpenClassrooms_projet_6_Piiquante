//Appel du modèle Sauce (schéma Mongoose)
const Sauce = require('../models/Sauce');


//Logique utilisée pour la création d'une sauce dans routes/sauces.js
exports.createSauce = (req, res, next) => {
    //Crée un objet sauceObject : on récupère la chaîne de caractère et on le PARSE en objet JSON. 
    const sauceObject = JSON.parse(req.body.sauce);
    //Supprime l'id envoyé par le frontend (basique de MongoDB)
    delete sauceObject._id;
    //Crée un objet sauce à partir du modèle Mongoose
    const sauce = new Sauce({
        //L'opérateur ... (spread) sert à faire une copie de tous les éléments de req.body (name, main pepper etc...)
        ...sauceObject,
        //Ici on gère l'URL du fichier : 
        //req.protocol est le premier segment (http ici)
        //on ajoute ://
        //req.get('host) pour résoudre l'hôte du serveur (ici 'localhost:3000')
        //on ajoute /images/ et le nom du fichier pour compléter l'URL
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //La méthode save de express enregistre l'objet sauce dans la base de données
    sauce.save()
        //Envoie une requête réussie
        .then(() => res.status(201).json({
            message: "Nouvelle sauce enregistrée !"
        }))
        //Indique une erreur
        .catch(error => res.status(400).json({
            error
        }));
};

//Logique utilisée pour la modification d'une sauce dans routes/sauces.js 
exports.modifySauce = (req, res, next) => {
    //Vérifie si l'on trouve un fichier ou non (correspondant ici à l'image)
    const sauceObject = req.file ?
        //Si on trouve un fichier
        {
            //On récupère la chaîne de caractère, que l'on PARSE en objet JSON...
            ...JSON.parse(req.body.sauce),
            //... et on modifie l'image URL 
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            //Si on ne trouve pas de fichier
            //On prend le corps de la requête 
            ...req.body
        };
    Sauce.updateOne({
            _id: req.params.id
        }, {
            //On prend l'objet que l'on a créé et on modifie son id pour correspondre au *
            //paramètre de la requête
            ...sauceObject,
            _id: req.params.id
        })
        //Envoie une requête réussie
        .then(() => res.status(200).json({
            message: "Sauce enregistrée !"
        }))
        //Indique une erreur
        .catch(error => res.status(400).json({
            error
        }));
};

//Logique utilisée pour la suppression d'une sauce dans routes/sauces.js
exports.deleteSauce = (req, res, next) => {
    //Utilise la méthode deleteOne() pour supprimer la sauce correspondant à *
    //l'id de la requête dans la base de données
    Sauce.deleteOne({
            _id: req.params.id
        })
        //Envoie une requête réussie
        .then(() => res.status(200).json({
            message: "Sauce supprimée !"
        }))
        //Indique une erreur
        .catch(error => res.status(400).json({
            error
        }));
};

//Logique utilisée pour la récupération d'une sauce spécifique dans routes/sauces.js
exports.getOneSauce = (req, res, next) => {
    //Utilise la méthode findOne() pour aller chercher dans la base de données *
    //la sauce correspondant à l'id de la requête
    Sauce.findOne({
            _id: req.params.id
        })
        //Envoie une requête réussie et l'objet sauce demandé
        .then(sauce => res.status(200).json(sauce))
        //Indique une erreur
        .catch(error => res.status(404).json({
            error
        }));
};

//Logique utilisée pour la récupération de toutes les sauces dans routes/sauces.js
exports.getAllSauces = (req, res, next) => {
    //Utilise la méthode find() pour aller chercher toutes les sauces dans notre base de données
    Sauce.find()
        //Envoie une requête réussie et un tableau contenant toutes les sauces
        .then(sauces => res.status(200).json(sauces))
        //Indique une erreur
        .catch(error => res.status(400).json({
            error
        }));
};