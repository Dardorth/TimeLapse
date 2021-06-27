const Mongoose  = require('mongoose');

const cursosSchema = new Mongoose.Schema({
    _id: String,
    nombre: String,
    logo: String,
    precio: Number,
    categoria: String
})
Cursos = Mongoose.model('cursos',cursosSchema);
module.exports =Cursos;
