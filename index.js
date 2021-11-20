// 1. Importar el modulo http
import http from 'http';
// 2. Importando el module de routes
import routes from "./routes.js";

// 2. Crear el servidor
//cb es una *función* que se ejecutará
//ante cualquier petición de un recurso a nuestro server
//(request, response)
    const server = http.createServer(routes.requestHandler);
   
// 3. Pongo a trabajar el servidor
//le paso un callback que escribira en la consola
//cuando el servidor este escuchando
//192.168.56.1
server.listen(3000, '0.0.0.0',()=>{
    console.log("Servidor escuchando en http://0.0.0.0:3000");
});
