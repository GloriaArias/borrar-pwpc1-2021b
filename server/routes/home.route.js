// Importando el enrutador de Express
import { request, Router } from "express";

// 2 Crear una instancia del enrutador
const router = Router();

// 3 Registrar rutas a mi enrutador
app.use('/about',(_, res)=>{
    res.send("<h1>Acerca de...</h1>\n Sitio inicial hecho con NodeJs");
});

// La ruta raiz entra en todo tipo de petición
app.use(['/','/home'],(_, res)=>{
    res.send("<h1>My APP</h1>\n Bienvenido a este sitio");
});

// Exportando el router de la subruta de admin
export default router;

