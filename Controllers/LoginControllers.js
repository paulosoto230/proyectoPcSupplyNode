const usuario = require("../Models/ModelsUser")
const nanoid = require('nanoid')
const { validationResult } = require("express-validator")
const redirectLogin = (req,res) => {

   res.render("Login/login.hbs",{mensajes: req.flash('mensajes')})
}
const redirectRegister = (req,res) =>{
   
   res.render("Login/register.hbs",{mensajes: req.flash('mensajes')})
}

const registerUser = async (req,res) => {

   const errors = validationResult(req)

   if(!errors.isEmpty()){
     req.flash("mensajes", errors.array()) // utilizando flash y enviando los mensajes
     return res.redirect('/login/registro')
  }
  const {nombre,apellido,rut,telefono,email,password} = req.body
  try {
     let usuarios = await usuario.findOne({email:email})
     if(usuarios) throw new Error('El usuario se encuentra registrado')
     usuarios =  new usuario({nombre:nombre,apellido:apellido,rut:rut,telefono:telefono,email:email,password:password,tokenConfirm:nanoid()})
     usuarios.save()
     req.flash("mensajes", [{msg:"Revisa tu correo electrónico y valida tu cuenta"}])
     res.redirect('/login')
  }catch (error) {
     req.flash("mensajes", [{msg: error.message}]) // utilizando flash y enviando los mensajes
     return res.redirect('/login/registro')
  }
  }

const loginUser = async (req,res) =>{
   const errors = validationResult(req) // con esto mostraria el error si el campo viene vacio
   if(!errors.isEmpty()){
       req.flash("mensajes", errors.array()) // utilizando flash y enviando los mensajes
       return res.redirect('/login')
   }
   
   const {email,password} = req.body
   try {
      const user = await usuario.findOne({email})
      if(!user) throw new Error('No existe el usuario')
      if(!user.cuentaConfirmada)  throw new Error('Falta confirmar cuenta')
      if(!await user.comparePassword(password)) throw new Error('Contraseña invalida')
      res.redirect('/')
   } catch (error) {
      req.flash("mensajes", [{msg: error.message}]) // utilizando flash y enviando los mensajes
      return res.redirect('/login')
   }
}

module.exports = {
   redirectLogin,
   redirectRegister,
   registerUser,
   loginUser
}