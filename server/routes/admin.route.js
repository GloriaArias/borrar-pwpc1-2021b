// Importando el enrutador de Express
import { request, Router } from "express";

import path from 'path'

import { ROOT_DIR } from "../helpers/path.helper.js";

// Base de Datos volatil
export const products = [];
// 2 Crear una instancia del enrutador
export const router = Router();

// 3 Registrar rutas a mi enrutador
// Sirve el formulario para agregar productos
// GET: admin/add-product

router.get('/add-product',(_, res)=>{
    console.log("Sirviendo recurso: 'admin.html'");
    res.render("admin");
});

// Procesa el formulario para agregar productos
// POST: admin/add-product
router.post('/add-product',(req, res)=>{
    // Desestructurando el body de la petición
    const { name } = req.body;
    // Guarda en la base de datos el nombre del producto
    products.push({name});
    // Redirecciono a la pantalla principal
    res.redirect('/');
});

// Exportando el router de la subruta de admin
//export default router;