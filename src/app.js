//IMPORTACIONES
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

//CONFIGURACION CORS
const frontUrlDes = '';
const localURL = 'http://localhost:5173'
const whitelist = [frontUrlDes, localURL];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.log('Origen bloqueado por CORS:', origin);
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
};

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//hacer configuracion del multer
// Servir archivos estáticos subidos (imágenes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

//ROUTES
app.use('/api/v1', require('./routes/auth.routes'));
app.use('/api/v1', require('./routes/user.routes'));
app.use('/api/v1', require('./routes/incidencia.routes'));
app.use('/api/v1', require('./routes/archivo.routes'));
app.use('/api/v1', require('./routes/maquina.routes'));
app.use('/api/v1', require('./routes/mantenimiento.routes'));
app.use('/api/v1', require('./routes/informe.routes'));


//LISTENERS
app.listen(port, ()=>{
    console.log(`Servidor activo en el puerto ${port} :)`);
})
