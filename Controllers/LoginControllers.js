const usuario = require("../Models/ModelsUser")
const nanoid = require('nanoid')
const { validationResult } = require("express-validator")
const nodemailer = require('nodemailer')
const nodemailerSengrid = require('nodemailer-sendgrid')
const plantillaEmail = require('../plantillaEmail/plantillaEmail')
require('dotenv').config()



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
     sendEmail(usuarios)
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
      
      req.login(user, function(err){
         if(err) throw new Error('error al crear la sesión')
         res.redirect('/')
     })
   } catch (error) {
      req.flash("mensajes", [{msg: error.message}]) // utilizando flash y enviando los mensajes
      return res.redirect('/login')
   }
}
const confirmarCuenta = async (req,res) => {

   const {token} = req.params
   try {
       const user = await usuario.findOne({tokenConfirm : token})
       if(!user) throw new Error('No existe el usuario')
       user.cuentaConfirmada = true
       user.tokenConfirm = null
       await user.save()
       req.flash("mensajes", [{msg: "Cuenta verificada, puedes iniciar sesión"}])
       res.redirect('/login')
   } catch (error) {
       req.flash("mensajes", [{msg: error.message}]) // utilizando flash y enviando los mensajes
       return res.redirect('/login')
   }
   //res.json(token)
}

const sendEmail = async (user) => {
     
   const transporter = createTrans()
   const info =  await transporter.sendMail({
       from: 'paulosoto230@gmail.com',
       to: user.email, // aqui va el correo al cual se le envia
       subject: 'Hola estamos probando esta cosa',
       html: plantillaEmail.plantillaHtml(user)
   })
   console.log("Message sent: %s" + info.messageId)
}

const createTrans = () => {    
     const transport = nodemailer.createTransport(
       nodemailerSengrid({
           apiKey: process.env.apiKey
       })
     )
   return transport
}






module.exports = {
   redirectLogin,
   redirectRegister,
   registerUser,
   loginUser,
   confirmarCuenta,
}