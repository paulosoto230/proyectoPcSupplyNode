
let formulario = document.getElementById('formulario')
const input = document.querySelectorAll('#formulario input')
const boton = document.getElementById('btnContinuar')


const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/, // 7 a 14 numeros.
}




formulario.addEventListener('submit',(e) => {
    e.preventDefault()
})
