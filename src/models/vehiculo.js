const mongoose = require("mongoose");

const vehiculoSchema = mongoose.Schema({
    idUsuario: {type: mongoose.Types.ObjectId, ref:"usuario"}, //"usuario" hace referencia a la coleccion
    idMarca: {type: mongoose.Types.ObjectId, ref:"marca"},//"marca" hace referencia a la coleccion
    modelo: {type: String},
    color: {type: String},
    precio: {type: Number},
    fechaCompra: {type: Date},
    estado: {type: String}
});

const vehiculo = mongoose.model('vehiculo', vehiculoSchema);

module.exports = vehiculo;

//module.exports = mongoose.model('vehiculo', vehiculoSchema);