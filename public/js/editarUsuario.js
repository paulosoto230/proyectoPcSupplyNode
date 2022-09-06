
let formulario = document.getElementById('formulario')
const input = document.querySelectorAll('#formulario input')
const boton = document.getElementById('btnContinuar')

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/, // 7 a 14 numeros.
}

const campos = {
    nombre: true,
    apellido: true,
    correo:true,
    telefono:true
}

const validarFormulario = (e) => {

	switch( e.target.name){
		case "nombre":
            validarCampos(expresiones.nombre, e.target, 'nombre')
        break;
        case "apellido":
            validarCampos(expresiones.apellido, e.target, 'apellido')
        break;
		case "email":
            validarCampos(expresiones.correo, e.target, 'correo')
        break;
        case "telefono":
            validarCampos(expresiones.telefono, e.target, 'telefono')
        break;
	}
}

const validarCampos = (expresion,input,campo) => {
    if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario_incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario_correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario_input_correcto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario_input_incorrecto');
        campos[campo] = true;
       }else{
		document.getElementById(`grupo__${campo}`).classList.remove('formulario_correcto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario_incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario_input_correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario_input_incorrecto');
        campos[campo] = false;
       }  
}

input.forEach((input) => {
    input.addEventListener('keyup',validarFormulario)
    input.addEventListener('blur',validarFormulario) //cuando levanten la tecla
})




formulario.addEventListener('submit',(e) => {
    e.preventDefault()

    if(campos.nombre && campos.apellido && campos.correo  && campos.telefono){
        formulario.submit()
        formulario.reset()
        }else{
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
}
})
