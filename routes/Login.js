const express = require('express');
const { redirectLogin, redirectRegister, registerUser, loginUser } = require('../Controllers/LoginControllers');
const {body} = require('express-validator') 
const router = express.Router();
const expresiones = {
	password: /^.{4,12}$/, // 4 a 12 digitos.
	telefono: /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/, // 7 a 14 numeros.
    rut: /^[0-9]+[-|‐]{1}[0-9kK]{1}$/
}

router.get('/', redirectLogin)
router.get('/registro',redirectRegister)
router.post('/registro',[
    body("nombre", "Ingrese un nombre válido").trim().notEmpty().escape(), 
    body("apellido", "Ingrese un apellido válido").trim().notEmpty().escape(), 
    body("rut", "Ingrese un rut válido").trim().notEmpty().escape(), 
    body("telefono", "Ingrese un numero de telefono valido").trim().notEmpty().escape().custom((value,{req}) => {
         if(expresiones.telefono.test(value)){
            return value
         }else{
            throw new Error('numero ingresado no valido')
         }
    }), 
    body("email", "ingrese un email válido").trim().isEmail().normalizeEmail().custom((value,{req}) => {

     if(value !== req.body.email2){
        throw new Error('no coinciden las contraseñas')
     }else{
        return value
     }
    }),
    body("password", "contraseña minimo de 6 carácteres").trim().escape().custom((value,{req})=>{
        if(value!== req.body.password2){   
            throw new Error('no coinciden las contraseñas')
        }else{
            return value
        }
    }),
],registerUser)
router.post('/',[
body("email", "ingrese un email válido").trim().isEmail().normalizeEmail(),
body("password", "contraseña minimo de 6 carácteres").trim().escape()

],loginUser)

module.exports = router