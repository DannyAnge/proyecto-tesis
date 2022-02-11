const express = require("express");
const router = express.Router();

const {
  guardar,
  editar,
  actualizar,
  eliminar,
  mostrar,
} = require("../controllers/transacciones.controller");

router.post("/transacciones/guardar", guardar);
router.post("/transacciones/editar", editar);
router.put("/transacciones/actualizar", actualizar);
router.delete("/transacciones/eliminar", eliminar);
router.post("/transacciones/mostrar", mostrar);

module.exports = router;
