const mongoose = require("mongoose");

const vehiculoSchema = mongoose.Schema({
    idUsuario: {type: mongoose.Types.ObjectId, ref:"usuario"}, //"usuario" hace referencia a la coleccion
    idMarca: {type: mongoose.Types.ObjectId, ref:"marca"},//"marca" hace referencia a la coleccion
    modelo: {type: String},
    color: {type: String},
    costo: {type: Number},
    fechaCompra: {type: Date, default: Date.now},
    estado: {type: String, default: '1'}
});

const vehiculo = mongoose.model('vehiculo', vehiculoSchema);

module.exports = vehiculo;

//module.exports = mongoose.model('vehiculo', vehiculoSchema);