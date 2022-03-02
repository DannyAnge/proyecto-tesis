const express = require("express");
const router = express.Router();

const {
  ultimaFactura,
  guardarFactura,
  buscarPorNombre,
  desminuirStock,
  getProducto,
} = require("../controllers/facturacion.controller");

router.get("/facturacion/ultimaFactura", ultimaFactura);
router.post("/facturacion/guardar", guardarFactura);
router.post("/facturacion/busquedaPorNombre", buscarPorNombre);
router.post("/facturacion/getProducto", getProducto);
router.post("/facturacion/disminuirStock", desminuirStock);

module.exports = router;
