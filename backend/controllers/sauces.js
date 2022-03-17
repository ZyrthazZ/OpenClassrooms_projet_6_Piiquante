//Appel du modèle Sauce (schéma Mongoose)
const Sauce = require('../models/Sauce');

//Appel du package jsonwebtoken
const jwt = require('jsonwebtoken');

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
    /*On remet la même logique que dans le middleware d'authentification 
    pour récupérer le userId qui est dans le token*/

    //Récupère dans authorization tout ce qui vient après l'espace, donc après "bearer"
    const token = req.headers.authorization.split(' ')[1];
    //On décode le token grâce à verify de jwt en vérifiant qu'il corresponde
    //à la clef secrète présente la fonction login
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    //On extraie l'ID utilisateur du token
    const userId = decodedToken.userId;
    //On cherche à vérifier grâce à findOne() si on trouve une sauce ayant le même 
    //userId que celui extrait du token
    var checkUserId = Sauce.findOne({
        where: {
            userId: userId
        }
    });

    console.log("checkUserId", checkUserId);

    //Si if(checkUserId) renvoie true alors on peut modifier la sauce 
    if (checkUserId) {
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
    } else {
        res.status(401).json({
            error: new Error("Invalid request !")
        });
    }
};

//Logique utilisée pour la suppression d'une sauce dans routes/sauces.js
exports.deleteSauce = (req, res, next) => {
    /*On remet la même logique que dans le middleware d'authentification 
    pour récupérer le userId qui est dans le token*/

    //Récupère dans authorization tout ce qui vient après l'espace, donc après "bearer"
    const token = req.headers.authorization.split(' ')[1];
    //On décode le token grâce à verify de jwt en vérifiant qu'il corresponde
    //à la clef secrète présente la fonction login
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    //On extraie l'ID utilisateur du token
    const userId = decodedToken.userId;
    //On cherche à vérifier grâce à findOne() si on trouve une sauce ayant le même 
    //userId que celui extrait du token
    var checkUserId = Sauce.findOne({
        where: {
            userId: userId
        }
    });

    console.log("checkUserId", checkUserId);

    //Si if(checkUserId) renvoie true alors on peut modifier la sauce 
    if (checkUserId) {
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
    } else {
        res.status(401).json({
            error: new Error("Invalid request !")
        });
    }
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


//Logique utilisée pour liker ou disliker les sauces dans routes.sauces.js
exports.likeOrDislike = (req, res, next) => {
    //Si on like la sauce
    if (req.body.like === 1) {
        //On utilise la méthode updateOne sur la Sauce
        Sauce.updateOne({
                //On y ajoute l'id de la sauce
                _id: req.params.id
            }, {
                //On incrémente (fonction de MongoDB) directement dans l'array
                $inc: {
                    //On incrémente de +1
                    likes: 1
                },
                //On va pusher (ajouter ,fonction de MongoDB) directement dans l'array
                $push: {
                    //On push l'userId
                    usersLiked: req.body.userId
                }
            })
            //Envoie une requête réussie
            .then(() => res.status(201).json({
                message: "Sauce likée !"
            }))
            //Renvoie une erreur
            .catch(error => res.status(400).json({
                error
            }));
    }

    //Si on dislike la sauce
    if (req.body.like === -1) {
        //On utilise la méthode updateOne sur la Sauce
        Sauce.updateOne({
                //On y ajoute l'id de la sauce
                _id: req.params.id
            }, {
                //On incrémente (fonction de MongoDB) directement dans l'array
                $inc: {
                    //On incrémente de +1
                    dislikes: 1
                },
                //On va pusher (ajouter, fonction de MongoDB) directement dans l'array
                $push: {
                    //On push l'userId
                    usersDisliked: req.body.userId
                }
            })
            //Envoie une requête réussie
            .then(() => res.status(201).json({
                message: "Sauce dislikée !"
            }))
            //Renvoie une erreur
            .catch(error => res.status(400).json({
                error
            }));
    }

    //On va vérifier si l'utilisateur a déjà liké ou disliké la sauce pour qu'il ne puisse pas le faire 2 fois
    if (req.body.like === 0) {
        //On va trouver la sauce avec findOne
        Sauce.findOne({
                _id: req.params.id
            })
            .then((sauce) => {
                //Vérifie dans le tableau usersLiked si il contient le userId avec la méthode includes qui renvoie true *
                //si il le contient
                if (sauce.usersLiked.includes(req.body.userId)) {
                    //On utilise la méthode updateOne sur la Sauce
                    Sauce.updateOne({
                            _id: req.params.id
                        }, {
                            //On incrémente (fonction de MongoDB) directement dans l'array
                            $inc: {
                                //On incrémente de -1
                                likes: -1
                            },
                            //On va puller (retirer, fonction de MongoDB) directement dans l'array
                            $pull: {
                                //On pull l'userId
                                usersLiked: req.body.userId
                            }
                        })
                        //Envoie une requête réussie
                        .then(() => res.status(200).json({
                            message: "Le like a été annulé !"
                        }))
                        //Renvoie une erreur
                        .catch(error => res.status(400).json({
                            error
                        }));
                }
                //Vérifie dans le tableau usersDisliked si il contient le userId avec la méthode includes qui renvoie true *
                //si il le contient
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    //On utilise la méthode updateOne sur la Sauce
                    Sauce.updateOne({
                            _id: req.params.id
                        }, {
                            //On incrémente (fonction de MongoDB) directement dans l'array
                            $inc: {
                                //On incrémente de -1
                                dislikes: -1
                            },
                            //On va puller (retirer, fonction de MongoDB) directement dans l'array
                            $pull: {
                                //On pull l'userId
                                usersDisliked: req.body.userId
                            }
                        })
                        //Envoie une requête réussie
                        .then(() => res.status(200).json({
                            message: "Le dislike a été annulé !"
                        }))
                        //Renvoie une erreur
                        .catch(error => res.status(400).json({
                            error
                        }));
                }
            })
    }
};