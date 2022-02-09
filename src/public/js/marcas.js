class Marca{
    constructor(){
        this.id;
        this.nombre;
        this.descripcion;
        this.template = '';
        this.bandera = true;
        this.formData;
        this.form = document.getElementById('formulario-marcas');
        this.btnGuardar = document.getElementById('btnGuardarMarca');
        this.btnActualizar = document.getElementById('btnActualizarMarca');
        this.mostrar('');
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    validar(){
        this.formData = new FormData(this.form);
        this.nombre = this.formData.get('nombre');
        this.descripcion = this.formData.get('descripcion');
        if(this.nombre == ''){
            return false;
        }else{
            return true;
        }
    }

    guardar(){
        if(this.validar() && this.bandera){
            fetch('/marcas/guardar',{
                headers : {
                    'Content-Type' : 'application/json'
                },
                method : 'POST',
                body : JSON.stringify({
                    nombre : this.nombre,
                    descripcion : this.descripcion
                })
            })
            .then(message=>message.text())
            .then(message=>{
                alert(message)
                this.mostrar('')
            })
            .catch(error=>{
                console.log(error);
            })
        }
    }

    editar(){
        fetch('/marcas/editar',{
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({id:this.id})
        })
        .then()
        .then()
        .catch()
    }

    actualizar(){

    }

    eliminar(){

    }

    mostrar(valor){
        fetch('/marcas/getMarcas',{
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({
                valor
            })
        })
        .then(marcas=>marcas.json())
        .then(marcas=>{
            marcas.map(
                marca =>{
                    this.template += `
                        <tr>
                            <td>${marca.id}</td>
                            <td>${marca.nombre}</td>
                            <td>${marca.descripcion}</td>
                             <td>
                                <button class="btn btn-info btn-sm icon-pencil-neg" btn="btnEditarMarca"></button>
                                <button class="btn btn-danger btn-sm icon-trash" btn="btnEliminarMarca"></button>
                            </td>
                        </tr>
                    `;
                }
            )
            document.getElementById('table-marcas').innerHTML = this.template;
            this.template = '';
        })
        .catch(error=>console.log(error))
    }
}

var marca = new Marca();

document.getElementById('formulario-marcas').addEventListener('submit',(e)=>{
    e.preventDefault();
    marca.guardar();
})