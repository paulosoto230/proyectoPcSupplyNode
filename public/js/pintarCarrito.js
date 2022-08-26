
let template = document.getElementById('tablaTemplate')
let carrito = document.getElementById('sectionTabla')
let tablaMenu = document.getElementById('tablaMenu')
let fragment = document.createDocumentFragment()
let templateFooter = document.getElementById("templateFooter")
let footer = document.getElementById('ultimoPrecio')
let templateBody = document.getElementById('templateTbody')
let eliminar = document.querySelector('.eliminar')
let tablaProductos = document.getElementById('tablaProductos')
let templateThead = document.getElementById('templateThead')
let productos = []
document.addEventListener('DOMContentLoaded', () =>{
  
  requerirProductos()
   document.addEventListener('click', e => {
    
       if(e.target.matches('.btnEliminar')){
           quitarCarrito(e)
       }
       if(e.target.matches('.btnActualizar')){
       
          aumentarCarro(e)
       }      
       })
})

const requerirProductos = () =>{
  
  productos = JSON.parse(localStorage.getItem('productos'))
  if(productos.length != 0){
    eliminar.style.display = "none";
    console.log(productos)
    pintarCarrito(productos)
  }
 
}

const pintarCarrito = (productos) => {
   console.log(productos)
   carrito.textContent = ''
   tablaProductos.textContent=''
// recorrer los objetos al transformarlo en un array
   productos.forEach(item =>{
   const clone = template.content.cloneNode(true)
   clone.querySelector('.imagenTabla').setAttribute("src", item.imagen);
   clone.querySelector('.nombreProducto p').textContent = item.modelo;   
   clone.querySelector('.cantidadActualizar').value = item.cantidad;
   let precioParseado = formatearPesoChileno(item.precio,'CLP')
   clone.querySelector('.precioUnidad').textContent = '$' + precioParseado
   precioParseado = formatearPesoChileno(parseFloat(item.precio * item.cantidad),'CLP')
   clone.querySelector('.precioTotal').textContent = '$' + precioParseado;
   clone.querySelector('.btnEliminar').dataset.id = item.id
   clone.querySelector('.btnActualizar').dataset.id = item.id
   clone.querySelector('.cantidadActualizar').setAttribute('id',item.id)
   fragment.appendChild(clone)
   })
   const clonador = templateThead.content.cloneNode(true)
   carrito.appendChild(fragment)
   tablaProductos.appendChild(clonador)
   sumador(productos)
}

const sumador = (productos) =>{

   let totalProducto = 0;
   footer.textContent = '';
   productos.forEach(item => {
   totalProducto += (item.precio*item.cantidad)
   })
   const clone = templateFooter.content.cloneNode(true)
   let totalProductoParseado = formatearPesoChileno(totalProducto,'CLP')
   clone.querySelector('.subtotal').textContent = '$' + totalProductoParseado;
   clone.querySelector('.total').textContent = '$' + totalProductoParseado;
   footer.appendChild(clone)
   if(totalProducto === 0){
       footer.remove()
       eliminar.style.display = "block";
   }
   //carrito.appendChild(footer)
}

const quitarCarrito = (e) => {

   productos = productos.filter(item => {
       if(item.id === e.target.dataset.id){

           if(item.cantidad > 0){
               item.cantidad --
           }
           if(item.cantidad === 0) return
           return item
       }else{
           return item
       }
   })
   localStorage.clear()
   localStorage.setItem('productos', JSON.stringify(productos));
   pintarCarrito(productos)
}

const aumentarCarro = (e) => {

   let valor = document.getElementById(e.target.dataset.id)
   valor = parseInt(valor.value)
    if(valor > 0){
        productos = productos.map(item => {
            if(item.id === e.target.dataset.id){
                if(valor > 0){
                    item.cantidad = valor
                }
                if(item.cantidad === 0) return
            }
            return item
        })
       localStorage.clear()
       localStorage.setItem('productos', JSON.stringify(productos));
       pintarCarrito(productos)
    }

}

let formatearPesoChileno = (valor,formatoLenguaje = undefined) => {
    return Intl.NumberFormat(formatoLenguaje).format(valor);
}
