const express = require("express");
const router = express.Router();

const { reporteDiario,getFacturas,getFactura } = require("../controllers/reportes.controller");

router.post("/reportes/ventaDiaria",reporteDiario);

router.post('/reportes/getFacturas',getFacturas)

router.post('/reportes/getFactura',getFactura)

module.exports = router;
