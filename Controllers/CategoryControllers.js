const modeloCategoria = require("../Models/ModelsCategory")


const crearCategoria = async (req,res) => {

    const {nombre} =  req.body
    try {       
    const categoria =  new modeloCategoria({nombre: nombre})
    await categoria.save();
    res.status(200).send("categoria creada")
    } catch (error) {
        res.status(400).send("categoria no creada")
    }

}

module.exports = {
    crearCategoria,
}