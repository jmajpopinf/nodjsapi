const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const marcaRoutes = require("./routes/marca");
const vehiculoRoutes = require("./routes/vehiculo");

const app = express();
const port = process.env.PORT || 9000;

//midleware
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes, marcaRoutes, vehiculoRoutes);


app.get("/", (req, res) =>{
    res.send("bienvenido a la api de carrito veloz");
});

//conexion a la bd mongodb
mongoose
    .connect('mongodb://localhost/carritoveloz')
    .then(() => console.log("conectado a la bd"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('servidor corriento por el puerto', port));



