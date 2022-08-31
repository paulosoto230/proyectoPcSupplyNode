
const account =  (req,res) => {
    let {userName,apellido} = req.user
    let nombres = {
        nombre: userName,
        apellido: apellido,
    }
    res.render("account/index.hbs", {nombres})
}

module.exports = {
    account,
}