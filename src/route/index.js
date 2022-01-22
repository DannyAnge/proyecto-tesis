const express = require("express");
const router = express.Router();
const { render } = require("ejs");
const conexion = require("../conexion");
const { guardarFactura } = require('../controllers/facturacionController')

router.get("/", (req, res) => {
  try {
    res.render("inventario.html");
  } catch (error) {}
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

router.get('/edicionFactura',(req,res)=>{
  res.render('edicionFactura.html')
})

router.post("/guardarProductos", async (req, res) => {
  try {
    const {
      codigoBarra,
      nombre,
      precioCompra,
      monedaVenta,
      precioVenta,
      monedaCompra,
      stock,
      categoria,
      marca,
      descripcion,
      precioMinimo,
      utilidad,
      fechaVencimiento,
    } = req.body;
    let newUser = {
      CodigoBarra: codigoBarra,
      nombre: nombre,
      precioCompra: parseFloat(precioCompra),
      monedaCompra: monedaCompra,
      PrecioVenta: precioVenta,
      monedaVenta: monedaVenta,
      stock: stock,
      Categoria: categoria,
      marca: marca,
      descripcion: descripcion,
      PrecioMinimo: parseFloat(precioMinimo) ,
      utilidad: utilidad,
      fechaVencimiento: fechaVencimiento,
    };
    await conexion.query("INSERT INTO productos set ?", [newUser]);
    res.send("Productos guardados con exito");
  } catch (error) {
    console.log(error);
  }
});

router.post("/actualizarProducto", async (req, res) => {
  try {
    const {
      codigoBarra,
      nombre,
      precioCompra,
      monedaCompra,
      precioVenta,
      monedaVenta,
      stock,
      categoria,
      marca,
      descripcion,
      PrecioMinimo,
      utilidad,
      fechaVencimiento,
      id
    } = req.body;


    await conexion.query(
      `UPDATE productos SET codigoBarra = ?, nombre = ?, precioCompra = ?,monedaCompra = ?, precioVenta = ?,monedaVenta = ?, stock = ?, categoria = ?, marca = ?, descripcion = ?, precioMinimo = ?,utilidad = ?,fechaVencimiento=? WHERE id = ?`,
      [
        CodigoBarra,
        nombre,
        PrecioCompra,
        monedaCompra,
        PrecioVenta,
        monedaVenta,
        stock,
        Categoria,
        marca,
        descripcion,
        PrecioMinimo,
        utilidad,
        FechaVencimiento,
        id
      ]
    );
    res.send("Productos actualizado con exito");
  } catch (error) {
    console.log(error);
  }
});

router.post("/editarProducto", async (req, res) => {
  try {
    const { producto } = req.body;
    let infoProducto = await conexion.query(
      "SELECT * FROM productos WHERE id = ?",
      [producto]
    );
    res.send(infoProducto);
  } catch (error) {
    console.log(error);
  }
});

router.get("/mostrarProductos", async (req, res) => {
  try {
    const productos = await conexion.query(
      "SELECT * FROM productos ORDER BY id DESC LIMIT 20"
    );
    res.send(productos);
  } catch (error) {
    console.log(error);
  }
});

router.post("/getProducto", async (req, res) => {
  try {
    const { codigoBarra } = req.body;
    const producto = await conexion.query(
      "SELECT * FROM productos WHERE codigoBarra = ?",
      [codigoBarra]
    );
    res.send(producto);
  } catch (error) {
    console.log(error);
  }
});

router.post('/disminuirStock',async(req,res)=>{
  try {
    const{id,cantidad} = req.body;
    await conexion.query("call venderProductoStock(?,?)",[id,cantidad]);
    res.send('');
  } catch (error) {
    console.log(error)
  }
})

router.post('/eliminarProducto',async(req,res)=>{
  try {
    const {producto} = req.body;
    await conexion.query("DELETE FROM productos WHERE id = ?",[producto]);
  } catch (error) {
    console.log(error)
  }
  res.send("producto eliminado con exito.");
});

router.post("/guardarCategoria",async(req,res)=>{
  try {
    const {nombre,descripcion} = req.body;
    await conexion.query("INSERT INTO categorias set ?",[{nombre,descripcion}])

  } catch (error) {
    console.log(error)
  }
  res.send("Categoria guardada cpon exito..");
});

router.get('/getCategorias',async(req,res)=>{
  let data;
  try {
    data = await conexion.query("SELECT * FROM categorias ORDER BY id DESC");
  } catch (error) {
    console.log(error);
  }
  res.send(data);
})

router.post('/editarCategoria',async(req,res)=>{
  try {
    let categoria = req.body.id;
    const info = await conexion.query("SELECT * FROM categorias WHERE id = ?",[categoria])
    res.send(info)
  } catch (error) {
    console.log(error);
  }
})

router.get('/ultimaFactura',async(req,res)=>{
  try {
    let proxima;
    const numeroFactura = await conexion.query("SELECT MAX(id) AS numeroFactura FROM facturas");
    proxima = parseInt(numeroFactura[0].numeroFactura) + 1;
    res.send(proxima.toString())
  } catch (error) {
    console.log(error)
  }
})

router.post('/guardarFactura',async(req,res)=>{
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
});

router.post('/busquedaPorNombre',async(req,res)=>{
  try {
    const {dato} = req.body;
    const list = await conexion.query("SELECT * FROM productos WHERE nombre LIKE ?",["%"+dato+"%"])
    res.send(list)
  } catch (error) {
    console.log(error)
  }
})

router.post('/getVentaDiaria',async(req,res)=>{
  try {
    const {fecha} = req.body;
    let venta;
    let getVenta = await conexion.query("SELECT SUM(totalCordobas) AS total FROM facturas WHERE fecha = ?",[fecha])
    if(getVenta[0].total !== null){
      venta = parseFloat(getVenta[0].total).toFixed(2)
      venta = venta.toString()
    }else{
      venta = "0.00";
    }
    console.log(venta)
    res.send(venta);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;