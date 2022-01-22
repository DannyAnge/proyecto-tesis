class Productos{
  constructor(){
    this.id;
    this.codigoBarra;
    this.nombre;
    this.precioCompra;
    this.monedaCompra;
    this.precioVenta;
    this.monedaVenta;
    this.precioMinimo;
    this.fechaVencimiento;
    this.stock;
    this.categoria;
    this.marca;
    this.descripcion;
    this.utilidad;
    this.form = document.getElementById("form");
  }

  getId(){
    return this.id;
  }

  setId(id){
    this.id = id;
  }

  validar(){
    console.log("hello");
    let datos = new FormData(form);
    this.codigoBarra = datos.get("codBarra")
    this.nombre = datos.get("nombre")
    this.precioCompra = datos.get("precioCompra")
    this.monedaCompra = datos.get('monedaCompra')
    this.precioVenta = datos.get("precioVenta")
    this.monedaVenta = datos.get("monedaVenta")
    this.stock = datos.get("cantidad")
    this.categoria = datos.get("categoria")
    this.marca = datos.get("marca")
    this.descripcion = datos.get("descripcion")
    this.PrecioMinimo = datos.get("precioMinimo")
    this.utilidad = datos.get("utilidad")
    this.FechaVencimiento = datos.get("Vencimiento")

    if(this.nombre === ""){
      return false
    }else if(this.stock === ""){
      return false
    }else if(this.precioVenta === ""){
      return false
    }else{
      return true
    }
  }

  guardar(){
    if(this.validar()){
    fetch('guardarProductos', {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        codigoBarra : this.codigoBarra,
        nombre : this.nombre,
        precioCompra : this.precioCompra,
        monedaCompra : this.monedaCompra,
        precioVenta : this.precioVenta,
        monedaVenta : this.monedaVenta,
        precioMinimo : this.precioMinimo,
        stock : this.stock,
        categoria : this.categoria,
        marca : this.marca,
        descripcion : this.descripcion,
        utilidad : this.utilidad,
        fechaVencimiento : this.fechaVencimiento
      }),
    })
      .then((message) => message.text())
      .then((message) => {
        alert(message);
        this.form.reset();
        this.mostrar();
      })
      .catch((err) => console.log(err));
    }
  }

  mostrar() {
    let template = "";
    fetch("/mostrarProductos")
      .then((productos) => productos.json())
      .then((productos) => {
        console.log(productos);
        productos.map((producto) => {
          template += `
                      <tr id='${producto.id}'>
                          <td>
                              <sapn class="icon-trash" style="color:red;cursor:pointer;margin-left:5px;" btn="eliminarProducto" data-toggle="tooltip" data-original-title="Eliminar"></span>
                              
                              <sapn class="fa fa-edit" style="color:blue;" btn="editarProducto" data-toggle="tooltip" data-original-title="Edit"></span>
                              
                          </td>
                          <td>${producto.codigoBarra}</td>
                          <td>${producto.nombre}</td>
                          <td>${producto.precioCompra}</td>
                          
                          <td>${producto.precioVenta}</td>
                          <td>${producto.precioMinimo}</td>
                          
                          <td>${moment(producto.fechaVencimiento).format(
                            "YYYY-MM-DD"
                          )}</td>
                          <td>${producto.stock}</td>
                          
                          
                          <td>${producto.descripcion}</td>
                         
                      </tr>
                  `;
        });
        document.getElementById("table-productos").innerHTML = template;
      })
      .catch((err) => console.log(err));
  }
  

  editar(){
    fetch("/editarProducto", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ producto: this.id }),
    })
      .then((producto) => producto.json())
      .then((producto) => {
        document.getElementById("CodigoBarraProducto").value =
          producto[0].codigoBarra;
        document.getElementById("nombreProducto").value = producto[0].nombre;
        document.getElementById("precioCompraProducto").value =
          producto[0].precioCompra;
        document.getElementById("monedaCompraProducto").value =
          producto[0].monedaCompra;
        document.getElementById("precioVentaProducto").value =
          producto[0].precioVenta;
        document.getElementById("monedaVentaProducto").value =
          producto[0].monedaVenta;
        document.getElementById("stockProducto").value = producto[0].stock;
        document.getElementById("marcaProducto").value = producto[0].marca;
        document.getElementById("categoriaProducto").value =
          producto[0].categoria;
        document.getElementById("descripcionProducto").value =
          producto[0].descripcion;
        document.getElementById("PrecioMinimoProducto").value =
          producto[0].precioMinimo;
        document.getElementById("utilidadProducto").value = producto[0].utilidad;
        document.getElementById("FechaVencimientoProducto").value = moment(
          producto[0].fechaVencimiento
        ).format("YYYY-MM-DD");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  eliminar(){
  fetch('/eliminarProducto',{
      headers : {
          'Content-Type' : 'application/json'
      },
      method : 'POST',
      body : JSON.stringify({producto:this.id})
  }).then(message=>message.text())
  .then(message=>{
      alert(message)
      mostrar();
  })
  .catch((error=>{
      console.log(error)
  }))
  }

  actualizar(){
    if(this.validar()){
    fetch('actualizarProducto', {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        codigoBarra : this.codigoBarra,
        nombre : this.nombre,
        precioCompra : this.precioCompra,
        monedaCompra : this.monedaCompra,
        precioVenta : this.precioVenta,
        monedaVenta : this.monedaVenta,
        precioMinimo : this.precioMinimo,
        stock : this.stock,
        categoria : this.categoria,
        marca : this.marca,
        descripcion : this.descripcion,
        utilidad : this.utilidad,
        fechaVencimiento : this.fechaVencimiento,
        id : this.id
      }),
    })
      .then((message) => message.text())
      .then((message) => {
        alert(message);
        this.form.reset();
        this.mostrar();
      })
      .catch((err) => console.log(err));
    }
  }

}

var producto = new Productos();

producto.mostrar();

document.getElementById("table-productos").addEventListener("click", (e) => {
  let idProducto;
  let btn = e.target.getAttribute("btn");
  if (btn !== null) {
    if (btn == "editarProducto") {
      idProducto = e.target.parentElement.parentElement.parentElement.getAttribute("id");
      if (idProducto != null) {
        this.setId(idProducto)
        producto.editar();
      }
    }else if(btn=="eliminarProducto"){
        idProducto = e.target.parentElement.parentElement.getAttribute("id");
        let confirmar = confirm("esta seguro que quiere eliminar este producto");
        if(confirmar){
          this.setId(idProducto)
          producto.eliminar();
        }else{
            
        }
    }
  }
});

document.getElementById("guardarProducto").addEventListener('click',()=>{
  console.log("hello");
  producto.guardar();
})

document.getElementById("actualizarProducto").addEventListener("click", (e) =>
{
  producto.actualizar();
}
)