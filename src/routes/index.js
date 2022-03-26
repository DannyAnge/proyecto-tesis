const express = require("express");
const router = express.Router();
const { render } = require("ejs");
const conexion = require("../conexion");


router.get("/", (req, res) => {
  try {
    res.render("spa.html");
  } catch (error) {
    console.log(error);
  }
});

router.get('/inventario', (req, res) => {
  res.render("inventario.html")
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

router.get('/perfil', (req, res) => {
  res.render('perfil.html')
})

module.exports = router;
