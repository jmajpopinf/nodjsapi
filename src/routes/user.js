const express = require("express");
const userSchema = require("../models/user")
const router = express.Router();

//crear usuario
router.post("/usuarios", (req, res) => {
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));

});

router.get("/usuarios", (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data)) //promesa
    .catch((error) => res.json({ message: error}));

});



router.get("/usuarios", (req, res) =>{
    const user = req.query.usuario;
    const pass = req.query.contrasena;

    userSchema
    .findOne({ usuario: user, contrasena: pass })
    .then((data) => res.json(data)) //promesa
    .catch((error) => res.json({ message: error}));

});

router.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data)) //promesa
    .catch((error) => res.json({ message: error}));

});

router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { usuario, nombre, edad, genero, cargo, contrasena, fechaRegistro } = req.body;
    userSchema
    .updateOne({ _id: id }, {$set: { usuario, nombre, edad, genero, cargo, contrasena, fechaRegistro } })
    .then((data) => res.json(data)) //promesa
    .catch((error) => res.json({ message: error}));

});

router.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    userSchema
    .remove({ _id: id })
    .then((data) => res.json(data)) //promesa
    .catch((error) => res.json({ message: error}));

});

module.exports = router;