// 1. Importar el modulo http
import http from 'http';

// 2. Crear el servidor
//cb es una *función* que se ejecutará
//ante cualquier petición de un recurso a nuestro server
//(request, response)
    const server = http.createServer((req, res)=>{
        //Obteniendo el recurso solicitado
        let{ url, method } = req;

        //Informa en la consola del servidor que se recibe una petición 
        console.log(`Se ha solicitado el siguiente recurso: ${method}: ${url}`);

        //filtrar url
        if(url === '/'){
            //Respuesta ante "Get /"
            // 1. Estableciendo el tipo de retorno como HTML
            res.setHeader('Content-Type', 'text/html');
            // 2. Escribiendo la respuesta
            res.write('<html>')
            res.write('<head><title>My App</title></head>');
            res.write('<body><h1>&#9889; Hello from my server &#9889;</h1></body>')
            res.write('</html>');
            res.end();

        }else{
            //Se registra el Recurso no encontrado
            console.log(`No se ha encontrado el recurso: ${url}`);
            //Recuerso no encontrado 
             // 1. Estableciendo el tipo de retorno como HTML
             res.setHeader('Content-Type', 'text/html');
             // 2. Escribiendo la respuesta
             res.write('<html>')
             res.write('<head><title>My App</title></head>');
             res.write('<body><h1>Error: 404 - Recurso no encontrado &#9940;</h1></body>')
             res.write('</html>');
             res.end();     
        }
    });
   
// 3. Pongo a trabajar el servidor
//le paso un callback que escribira en la consola
//cuando el servidor este escuchando
//192.168.56.1
server.listen(3000, '0.0.0.0',()=>{
    console.log("Servidor escuchando en http://0.0.0.0:3000");
});
