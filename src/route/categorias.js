const express = require("express");
const router = express.Router();

const {
  guardar,
  editar,
  getCategorias,
  actualizar,
  eliminar
} = require("../controllers/categorias.controller");

router.post("/categorias/guardar", guardar);

router.post("/categorias/getCategorias", getCategorias);

router.post("/categorias/editar", editar);

router.post('/categorias/actualizar',actualizar)

router.put('/categorias/eliminar',eliminar)

module.exports = router;
