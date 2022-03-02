const express = require("express");
const { render } = require("ejs");
const path = require("path");

//INICIALIZAMOS EXPRESS
const app = express();

app.set("port", process.env.PORT || 3000);
//decirle al server donde estaran las vistas
app.set("views", path.join(__dirname + "/views")); 
//dcirle al server que extencion usaran las vistas
app.engine("html", require("ejs").renderFile);
//decirle al server que motor de plantilla usara
app.set("view engine", "ejs");

//para recibir objetos json mediante post
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//archivos publicos
app.use(express.static(path.join(__dirname + "/public")));

//controladores (manejadores) de rutas
app.use(require("./routes/index"));
app.use(require("./routes/facturacion"));
app.use(require("./routes/productos"));
app.use(require("./routes/categorias"));
app.use(require("./routes/reportes"));
app.use(require("./routes/marcas"));
app.use(require("./routes/transacciones"));

app.listen(app.get("port"));

