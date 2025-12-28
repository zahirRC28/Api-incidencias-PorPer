//IMPORTACIONES
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(/* configurar luego*/));
//hacer configuracion del multer

//ROUTES
app.use('/api/v1', require('./routes/auth.routes'));
app.use('/api/v1', require('./routes/user.routes'));


//LISTENERS
app.listen(port, ()=>{
    console.log(`Servidor activo en el puerto ${port} :)`);
})
