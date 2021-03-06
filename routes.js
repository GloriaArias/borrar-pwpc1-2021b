import fs from "fs";

const requestHandler = (req, res) => {
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

        //EjecutaOperacion(ARGS1,ARG2,ARG3, cb)
        //Suma2Numeros(1,2(res)=>{console.log(res)})
        /*
        1. let res = Suma2Numeros(1,2);
        2. console.log(res) //undefined
        */


        //3. Registrando un manejador de fin de recepción de datos
        req.on('end' , ()=>{
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            // Guardando el mensaje en un archivo
            fs.writeFile('message.txt',message, (err)=>{
                //Verificar si hubo error 
                if(err){
                    console.log("> No se pudo grabar el archivo");
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "text/html");
                    res.write("ERROR WHEN LOADING FILE");
                    return res.end();
                }
                // en caso de no haber error, establecer el status code de redireccionamiento
                //Establecer el status code
            res.statusCode = 302;
            //Establecer la ruta de direcciones
            res.setHeader('Location','/');
            //Finalizo conección
            return res.end();
            });
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
    };

    // Exportar el requestHandler
    export default {
        requestHandler
    };