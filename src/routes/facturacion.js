const express = require("express");
const router = express.Router();

const {
  ultimaFactura,
  guardarFactura,
  buscarPorNombre,
  venderId,
  getProducto,
  ticket,
  agregarProductoInventario
} = require("../controllers/facturacion.controller");

router.get("/facturacion/ultimaFactura", ultimaFactura);
router.post("/facturacion/guardar", guardarFactura);
router.post("/facturacion/busquedaPorNombre", buscarPorNombre);
router.post("/facturacion/getProducto", getProducto);
router.get("/facturacion/ticket", ticket);
router.post('/facturacion/venderId', venderId)
router.post('/facturacion/agregarInventario', agregarProductoInventario)

module.exports = router;
