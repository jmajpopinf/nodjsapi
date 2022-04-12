const express = require("express");
const router = express.Router();
const marcaSchema = require("../models/marca");

//crear marca
router.post("/marcas", (req, res) => {
    const marca = marcaSchema(req.body);
    marca
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/marcas", (req, res) => {
    marcaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/marcas/:id", (req, res) => {
    const { id } = req.params;
    marcaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.put("/marcas/:id", (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    marcaSchema
    .updateOne({ _id: id },{$set: { descripcion }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/marcas/:id", (req, res) => {
    const { id } = req.params;
    marcaSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;

