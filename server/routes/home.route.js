// Importando el enrutador de Express
import { request, Router } from "express";

import path from 'path'

import { ROOT_DIR } from "../helpers/path.helper.js";

// Importando el acceso a los datos
import  { products } from './admin.route.js'


// 2 Crear una instancia del enrutador
const router = Router();

// 3 Registrar rutas a mi enrutador
router.get('/about',(_, res)=>{
    const filePath= path.join(ROOT_DIR, "server", "views", "about.html")
    res.sendFile(filePath);
});

// La ruta raiz entra en todo tipo de petición
router.get(['/','/home'],(_, res)=>{
    console.log(`📜 Inventario de Productos: ${JSON.stringify(products)}`);
    console.log("Sirviendo recurso: 'shop.html");
    res.render('shop');
});

// Exportando el router de la subruta de admin
export default router;

