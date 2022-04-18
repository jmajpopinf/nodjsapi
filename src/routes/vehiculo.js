const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const vehiculo = require("../models/vehiculo");
const usuario = require("../models/user");
const marca = require("../models/marca");
//const vehiculoSchema = require("../models/vehiculo");
//const userSchema = require("../models/user");
//const marcaSchema = require("../models/marca");


//busqueda con relaciones


//crear vehiculo
router.post("/vehiculos", (req, res) => {
    const vehiculoH = vehiculo(req.body);
    vehiculoH
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
    
});


router.get("/vehiculos", (req, res) => {
    vehiculo
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));

    
});

//GET POR ID USUARIO JOIN
router.get("/vehiculos/:id", (req, res) => {
    const { id } = req.params;
    vehiculo.find({ idUsuario: id})
    .populate("idUsuario")//nombre del campo relacionado
    .populate("idMarca")//nombre del campo relacionado
    .then((dbVehiculos) => res.json(dbVehiculos))
    .catch((error) => res.json({ message: error}));
    
});


//REPORTE 1
router.get("/reporte1", (req, res) => {

    vehiculo.aggregate(
        [
            {$match:{estado:'0'}},
            {$group:{_id:{idMarca: "$idMarca"},cantidad:{$sum:1},total:{$sum:'$costo'}}},
            {$sort:{total: -1}},
            {$lookup:{
              from: 'marcas',
              localField: '_id.idMarca',//campo del resultado que obtenemos del group
              foreignField: '_id',
              as: 'marcas' }
             },
        ]
       )

    .then((consulta) => res.json(consulta))
    .catch((error) => res.json({ message: error}));

});

//REPORTE 2
router.get("/reporte2", (req, res) => {

    vehiculo.aggregate(
        [
            {$match:{estado:'1'}},
            {$group:{_id:{idMarca: "$idMarca"},cantidad:{$sum:1},total:{$sum:'$costo'}}},
            {$sort:{total: -1}},
            {$lookup:{
              from: 'marcas',
              localField: '_id.idMarca',//campo del resultado que obtenemos del group
              foreignField: '_id',
              as: 'marcas' }
             },
        ]
       )

    .then((consulta) => res.json(consulta))
    .catch((error) => res.json({ message: error}));

});


//REPORTE 3
router.get("/reporte3", (req, res) => {

    vehiculo
    .find({})
    .populate("idUsuario")//nombre del campo relacionado
    .populate("idMarca")//nombre del campo relacionado
    .sort({costo:-1})
    .then((consulta) => res.json(consulta))
    .catch((error) => res.json({ message: error}));

});

//REPORTE 4 PROBANDO LOOKUP- SOLO PRUEBAS
router.get("/reporte4", (req, res) => {

    vehiculo.aggregate(
        [
            {$match:{estado:'1'}},
            {$group:{_id:{idMarca: "$idMarca"},cantidad:{$sum:1},total:{$sum:'$costo'}}},
            {$sort:{total: -1}},
            {$lookup:{
              from: 'marcas',
              localField: '_id.idMarca',//campo del resultado que obtenemos del group
              foreignField: '_id',
              as: 'marcas' }
             },
        ]
       )

    .then((consulta) => res.json(consulta))
    .catch((error) => res.json({ message: error}));

});


/*
router.get("/vehiculos/:id", (req, res) => {
    const { id } = req.params;
    vehiculo
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});
*/

router.put("/vehiculos/:id", (req, res) => {
    const { id } = req.params;
    const { idUsuario, idMarca, modelo, color, costo, fechaCompra, estado } = req.body;
    vehiculo
    .updateOne({ _id: id },{$set: { idUsuario, idMarca, modelo, color, costo, fechaCompra, estado }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

router.delete("/vehiculos/:id", (req, res) => {
    const { id } = req.params;
    vehiculo
    .remove({ _id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;

