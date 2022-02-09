const express = require("express");
const router = express.Router();

const {guardar,editar,actualizar,getProductos,eliminar,getCategorias,getMarcas,isExisteCodBarra} = require('../controllers/productos.controller')

router.post("/productos/guardar", guardar);

router.post("/productos/actualizar", actualizar);

router.post("/productos/editar", editar);

router.post("/productos/getProductos", getProductos);

router.post("/productos/eliminar", eliminar);

router.get('/productos/getCategorias',getCategorias)

router.get('/productos/getMarcas',getMarcas)

router.post('/productos/codBarra',isExisteCodBarra)

module.exports = router;
