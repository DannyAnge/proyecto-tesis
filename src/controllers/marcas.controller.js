const conexion = require("../conexion");

const guardar = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    let save = await conexion.query("INSERT INTO marca set ?", [
      { nombre, descripcion },
    ]);
    res.send("Marca guadada con exito.");
  } catch (error) {
    console.log(error);
  }
};

const editar = async (req, res) => {};

const actualizar = async (req, res) => {};

const eliminar = async (req, res) => {};

const getMarcas = async (req, res) => {
  try {
    const { valor } = req.body;
    const marcas = await conexion.query(
      "SELECT * FROM marca WHERE nombre LIKE ? LIMIT 15",
      ["%" + valor + "%"]
    );
    res.send(marcas);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  guardar,
  editar,
  actualizar,
  eliminar,
  getMarcas,
};
