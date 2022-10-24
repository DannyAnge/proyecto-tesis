const { render } = require("ejs");
const conexion = require("../conexion");

var detalles, comprador, fecha, numeroFactura;

const ultimaFactura = async (req, res) => {
  try {
    let proxima;
    const numeroFactura = await conexion.query(
      "SELECT MAX(id) AS numeroFactura FROM facturas"
    );
    if (numeroFactura[0].numeroFactura == null) {
      proxima = 1;
    } else {
      proxima = parseInt(numeroFactura[0].numeroFactura) + 1;
    }
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
    });
    res.send('');
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
    const { codigoBarra, cantidad } = req.body;
    const message = await venderCodigoBarra(codigoBarra, cantidad);
    if (message[0][0].message === "exito") {
      const producto = await conexion.query(
        "SELECT p.*,m.nombre AS nombreMarca FROM productos AS p INNER JOIN marca AS m ON(p.marca=m.id) WHERE p.codigoBarra = ?",
        [codigoBarra]
      );
      res.send(producto);
    } else {
      res.send({ message: message[0][0].message })
    }
  } catch (error) {
    console.log(error);
  }
};

const venderCodigoBarra = async (producto, cantidad) => {
  let message;
  try {
    message = await conexion.query("call venderCodigoBarra(?,?)", [producto, cantidad]);
  } catch (error) {
    console.log(error);
  }
  return message;
};

const venderId = async (req, res) => {
  try {
    const { producto, cantidad } = req.body;
    const message = await conexion.query("call venderId(?,?)", [producto, cantidad]);
    res.send(message);
  } catch (error) {
    console.log(error);
  }
};

const agregarProductoInventario = async (req, res) => {
  try {
    const { producto, cantidad } = req.body;
    await conexion.query("CALL agregarInventario(?,?)", [producto, cantidad])
    res.send('');
  } catch (error) {
    console.log(error)
  }
}

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
  ticket,
  venderId,
  agregarProductoInventario
};
