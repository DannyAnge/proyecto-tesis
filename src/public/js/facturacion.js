class Facturacion {
  constructor() {
    this.id;
    this.idproducto;
    this.fecha;
    this.comprador;
    this.tipoVenta;
    this.iva;
    this.total = 0;
    this.usuario;
    this.codigoBarra;
    this.importe;
    this.cantidad;
    this.listaProductos = [];
    this.listaIds = [];
    this.isExiste;
    this.banderin = true;
    this.actualizarNumeroFactura();
    this.date = moment().format("YYYY-MM-DD");
    /* variable para capturar atributo btn */
    this.btn;
    this.formBuscar = document.getElementById("form-facturacion");
    this.formDatosFacturacion = document.getElementById(
      "form-datos-facturacion"
    );

    document.getElementById("fechaFactura").value = this.date;
  }

  getProductoPorNombre(dato) {
    fetch("/facturacion/busquedaPorNombre", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        dato: dato,
      }),
    })
      .then((list) => list.json())
      .then((list) => {
        let template = "";
        list.map((producto) => {
          template += `<tr codBarra="${producto.codigoBarra}" btn="add">
                          <td>${producto.nombre}</td>
                          <td>${producto.precioVenta}</td>
                          <td>${producto.stock}</td>
                      </tr>`;
        });
        document.getElementById("tblProductosFacturacion").innerHTML = template;
      })
      .catch();
  }

  setDatosFacturacion() {
    let data = new FormData(this.formDatosFacturacion);
    this.id = document.getElementById("numeroFactura").value;
    this.tipoVenta = data.get("formaPago");
    this.comprador = data.get("comprador");
    this.fecha = data.get("fecha");
    this.setDatosDetalles(this.id);
  }

  setDatosDetalles(factura) {
    this.listaProductos.map((p) => {
      p.cantidadProducto = document.getElementById(
        `cantidadProducto${p.producto}`
      ).value;
      p.factura = factura;
      p.totalVenta =
        parseFloat(p.precioProducto) * parseFloat(p.cantidadProducto);
    });
  }

  guardarFactura() {
    fetch("/facturacion/guardar", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        formaPago: this.tipoVenta,
        comprador: this.comprador,
        fecha: this.fecha,
        total: this.total,
        detalles: this.listaProductos,
      }),
    })
      .then((message) => message.text())
      .then((message) => {
        alert(message);
        this.actualizarNumeroFactura();
        this.limpiar();
      })
      .catch();
  }

  limpiar() {
    this.total = 0;
    this.listaIds = [];
    this.listaProductos = [];
    this.formBuscar.reset();
    this.formDatosFacturacion.reset();
    document.getElementById("table-facturacion").innerHTML = "";
    document.getElementById("totalFactura").innerText = "0.00";
  }
  comprobarProductoFactura(params) {
    let i = this.listaIds.filter((producto) => producto == params);
    if (i.length > 0) {
      this.isExiste = true;
    } else {
      this.isExiste = false;
    }
  }

  addProduct(params) {
    this.cantidad = document.getElementById(
      `cantidadProducto${params.id}`
    ).value;
    document.getElementById(`cantidadProducto${params.id}`).value =
      parseFloat(this.cantidad) + 1;
    this.importe =
      parseFloat(params.precioVenta) *
      parseFloat(document.getElementById(`cantidadProducto${params.id}`).value);
    document.getElementById(`importe${params.id}`).innerText = this.importe;
    this.calcularTotalFactura();
  }

  agregarProducto() {
    let data = new FormData(this.formBuscar);
    if (this.banderin) {
      this.codigoBarra = data.get("codigoBarraFacturacion");
    }
    fetch("/facturacion/getProducto", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        codigoBarra: this.codigoBarra,
      }),
    })
      .then((producto) => producto.json())
      .then((producto) => {
        this.calculos(producto[0]);
        this.formBuscar.reset();
      })
      .catch();
  }

  calculos(params) {
    let row = document.createElement("tr");
    let col;
    let table = document.getElementById("table-facturacion");
    this.comprobarProductoFactura(params.id);
    row.setAttribute("id", params.id);
    if (!this.isExiste) {
      this.listaIds.push(params.id);
      this.listaProductos.push({
        producto: params.id,
        precioProducto: params.precioVenta,
      });
      col = `
                <td>
                 <i class="icon-trash" style="color:red" btn="eliminarProductoFacturacion"></i>
                </td>
                <td>${params.codigoBarra}</td>
                <td>
                    <input
                        type="number"
                        name="" class="cantidadPF"
                        id="cantidadProducto${params.id}"
                        class="form-control form-control-sm"
                        value="1.0"
                        step="0.01"
                        btn="inputProducto"
                        precio="${params.precioVenta}" />  
                </td>
                <td>${params.nombre}</td>
                <td>${params.precioVenta}</td>
                <td id="importe${params.id}">${params.precioVenta}</td>
    `;
      row.innerHTML = col;
      table.append(row);
      this.calcularTotalFactura();
    } else {
      this.addProduct(params);
    }
  }

  actualizarImporte(input, precioVenta, idImporte) {
    document.getElementById(input).addEventListener("keyup", () => {
      this.cantidad = document.getElementById(`${input}`).value;
      this.importe = this.cantidad * precioVenta;
      document.getElementById(`importe${idImporte}`).innerText = this.importe;
      this.calcularTotalFactura();
    });
  }

  desminuirStock() {
    fect("/facturacion/dismnuirStock", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: this.idproducto,
        cantidad: this.cantidad - 1,
      }),
    });
  }

  calcularTotalFactura() {
    this.total = 0;
    this.listaIds.forEach((producto) => {
      this.total += parseFloat(
        document.getElementById(`importe${producto}`).innerHTML
      );
    });
    document.getElementById("totalFactura").innerText = this.total;
  }

  actualizarNumeroFactura() {
    fetch("/facturacion/ultimaFactura")
      .then((numero) => numero.text())
      .then((numero) => {
        document.getElementById("numeroFactura").value = numero;
      })
      .catch((error) => console.log(error));
  }
}

/*--------------------------------------------------------------------------------------*/
var factura = new Facturacion();
var idInput;

document.getElementById("form-facturacion").addEventListener("submit", (e) => {
  e.preventDefault();
  factura.agregarProducto();
});

document.getElementById("table-facturacion").addEventListener("click", (e) => {
  factura.btn = e.target.getAttribute("btn");
  if (factura.btn != null && factura.btn === "inputProducto") {
    idInput = e.target.getAttribute("id");
    factura.precioVenta = e.target.getAttribute("precio");
    factura.idproducto =
      e.target.parentElement.parentElement.getAttribute("id");
    factura.actualizarImporte(idInput, factura.precioVenta, factura.idproducto);
  } else if (
    factura.btn != null &&
    factura.btn === "eliminarProductoFacturacion"
  ) {
    factura.idproducto =
      e.target.parentElement.parentElement.getAttribute("id");
    factura.listaIds.find((id, i) => {
      if (id == factura.idproducto) {
        factura.listaIds.splice(i, 1);
      }
    });
    factura.listaProductos.find((detalle, index) => {
      try {
        if (detalle.producto == factura.idproducto) {
          factura.listaProductos.splice(index, 1);
        }
      } catch (error) {
        console.log(error);
      }
    });
    e.target.parentElement.parentElement.remove();
    factura.calcularTotalFactura();
  }
});

document.getElementById("btnGuardarFactura").addEventListener("click", () => {
  factura.setDatosFacturacion();
  factura.guardarFactura();
});

document.getElementById("buscarPorNombre").addEventListener("keyup", () => {
  factura.getProductoPorNombre(
    document.getElementById("buscarPorNombre").value
  );
});

document
  .getElementById("tblProductosFacturacion")
  .addEventListener("click", (e) => {
    factura.banderin = false;
    factura.codigoBarra = e.target.parentElement.getAttribute("codBarra");
    if (factura.codigoBarra !== "") {
      factura.agregarProducto();
      factura.banderin = true;
    }
  });

document.getElementById("btnLimpiarFactura").addEventListener("click", () => {
  factura.limpiar();
});
