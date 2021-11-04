//Importar el modulo http
import http from 'http';

//Crear el servidor
//cb es una *función* que se ejecutará
//ante cualquier petición de un recurso a nuestro server
//(request, response)
const server = http.createServer((req, res)=>{
    console.log("> Se ha recibido una petición.");
    //Registrar información de la petición
    console.log(`Información de la petición`);
    console.log(`url: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    //Establecer el tipo de contenido que se entregará al cliente
    res.setHeader('Content-Type','text/html');

    //Envío el contenido
    res.write("<html>");
    res.write("<head><title>My App</title></head>");
    res.write(`<body><h1>Hello from the server &#128519;
</h1><p style = "color:red">Recurso solicitado: ${req.url}</p></body>`);
    res.write('</html>');
    //Terminamos la conexión
    res.end();
});

// 3. Pongo a trabajar el servidor
//le paso un callback que escribira en la consola
//cuando el servidor este escuchando
//192.168.56.1
//192.168.0.31
//192.168.127.1
//192.168.126.1
//192.168.56.1

server.listen(3000, '192.168.56.1',()=>{
    console.log("Servidor escuchando en http://192.168.56.1:3000");
});
