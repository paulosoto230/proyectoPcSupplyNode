
const primeraVista =  (req,res) => {
    console.log(req.user)
    res.render("home")
}

module.exports = {
    primeraVista,
}