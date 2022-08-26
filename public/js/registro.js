
const formulario = document.getElementById('formulario')
const input = document.querySelectorAll('#formulario input')

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/, // 7 a 14 numeros.
    rut: /^[0-9]+[-|‐]{1}[0-9kK]{1}$/
}

const campos = {
    rut: false,
    nombre: false,
    apellido: false,
    password: false,
    password2:false,
    correo:false,
    correo2:false,
    telefono:false
}

const data = {
    rut: "",
    nombre: "",
    apellido: "",
    password: "",
    correo: "",
    telefono: "",
    correo2: "",
    password2:"",
}


const validarFormulario = (e) => {

    switch( e.target.name){
        case "rut":   
           
         validarCampoRut(e)
         
        
       //console.log(probandoRut.validaRut(e.target.value) ? 'Valido' : 'inválido') 
        
        break;
        case "nombre":
            validarCampos(expresiones.nombre, e.target, 'nombre')
        break;
        case "apellido":
            validarCampos(expresiones.nombre, e.target, 'apellido')
        break;
        case "password":
            validarCampos(expresiones.password, e.target, 'password')
            validarPassword2()
        break;

        case "password2":
        validarPassword2()
        break;
        case "email":
            validarCampos(expresiones.correo, e.target, 'correo')
            validarCorreo2()
        break;
        case "telefono":
            validarCampos(expresiones.telefono, e.target, 'telefono')
        break;

        case "email2":

        validarCorreo2()
        break;

    }
   
}

const validarCampoRut = (e) => {

    if(probandoRut.validaRut(e.target.value)){
        document.getElementById('grupo__rut').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo__rut').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo__rut i').classList.add('fa-check-circle');
        document.querySelector('#grupo__rut i').classList.remove('fa-times-circle');
        document.querySelector('#grupo__rut .formulario__input-error').classList.remove('formulario__input-error-activo')
        campos.rut = true
        data.rut = e.target.value
     }else{
        document.getElementById('grupo__rut').classList.add('formulario__grupo-incorrecto')
        document.getElementById('grupo__rut').classList.remove('formulario__grupo-correcto')
        document.querySelector('#grupo__rut i').classList.add('fa-times-circle')
        document.querySelector('#grupo__rut i').classList.remove('fa-check-circle');
        document.querySelector('#grupo__rut .formulario__input-error').classList.add('formulario__input-error-activo')
        campos.rut = false
     }
}

const validarCampos = (expresion,input,campo) => {

    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle'); 
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos[campo] = true;
        data[campo] = input.value
       }else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle'); 
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos[campo] = false
       }  
}

const validarPassword2 = () => {

 let password1 = document.getElementById('password')
 let password2 = document.getElementById('password2')

if(password1.value !== password2.value){

    document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto')
    document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto')
    document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle')
    document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle'); 
    document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo')
    campos.password2 = false;


}else{
    document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle'); 
    document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo')
    campos.password2 = true;
    data.password2 = password2.value
}
}

const validarCorreo2 = () => {

    let email1 = document.getElementById('email')
    let email2 = document.getElementById('email2')

    if(email1.value !== email2.value){


    document.getElementById(`grupo__correo2`).classList.add('formulario__grupo-incorrecto')
    document.getElementById(`grupo__correo2`).classList.remove('formulario__grupo-correcto')
    document.querySelector(`#grupo__correo2 i`).classList.add('fa-times-circle')
    document.querySelector(`#grupo__correo2 i`).classList.remove('fa-check-circle'); 
    document.querySelector(`#grupo__correo2 .formulario__input-error`).classList.add('formulario__input-error-activo')
    campos.correo2 = false

    }else{

        document.getElementById(`grupo__correo2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__correo2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__correo2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__correo2 i`).classList.remove('fa-times-circle'); 
        document.querySelector(`#grupo__correo2 .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos.correo2 = true
        data.correo2 = email2.value
    }
}

input.forEach((input) => {
    input.addEventListener('keyup',validarFormulario)
    input.addEventListener('blur',validarFormulario) //cuando levanten la tecla
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

const terminos = document.getElementById('terminos')   
if(campos.rut && campos.nombre && campos.apellido && campos.password && campos.password2
     && campos.correo && campos.correo2 && campos.telefono && terminos.checked){
        
        formulario.submit()
        formulario.reset()
      //  registrarUsuario()
   
      /*  document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) =>{
            icono.classList.remove('formulario__grupo-correcto')
        })*/

}else{
   document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
}
})

let probandoRut = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		if (!expresiones.rut.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (probandoRut.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}

const registrarUsuario = async ()=> {
await fetch("/login/registro", {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } 
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => recargarPagina(response));
}

const recargarPagina = (response) => {

location.reload()

}