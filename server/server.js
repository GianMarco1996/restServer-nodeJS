require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// bodyParser permite procesar la información y serializa en onj JSON para que sea procesada en las peticiones POST
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Configuración global de rutas
app.use(require('./routes/index'))

app.use(express.static(path.resolve(__dirname, '../public')));


mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT);
});