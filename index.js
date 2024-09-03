const express = require('express');
const mongoose = require('mongoose');
const tareasRoutes = require('./src/routes/tareas.routes');
require('dotenv').config();


// consiguración de express app
const app = express();

// aceptar datos en formato JSON
app.use(express.json());

// configuración de puerto para el servidor
const port = process.env.PORT || 3000;

// conexión a base de datos  
const dbString = 'mongodb+srv://'+process.env.DBNAME+':'+process.env.DBPASSWORD+'@clustertestdb.z45hbcu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTestDB'
mongoose.connect(dbString, {
    dbName: 'dblist_test'
});
const dbmongo = mongoose.connection
dbmongo.on('error', (error) =>{console.log(error);})
dbmongo.once('connected', () => {console.log('connected to the database');})


// acceso a todas las rutas
app.use('/tareas', tareasRoutes);

// iniciar servidor
app.listen(port, () => {console.log(`Server running, listen on port ${port}`);});