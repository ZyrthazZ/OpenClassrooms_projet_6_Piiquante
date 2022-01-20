//Appel du package multer
const multer = require('multer');

//"Dictionnaire" pour les extensions de fichiers à gérer
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//Utilisation de la fonction diskStorage de multer pour indiquer qu'on va enregistrer les fichiers sur le disk
const storage = multer.diskStorage({
    //Argument nécessaire à la fonction diskStorage : destination pour indiquer où enregister les fichiers
    destination: (req, file, callback) => {
        //Argument null passé au callback pour indiquer qu'il n'y a pas d'erreur et 'images' pour spécifier le dossier d'enregistrement pour les fichiers
        callback(null, 'images')
    },
    //Argument nécessaire à la fonction diskStorage: filename pour indiquer le nom du fichier image à enregistrer) 
    filename: (req, file, callback) => {
        //Garde le nom du fichier d'origine mais en supprime les espaces pour les remplacer par des _ *
        //pour éviter de potentiels problèmes ou erreurs
        const name = file.originalname.split(' ').join('_');
        //Appel du dictionnaire pour gérer les extensions 
        const extension = MIME_TYPES[file.mimetype];
        //Création du nom de fichier : null pour indiquer qu'il n'y a pas d'erreur, on ajoute le nom du fichier, *
        //puis un timestamp pour l'heure à laquelle il est créé, puis un point '.', puis l'extension du fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

//On exporte le middleware multer en appelant le storage en argument, la méthode single pour indiquer *
//qu'il s'agit d'un fichier unique 
module.exports = multer({storage}).single('image');