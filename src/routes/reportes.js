const express = require("express");
const router = express.Router();

const { reporteDiario,getFacturas,getFactura,getDetallesFactura,devoluciones } = require("../controllers/reportes.controller");

router.post("/reportes/ventaDiaria",reporteDiario);

router.post('/reportes/getFacturas',getFacturas)

router.post('/reportes/getFactura',getFactura)

router.post('/reportes/getDetallesFactura',getDetallesFactura)

router.post('/reportes/devoluciones',devoluciones)

module.exports = router;
