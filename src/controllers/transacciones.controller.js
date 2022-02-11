require("../conexion");

const guardar = async (req, res) => {
  try {
    const { fecha, tipoTransaccion, monto, anotaciones } = req.body;
    await conexion.query("INSERT INTO transacciones SET ?", [
      { fecha, tipoTransaccion, monto, anotaciones },
    ]);
    res.send("Movimiento realizado con exito.");
  } catch (error) {
    console.log(error);
  }
};

const editar = async (req, res) => {};

const actualizar = async (req, res) => {};

const eliminar = async (req, res) => {};

const mostrar = async (req, res) => {};

module.exports = {
  guardar,
  editar,
  actualizar,
  eliminar,
  mostrar,
};
