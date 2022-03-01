(function (API) {
  API.textCenter = function (txt, options, x, y) {
    options = options || {};
    if (options.align == "center") {
      var fontSize = this.internal.getFontSize();

      // Get page width
      var pageWidth = this.internal.pageSize.width;

      txtWidth =
        (this.getStringUnitWidth(txt) * fontSize) / this.internal.scaleFactor;

      // Calculate text's x coordinate
      x = (pageWidth - txtWidth) / 2;
    } else if (options.align == "right") {
      var fontSize = this.internal.getFontSize();
      var pageWidth = this.internal.pageSize.width;
      txtWidth =
        (this.getStringUnitWidth(txt) * fontSize) / this.internal.scaleFactor;
      x = pageWidth - txtWidth;
      //dar un margin de de 0.5 ala derecha
      x = x - 0.5;
    }

    // Draw text at x,y
    this.text(txt, x, y);
  };
})(jsPDF.API);

var doc = new jsPDF({
  orientation: 'potrait',
  unit: 'mm',
  format: [80,80],
  putOnlyUsedFonts: true
});

document
  .getElementById("btnGuardarFactura")
  .addEventListener("click", () => {
    generarContrato();
    doc.deletePage(1);
    doc.addPage([80,80], "mm");
  });

function generarContrato() {
  let encabezado = [
    `Direcciòn: Jalapa`,
    `Factura #: 0001`,
    `Fecha:     ${moment().format('DD/MMM/yyyy')}`,
    `Cliente :  Cesar Eduardo Diaz`
  ]
  let titulos = [
    "DESCRIPCION      CANT.   PRECIO   IMPORTE"
  ]
  doc.setFontSize(15);
  doc.setFontStyle("bold");
  doc.textCenter("FACTURA", { align: "center" }, 0, 6);
  doc.setFontStyle("normal");
  doc.setFontSize(9);
  doc.text(encabezado, 0.5, 11, {})
  doc.setFontStyle("bold")
  doc.setFontSize(9)
  doc.text(titulos, 0.5, 27, {})
  doc.setLineWidth(0.01);
  doc.line(0.5, 29, 80, 29);
  let url = doc.output("datauristring");
  document.getElementById("contenedorFacturaPDF").setAttribute("src", url);
}


