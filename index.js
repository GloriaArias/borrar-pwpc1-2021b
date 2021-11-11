// 1. Importar el modulo http
import http from 'http';
import { parse } from 'path';

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
            res.write(`
            <html>
              <head>
                <title>Enter message</title>
                </head>
                <body>
                  <h1>Send Message</h1>
                 <form action = "/message" method= "POST">
                 <input type= "text" name="message">
                 <button type="submit">Send</button>
                 </form>
                 </body>
                 </html>
                 `);
            res.end();
        }
        else if(url === '/message' && method === "POST"){
            //1. Crea una variable para guardar los datos de entrada
            let body = [];
            //2. Registrar un manejador para la entrada de los datos
            req.on("data",(chunk)=>{
            //2.1 Registrando los trozos de datos que llegan al backend
            console.log(chunk);
            //2.2 Acumulo los datos de entrada
            body.push(chunk);
            //2.3 Protección en caso de recepción masiva de datos
            if(body.length > 1e6) req.socket.destroy();
        });
        //3. Registrando un manejador de fin de recepción de datos
        req.on('end' , ()=>{
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            console.log(`${parseBody}`);
            res.write(`
            
            <html>
              <head>
                <title>Received message</title>
                </head>
                <body>
                  <h1>Received Message</h1>
                  <p>Thank you!!!</p>
                  <p>The message we received was this: ${message}</p>
                 </body>
                 </html>
            `);
            //Finalizo conección
            return res.end();
        });
        }
        else if(url === '/author'){
             //Respuesta ante "Get /"
            // 1. Estableciendo el tipo de retorno como HTML
            res.setHeader('Content-Type', 'text/html');
            let url_image = 'https://avatars.githubusercontent.com/u/92901477?s=96&v=4';
            // 2. Escribiendo la respuesta
            res.write('<html>');
            res.write('<head><title>My App</title></head>');
            res.write('<body>');
            res.write('<h1>&#9889; Author &#9889;</h1>');
            res.write('<p>Gloria Arias Utrera</p>');
            res.write(`<img width="300px" src="${url_image}" alt="Foto Gloria Arias">`);
            res.write('</body>');
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
