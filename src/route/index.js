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

router.get('/facturacion',(req,res)=>{
  res.render("facturacion.html")
})

router.get('/reportes',(req,res)=>{
  res.render("reportes.html");
})

router.get('/usuarios',(req,res)=>{
  res.render('usuarios.html')
})

router.get('/transacciones',(req,res)=>{
  res.render('transacciones.html')
})

router.get('/ajustes',(req,res)=>{
  res.render('ajustes.html')
})
module.exports = router;
