

class Reportes{
    constructor(){
        this.fechaActual = moment().format("yyyy-MM-DD");
        this.fecha;
        this.datos={};
        this.egresoEfectivoDiario;
        this.ingresoEfectivoDiario;
        this.form = document.getElementById("form-reporte-diario");
        document.getElementById("fecha-reporte-diario").value = this.fechaActual;
    }

    getventaDiaria(){
        this.fecha = document.getElementById("fecha-reporte-diario").value;
        fetch('/getVentaDiaria',{
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({
                fecha : this.fecha
            })
        })
        .then(venta=>venta.text())
        .then(venta=>{
            this.datos.ventaDiaria = venta;
        })
        .catch(error=>{
            console.log(error)
        })
    }

    llenarTabla(datos){
        let template = `
                        <tr>
                            <td>Venta Diaria</td>
                            <td class='text-right'>${datos.ventaDiaria}</td>
                        </tr>`;
        document.getElementById("tblReportes").innerHTML = template;
    }
}

var reportes = new Reportes();

reportes.form.addEventListener("submit",(e)=>{
    e.preventDefault();
    reportes.getventaDiaria();
    reportes.llenarTabla(reportes.datos)
})