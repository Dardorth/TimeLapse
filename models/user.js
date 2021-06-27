const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
 
//Esquema de la tabla Usuario
const userSchema = new Schema({
    name: String,
    lastname: String,
    age: {
        type: Number,
        default: 22
    },
    user: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cursos: {
        type: Array,
        default: []
    }
})
/* const userSchema = new Schema({
    user: String,
    password: String
}) */

//Encriptar contraseña
userSchema.methods.encrypthPassword = (password) =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}

//Comparar contraseña ingresada por el usuario
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports =  mongoose.model('users',userSchema);
