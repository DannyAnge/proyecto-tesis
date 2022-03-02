const express = require("express");
const router = express.Router();
const { render } = require("ejs");
const conexion = require("../conexion");


router.get("/", (req, res) => {
  try {
    res.render("inventario.html");
  } catch (error) {
    console.log(error);
  }
});

router.get('/facturacion', (req, res) => {
  res.render("facturacion.html")
})

router.get('/reportes', (req, res) => {
  res.render("reportes.html");
})

router.get('/usuarios', (req, res) => {
  res.render('usuarios.html')
})

router.get('/transacciones', (req, res) => {
  res.render('transacciones.html')
})

router.get('/ajustes', (req, res) => {
  res.render('ajustes.html')
})

router.get('/ticket', async(req, res) => {
  try {
     let detalles = await conexion.query("SELECT d.cantidadProducto,p.nombre,d.totalVenta FROM detalleFactura AS d INNER JOIN productos AS p ON(d.producto=p.id) WHERE d.factura = (SELECT MAX(id) FROM facturas)"); 
    res.render('ticket.html',{detalles:detalles});
  } catch (error) {
   console.log(error) 
  }
})
module.exports = router;
