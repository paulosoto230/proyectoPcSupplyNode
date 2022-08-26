

//localStorage.clear()
document.addEventListener('DOMContentLoaded', () =>{
   let precioProducto = document.querySelector('.mejorar .precio')
   if(precioProducto != null){
    precioProducto.textContent  = '$' + formatearPesoChileno(precioProducto.textContent,'CLP') 
   }
    document.addEventListener('click', e => {

        if(e.target.matches('.numero .botonBajar')){    
            disminuyenNumeros(e)
        }
        if(e.target.matches('.numero .botonAumentar')){
        
            aumentanNumeros(e)
        }
        if(e.target.matches('.botonAgregar .agregoAlCarro')){
        
            agregarCarrito(e)
        }
        if(e.target.matches('.agregarProducto')){
            agregarCarrito(e)

        }        
     })

})


 const disminuyenNumeros = (e) => {
   
  let numero = parseInt(document.querySelector('.numeroAumentador #numeroCarrito').innerHTML)   
 if(numero == 1){
 }else{
    numero-= 1
 }
 document.querySelector('.numeroAumentador #numeroCarrito').textContent = numero
 } 
 const aumentanNumeros = (e) => {
 let numero = parseInt(document.querySelector('.numeroAumentador #numeroCarrito').innerHTML)   
 numero+= 1
 document.querySelector('.numeroAumentador #numeroCarrito').textContent = numero
 } 

 const agregarCarrito = (e) => {

    carritoObjeto = obtenerProductosLocalStorage()
    let numero = document.querySelector('.numeroAumentador #numeroCarrito')
    if(numero == null){
        numero = 1
    }else{
        numero = parseInt(numero.innerHTML)
    }
   let valor = e.target.dataset.precio.toString();
   var montoFormat = valor.replace(/[.]/g,'');
   
   const producto = {
        id: e.target.dataset.id,
        imagen: e.target.dataset.imagenes,
        marca: e.target.dataset.marca,
        modelo: e.target.dataset.modelo,
        precio: montoFormat,
        cantidad: numero
    }

    const indice = carritoObjeto.findIndex((item) =>
          
             item.id === producto.id       
    )
      console.log(indice)
    if (indice === -1){

        carritoObjeto.push(producto)

    }else{
        carritoObjeto[indice].cantidad +=numero
        console.log("hla")
     // carritoObjeto[indice].precio =  carritoObjeto[indice].cantidad * producto.precio
    }

   Swal.fire({
    icon: 'success',
    title: 'PRODUCTO AGREGADO AL CARRITO',
    showConfirmButton: false,
    timer: 1500
  })
    guardarCarrito()
 }

 const guardarCarrito = () => {
    localStorage.setItem('productos', JSON.stringify(carritoObjeto));
 }

 const obtenerProductosLocalStorage = () => {
    let productoLS;
    //Comprobar si hay algo en LS
    if(localStorage.getItem('productos') === null){
        productoLS = [];
    }
    else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
}
let formatearPesoChileno = (valor,formatoLenguaje = undefined) => {
    return Intl.NumberFormat(formatoLenguaje).format(valor);
}

