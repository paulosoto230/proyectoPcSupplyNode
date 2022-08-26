
const mongose = require('mongoose')
const {Schema} = mongose
const bcrypt = require('bcryptjs')

const userSchema = new Schema ({

     nombre: {
        type:String,
        lowercase: true,
        required:true
     },
     apellido: {
        type:String,
        lowercase: true,
        required:true
     },
     rut: {
        type:String,
        lowercase: true,
        required:true
     },
     telefono: {
        type:String,
        required:true
     },
     email: {
        type:String,
        lowercase: true,
        required:true,
        unique:true,
        index: {unique:true}
     },
     password:{
        type:String,
        required:true
     },
     tokenConfirm: {
        type: String,
        default:null
    },
    cuentaConfirmada: {
        type: Boolean,
        default:false
    }

     
}
)
userSchema.pre('save', async function(next){

   const user = this // agarra cada una de los modelo
  // primero verifica si la contraseña ya fue hasheada
   if(!user.isModified('password')) return next()
   // en caso de no haber sido hasheada realiza el hash
   try {
       const salt = await bcrypt.genSalt(10)
       const hasheada = await bcrypt.hash(user.password, salt)
       user.password = hasheada;
   } catch (error) {
       console.log(error)
       throw new Error('Error al codificar contraseña')
   }
})
// con esta funcion evalua si la contraseña es correcta y devuelve un booleano
userSchema.methods.comparePassword = async function(canditePassword){

   return await bcrypt.compare(canditePassword, this.password)

}

module.exports = mongose.model('User',userSchema)