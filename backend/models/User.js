//Appelle le package mongoose
const mongoose = require('mongoose');
//Appelle le package mongoose-unique-validator pour prévenir les erreurs 
//lorsque deux utilisateurs utilisent la même adresse email
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);