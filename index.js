// 1. Importar el modulo http
import http from 'http';
// 2. Importando el module de routes
import routes from "./routes.js";
// 3. Importando express
import Express from 'express'

// Crear una instancia de Express
const app = Express();

// 1. Insertando Middleware para la lectura de datos desde un cliente
app.use(Express.urlencoded({extended: false}));

// Loggin de peticiones
app.use((req,_,next)=>{
    console.log(`📞 Se ha realizado la petición: "${req.method} : ${req.path}"`);
    next();

});

// Se debe colocar primero ya que el orden de registro determina el orden de verificación
app.use('/about',(_, res)=>{
    // Registrar un mensaje en el log
    console.log('📞 Se ha realizado la petición: "/about"');
    res.send("<h1>Acerca de...</h1>\n Sitio inicial hecho con NodeJs");
});

// Sirviendo recurso de formulario
app.use('/add-student-form', (req, res, next)=>{
    res.send(`
    <form action="/add-student" method="POST">
    <label for="student-name">👩‍🎓 Student Name</label>
    <input type="text" name="name" id="student-name">
    <button type="submit">Add student</button>
    </form>
    `);
});

// Ruta que procesa el formulario
app.use('/add-student', (req, res, next) => {
    // Iterando sobre todo el objeto
    for(const prop in req.body){
        console.log(`🚩 ${prop}: ${req.body[prop]}`);
    }
    console.log(`🚩 Method: ${req.method}`);

    res.json(req.body);
    // Realizamos un redireccionamiento
    //res.redirect('/');
});

// La ruta raiz entra en todo tipo de petición
app.use(['/','/home'],(_, res)=>{
    // Registrar un mensaje en el log
    console.log('📞 Se ha realizado la petición: "/"');
    res.send("<h1>My APP</h1>\n Bienvenido a este sitio");
});

// Poniendo a escuchar la app de express
app.listen(3000, '0.0.0.0',() => {
    console.log("Servidor escuchando en http://0.0.0.0:3000");
});

