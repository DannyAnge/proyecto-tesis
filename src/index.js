const express = require("express")
const { render } = require("ejs");
const path = require('path')

//INICIALIZAMOS EXPRESS
const app = express();

app.set("port", process.env.PORT || 3000);
//decirle al server donde estaran las vistas
app.set("views", path.join(__dirname + "/views"));//C://xampp/htdocs/practicas/clases-danny/src/views
//dcirle al server que extencion usaran las vistas
app.engine("html", require("ejs").renderFile);
//decirle al server que motor de plantilla usara
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//archivos publicos
app.use(express.static(path.join(__dirname + "/public")));

app.use(require('./route/index'))


app.listen(app.get("port"))