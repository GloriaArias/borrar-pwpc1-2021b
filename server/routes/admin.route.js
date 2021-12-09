// Importando el enrutador de Express
import { request, Router } from "express";

import path from 'path'

// 2 Crear una instancia del enrutador
const router = Router();

// 3 Registrar rutas a mi enrutador
// Sirve el formulario para agregar productos
// GET: admin/add-product

router.get('/add-product',(_, res)=>{
    const filePath = path.join(path.resolve(), "server", "views", "admin.html")
    res.sendFile(filePath);
});

// Procesa el formulario para agregar productos
// POST: admin/add-product
router.post('/add-product',(req, res)=>{
    // Desestructurando el body de la petición
    const { body } = req;
    // Respondiendo en JSON el body
    res.json(body);
});

// Exportando el router de la subruta de admin
export default router;