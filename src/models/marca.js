const mongoose = require("mongoose");

const marcaSchema = mongoose.Schema({
    descripcion: {type: String, required: true},
});

const marca = mongoose.model('marca', marcaSchema);

module.exports = marca;