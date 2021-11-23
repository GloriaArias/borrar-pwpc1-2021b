// 1. Importar el modulo http
import http from 'http';
// 2. Importando el module de routes
import routes from "./routes.js";
// 3. Importando express
import Express from 'express'

// Crear una instancia de Express
const app = Express();

// Registrando el primer middleware
app.use((req, res, next)=>{
    // Registrar un mensaje en el log
    console.log("Estoy en el middleware 1");
    // dar la instrucción de pasar al siguiente middleware
    next()
});

// Registrando el segundo middleware
app.use((req, res, next)=>{
    // Registrar un mensaje en el log
    console.log("Estoy en el middleware 2");
    // dar la instrucción de pasar al siguiente middleware
    next()
});

app.use((_, res)=>{
    // Registrar un mensaje en el log
    console.log("Estoy en el middleware 3");
    console.log("Emitiendo respuesta a cliente");
    res.send("<h1>Mi respuesta</h1>\n Hola");
});

// Poniendo a escuchar la app de express
app.listen(3000, '0.0.0.0',() => {
    console.log("Servidor escuchando en http://0.0.0.0:3000");
});

