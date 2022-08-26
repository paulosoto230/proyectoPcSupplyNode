

let carritoObjeto = []
const selectElement = document.querySelector('.form-select');
let template = document.getElementById('templateCard').content
let card = document.getElementById('card-dinamicas')
let fragment = document.createDocumentFragment()
miSelect = document.getElementById("filtrador");
miSelect.selectedIndex = 0;

document.addEventListener('click', e => {
    
    if(e.target.matches('.verProducto')){    
        verProducto(e)
    } 
 })

selectElement.addEventListener('change', e => {

   filtrarCategoria(e)
})


 const verProducto = async(e) => {
 let id = e.target.dataset.id
 location.href ="http://localhost:5000/producto/ver/" + id;
 }

const filtrarCategoria = async(e) => {
    let id = e.target.value
    console.log(id)
    try {
        const res =  await fetch('/producto/filtrar/' + id )
        const data =  await res.json()
        pintarDatos(data)
        } catch (error) {
            console.log(error)
        }
}

const pintarDatos = (data) => {

   card.textContent = '';
    data.forEach(item => {
        const clone = template.cloneNode(true)
        clone.querySelector('#marca').textContent = item.marca;
        clone.querySelector('#nombreCategoria').textContent = item.listaProductos.nombre;
        clone.querySelector('#imagen').setAttribute("src", item.imagen);
        clone.querySelector('#precio').textContent = '$' + item.precio
        clone.querySelector('.verProducto').setAttribute('href',"producto/ver/" + item._id)
        clone.querySelector('.agregarProducto').dataset.id = item._id
        clone.querySelector('.agregarProducto').dataset.marca = item.marca
        clone.querySelector('.agregarProducto').dataset.precio = item.precio
        clone.querySelector('.agregarProducto').dataset.modelo = item.modelo
        clone.querySelector('.agregarProducto').dataset.imagen = item.imagen
        fragment.appendChild(clone)
     });
     card.appendChild(fragment)
}








 

 

 










