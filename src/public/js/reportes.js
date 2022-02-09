

class Reportes{
    constructor(){
        this.fechaActual = moment().format("yyyy-MM-DD");
        this.fecha;
        this.numeroFactura;
        this.template = '';
        this.idfactura;
        this.form = document.getElementById("form-reporte-diario");
        document.getElementById("fecha-reporte-diario").value = this.fechaActual;
        moment.locale('es');
    }

    getDatos(){
        this.fecha = document.getElementById("fecha-reporte-diario").value;
        fetch('/reportes/ventaDiaria',{
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({
                fecha : this.fecha
            })
        })
        .then(venta=>venta.json())
        .then(venta=>{
            let template = `
                        <tr>
                            <td>Ventas</td>
                            <td class='text-right'>${venta.ventaDiaria}</td>
                        </tr>
                        <tr>
                            <td>Ingresos de efectivo</td>
                            <td class='text-right'>${venta.ingresoEfectivo}</td>
                        </tr>
                        <tr>
                            <td>Egresos de efectivo</td>
                            <td class='text-right'>${venta.egresoEfectivo}</td>
                        </tr>
                        <tr class="font-weight-bold">
                            <td>Efectivon en caja</td>
                            <td class='text-right'>${venta.existenciaCaja}</td>
                        </tr>`;
        document.getElementById("tblReportes").innerHTML = template;
        })
        .catch(error=>{
            console.log(error)
        })
    }

    getFacturas(){
        this.fecha = document.getElementById("fecha-reporte-diario").value;
        fetch('/reportes/getFacturas',{
            headers : {
                'Content-Type' : 'application/json'
            },
            method: 'POST',
            body : JSON.stringify({
                fecha : this.fecha
            })
        })
        .then(facturas=>facturas.json())
        .then(facturas=>{
            facturas.map(
                factura=>{
                    this.template +=`
                        <tr>
                            <td>${factura.id}</td>
                            <td>${moment(factura.fecha).format("ddd, DD-MMM-yyyy")}</td>
                            <td>${factura.nombre_comprador}</td>
                            <td>${parseFloat(factura.totalFactura).toFixed(2)}</td>
                        </tr>
                    `;
                }
            )
            document.getElementById('tbl-facturas').innerHTML = this.template;
            this.template = '';
        })
        .catch(err=>console.log(err))
    }

    getFactura(){
        fetch('/reportes/getFactura',{
            headers:{
                'Content-Type' : 'application/json'
            },
            method:'POST',
            body:JSON.stringify({
                id:this.idfactura
            })
        })
        .then(info=>info.json())
        .then(info=>{
            console.log(info)
            this.template = `<tr>
                                <td>${info[0].id}</td>
                                <td>${moment(info[0].fecha).format("ddd, DD-MMM-yyyy")}</td>
                                <td>${info[0].nombre_comprador}</td>
                                <td>${parseFloat(info[0].totalFactura).toFixed(2)}</td>
                            </tr>
            `;
            document.getElementById('tbl-facturas').innerHTML = this.template;
            this.template = '';
        })
        .catch(error=>console.log(error))
    }
}

var reportes = new Reportes();

reportes.form.addEventListener("submit",(e)=>{
    e.preventDefault();
    reportes.getDatos();
    reportes.getFacturas();
})

document.getElementById('form-buscar-factura').addEventListener('submit',(e)=>{
    e.preventDefault();
    let factura = new FormData(document.getElementById('form-buscar-factura'));
    reportes.idfactura = factura.get("factura");
    reportes.getFactura();
})