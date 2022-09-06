
const user = require("../Models/ModelsUser")

const account =  (req,res) => {
    let {userName,apellido} = req.user
    let nombres = {
        nombre: userName,
        apellido: apellido,
    }
    res.render("account/index.hbs", {nombres})
}

const editAccountForm = async (req,res) => {

     try {
        let {id} = req.user
        let usuarioBuscado = await user.findById(id).lean()
          
        res.render("account/edit.hbs",{usuarioBuscado})
     } catch (error) {
        console.log(error)
     }
    }
const editAccount = async (req,res) => {

console.log('holaa')

}


module.exports = {
    account,
    editAccountForm,
    editAccount,
}