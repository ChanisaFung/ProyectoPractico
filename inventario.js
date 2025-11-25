
//Definicion de variables
const url= ' http://localhost:4000/api/productos/ '
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalProductos = new bootstrap.Modal(document.getElementById('modalProductos'))
const formProductos = document.querySelector('form')
const nombre = document.getElementById('nombre')
const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')
let opcion = ''

btnCrear.addEventListener('click', ()=>{
    nombre.value = ''
    descripcion.value = ''
    precio.value = ''
    stock.value = ''
    modalProductos.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (productos) => {
    productos.forEach(productos => {
        resultados += `<tr>
                         <td>${productos.id}</td>
                         <td>${productos.nombre}</td>
                         <td>${productos.descripcion}</td>
                         <td>${productos.precio}</td>
                         <td>${productos.stock}</td>
                         <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a>
                         <a class="btnBorrar btn btn-danger">Borrar</a></td>
                         </tr>
                        `
    })
    contenedor.innerHTML = resultados
}


//Procedimiento Mostrar
fetch(url)
     .then( response => response.json() )
     .then( data => mostrar(data) )
     .catch( error => console.log(error) )



const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Borrar
on(document, 'click', '.btnBorrar', e =>{
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    
alertify.confirm("This is a confirm dialog.",
  function(){
    fetch(url+id, {
      method: "DELETE"
    })
    .then( res => res.json() )
    .then( ()=> location.reload() )
    //alertify.success('Ok');
  },
  function(){
    alertify.error('Cancel');
  })
})

//Editar
let idForm = 0
on(document, 'click', '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombreForm = fila.children[1].innerHTML
    const descripcionForm = fila.children[2].innerHTML
    const precioForm = fila.children[3].innerHTML
    const stockForm = fila.children[4].innerHTML

    nombre.value= nombreForm
    descripcion.value= descripcionForm
    precio.value= precioForm
    stock.value= stockForm
    opcion = 'editar'
    modalProductos.show()
})

//Crear y Editar
formProductos.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion== 'crear'){
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value
            })
        })
        .then( response => response.json() )
        .then ( data => {
            const nuevoProducto = []
            nuevoProducto.push(data)
            mostrar(nuevoProducto)
        })
    }
    if(opcion== 'editar'){
     fetch(url+idForm, {
        method: 'PUT',
        headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value
            })  
     })
     .then( response => response.json())
     .then( response => location.reload() )
    }
    modalProductos.hide()
} )
 