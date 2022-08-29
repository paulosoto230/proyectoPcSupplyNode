
const formularioCompra =  (req,res) => {
    console.log(req.user)
    res.render("compra/compra.hbs")
}

module.exports = {
 formularioCompra,
}