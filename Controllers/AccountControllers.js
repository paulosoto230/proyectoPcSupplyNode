
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
        const usuarioBuscado = await user.findById(id).lean()
        res.render("account/edit.hbs", {usuarioBuscado})
     } catch (error) {
        console.log(error)
     }

}


module.exports = {
    account,
    editAccountForm
}