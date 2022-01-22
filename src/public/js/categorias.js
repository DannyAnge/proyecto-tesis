class Categoria{
    constructor(){
        this.id;
        this.nombre;
        this.descripcion;
        this.formulario = document.getElementById('formulario-categoria');
    }
    
    /* LISTO */
    validar(){
        let data = new FormData(this.formulario);
        this.nombre = data.get('nombre');
        this.descripcion = data.get("descripcion");
        if(this.nombre === ""){
            return false;
            alert("Complete el campo nombre..")
        }else{
            return true;
        }
    }

    /* LISTO */
    limpiar(){
        this.formulario.reset();
    }

    /* LISTO */
    guardar(){
        if(this.validar()){
            fetch('/guardarCategoria',{
                headers : {
                    'Content-Type' : "application/json"
                },
                method: 'POST',
                body : JSON.stringify(
                    {
                        nombre : this.nombre,
                        descripcion : this.descripcion
                    }
                )
            })
            .then(res=>res.text())
            .then(res=>{
                alert(res)
                this.limpiar();
                this.mostrar();
            })
            .catch(error=>console.log(error));
        }
    }

    editar(){
        fetch('/editarCategoria',{
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify(
                {
                    id : this.id
                }
            )
        }).then(info=>info.json()).
        then(info=>{
            console.log("hello");
            document.getElementById('nombreCategoria').value = info[0].nombre;
            document.getElementById('descripcionCategoria').value = info[0].descripcion;
            this.id = info[0].id;
        }).
        catch(error=>{console.log(error)})
    }

    actualizar(){
        if(this.validar()){
            fetch('/actualizarCategoria',{
                headers : {
                    'Content-Type' : "application/json"
                },
                method: 'POST',
                body : JSON.stringify(
                    {
                        id : this.id,
                        nombre : this.nombre,
                        descripcion : this.descripcion
                    }
                )
            })
            .then(res=>res.text())
            .then(res=>{
                alert(res)
                this.limpiar();
                this.mostrar();
            })
            .catch(error=>console.log(error));
        }
    }

    /* LISTO */
    mostrar(){
        let table = document.getElementById("table-categorias");
        let template = '';
        fetch("/getCategorias")
        .then(categorias=>categorias.json())
        .then(categorias=>{
            	categorias.map(categoria=>{
                    template += `
                        <tr id='${categoria.id}'>
                            <td>${categoria.id}</td>
                            <td>${categoria.nombre}</td>
                            <td>${categoria.descripcion}</td>
                            <td>
                                <sapn class="icon-trash" style="color:red" btn="eliminarCategoria"></span>
                                <sapn class="icon-pencil-neg" style="color:cyan;" btn="editarCategoria"></span>
                            </td>
                        </tr>
                    `;
                });

                table.innerHTML = template;
        })
        .catch(error=>{
            console.log(error)
        });
    }

}

const categoria = new Categoria();
categoria.mostrar();

document.getElementById('formulario-categoria').addEventListener('submit',(e)=>{
    e.preventDefault();
    categoria.guardar();
})

document.getElementById('table-categorias').addEventListener('click',(e)=>{
    let btn = e.target.getAttribute("btn");
    if(btn!==null && btn==='editarCategoria'){
        categoria.id = e.target.parentElement.parentElement.parentElement.getAttribute('id');
        categoria.editar();
    }
})
