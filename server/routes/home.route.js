// Importando el enrutador de Express
import { request, Router } from "express";

import path from 'path'

import { ROOT_DIR } from "../helpers/path.helper.js";


// 2 Crear una instancia del enrutador
const router = Router();

// 3 Registrar rutas a mi enrutador
router.get('/about',(_, res)=>{
    const filePath= path.join(ROOT_DIR, "server", "views", "about.html")
    res.sendFile(filePath);
});

// La ruta raiz entra en todo tipo de petición
router.get(['/','/home'],(_, res)=>{
    const filePath= path.join(ROOT_DIR, "server", "views", "shop.html");
    res.sendFile(filePath);
});

// Exportando el router de la subruta de admin
export default router;
