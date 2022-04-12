const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    usuario: {type: String, required: true},
    nombre: {type: String, required: true},
    edad: {type: Number, required: true},
    genero: {type: String, required: true},
    cargo: {type: String, required: true},
    contrasena: {type: String, required: true},
    fechaRegistro: {type: Date, required: true}
});

const usuario = mongoose.model('usuario', userSchema);

module.exports = usuario;

//module.exports = mongoose.model('usuario', userSchema);