// 3. Importando express
// $ npm i express -S
import Express from 'express'
import path from 'path'

// Importando motor de plantillas
import { engine } from "express-handlebars";

// Creando la instancia
const hbsTemplateEngine = engine({
    extname: ".hbs",
    defaultLayout: "main",
});

import { ROOT_DIR } from './helpers/path.helper.js';

// Importar enrutadores
import { router as adminRoute } from './routes/admin.route.js';
import homeRoute from './routes/home.route.js';

console.log(`Variable de entorno: ${process.env.NODE_ENV}`);

// Crear una instancia de Express
const app = Express();

// Registro el motor de las plantillas
app.engine('hbs',hbsTemplateEngine);

//Seleccionar en la app el motor a utilizar
app.set("view engine","hbs");

// Establecer las rutas de las vistas
app.set('views', path.join(ROOT_DIR, 'server','views'));

// 1. Insertando Middleware para la lectura de datos desde un cliente
app.use(Express.urlencoded({extended: false}));

// Loggin de peticiones
app.use((req,_,next)=>{
    console.log(`📞 Se ha realizado la petición: "${req.method} : ${req.path}"`);
    next();

});

// Registrando el middeware que maneja el servicio de archivos estáticos
app.use(Express.static(path.join(ROOT_DIR, 'public')));

// Se agrega a la aplicación de la ruta admin
app.use('/admin', adminRoute);
// Se agrega a la aplicacion de la ruta home
app.use(homeRoute);

// 404 error page
app.use((req, res, next)=>{
    // DRY --> Don't repeat yourself
    console.log("💔 Sirviendo recurso: 'not-found.html'");
    res.render("not-found");
});

// Poniendo a escuchar la app de express
app.listen(3000, '0.0.0.0',() => {
    console.log("Servidor escuchando en http://0.0.0.0:3000");
});

