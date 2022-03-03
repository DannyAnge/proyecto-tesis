const { render } = require("ejs");
const conexion = require("../conexion");

var detalles, comprador, fecha, numeroFactura;

const ultimaFactura = async (req, res) => {
  try {
    let proxima;
    const numeroFactura = await conexion.query(
      "SELECT MAX(id) AS numeroFactura FROM facturas"
    );
    proxima = parseInt(numeroFactura[0].numeroFactura) + 1;
    res.send(proxima.toString());
  } catch (error) {
    console.log(error);
  }
};

const guardarFactura = async (req, res) => {
  try {
    detalles = req.body.detalles;
    comprador = req.body.comprador;
    fecha = req.body.fecha;
    numeroFactura = req.body.detalles[0].factura;
    let factura = {
      nombre_comprador: req.body.comprador,
      fecha: req.body.fecha,
      tipoVenta: req.body.formaPago,
      totalFactura: req.body.total,
    };
    await conexion.query("INSERT INTO facturas set ?", [factura]);
    req.body.detalles.map(async (d) => {
      await conexion.query("INSERT INTO detalleFactura set ?", {
        factura: d.factura,
        producto: d.producto,
        precioProducto: d.precioProducto,
        cantidadProducto: d.cantidadProducto,
        totalVenta: d.totalVenta
      });
      await conexion.query("CALL venderProductoStock(?,?)", [d.producto, d.cantidadProducto]);
    });
    res.send("exito..");
  } catch (error) {
    console.log(error);
  }
};

const buscarPorNombre = async (req, res) => {
  try {
    const { dato } = req.body;
    const list = await conexion.query(
      "SELECT * FROM productos WHERE nombre LIKE ?",
      ["%" + dato + "%"]
    );
    res.send(list);
  } catch (error) {
    console.log(error);
  }
};

const getProducto = async (req, res) => {
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
};

const desminuirStock = async (req, res) => {
  try {
    const { id, cantidad } = req.body;
    await conexion.query("call venderProductoStock(?,?)", [id, cantidad]);
    res.send("");
  } catch (error) {
    console.log(error);
  }
};

const ticket = async (req, res) => {
  try {
    let perfil = await conexion.query("SELECT * FROM perfil");
    res.render("ticket.html", {
      detalles: detalles,
      comprador: comprador,
      fecha: fecha,
      factura: numeroFactura,
      perfil: perfil
    });
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  ultimaFactura,
  guardarFactura,
  buscarPorNombre,
  getProducto,
  desminuirStock,
  ticket
};
