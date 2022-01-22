const express = require("express");
const router = express.Router();
const { render } = require("ejs");
const conexion = require("../conexion");

const guardarFactura = async(req,res)=>{
    try {
      let factura = {
        nombre_comprador : req.body.comprador,
        fecha : req.body.fecha,
        tipoVenta : req.body.formaPago,
        totalCordobas : req.body.total
      }
      await conexion.query("INSERT INTO facturas set ?",[factura]);
      req.body.detalles.map(
        async (d)=>{
          await conexion.query("INSERT INTO detalleFactura set ?", d)
        }
      )
      res.send("exito..")
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = {
      guardarFactura
  }