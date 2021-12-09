// 3. Importando express
// $ npm i express -S
import Express from 'express'

import path from 'path'

import router from './routes/admin.route.js';

// Importar enrutadores
import adminRoute from './routes/admin.route.js'
import homeRoute from './routes/home.route.js'

console.log(`Variable de entorno: ${process.env.NODE_ENV}`);

// Crear una instancia de Express
const app = Express();

// 1. Insertando Middleware para la lectura de datos desde un cliente
app.use(Express.urlencoded({extended: false}));

// Loggin de peticiones
app.use((req,_,next)=>{
    console.log(`📞 Se ha realizado la petición: "${req.method} : ${req.path}"`);
    next();

});

// Se agrega a la aplicación de la ruta admin
app.use('/admin', adminRoute);
// Se agrega a la aplicacion de la ruta home
app.use(homeRoute);

// 404 error page
router.get((req, res, next)=>{
    const filePath = path.join(path.resolve(), "server", "views", "404.html")
    res.status(404).sendFile(filePath);
});

// Poniendo a escuchar la app de express
app.listen(3000, '0.0.0.0',() => {
    console.log("Servidor escuchando en http://0.0.0.0:3000");
});

