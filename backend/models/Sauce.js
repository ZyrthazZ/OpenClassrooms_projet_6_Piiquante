//Appel de mongoose pour utiliser plus loin sa fonction Schema
const mongoose = require('mongoose');

//Création d'un Schema (model) pour les sauces
const sauceSchema = mongoose.Schema({
    //Le userId utilisé lors de la création de la sauce, pour que seul son propriétaire puisse la modifier
    userId: {
        type: String,
        required: true
    },
    //Le nom de la sauce
    name: {
        type: String,
        required: true
    },
    //Le fabriquant de la sauce
    manufacturer: {
        type: String,
        required: true
    },
    //Une description de la sauce
    description: {
        type: String,
        required: true
    },
    //Le principal ingrédient épicé de la sauce
    mainPepper: {
        type: String,
        required: true
    },
    //L'URL menant à l'image de la sauce
    imageUrl: {
        type: String,
        required: true
    },
    //L'intensité de la sauce, de 0 à 10
    heat: {
        type: Number,
        required: true
    },
    //Le nombre de likes que la sauce a reçu
    likes: {
        type: Number
    },
    //Le nombre de dislikes que la sauce a reçu
    dislikes: {
        type: Number
    },
    //Un tableau contenant les userId des utilisateurs ayant liké la sauce
    usersLiked: {
        type: [String]
    },
    //Un tableau contenant les userId des utilisateurs ayant disliké la sauce
    usersDisliked: {
        type: [String]
    }
});

module.exports = mongoose.model("Sauce", sauceSchema);