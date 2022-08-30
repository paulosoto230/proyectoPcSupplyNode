const modeloProducto = require("../Models/ModelsProduct")
const modeloCategoria = require("../Models/ModelsCategory")
const mongose = require('mongoose')
const { json } = require("express")
const ObjectId = mongose.Types.ObjectId;

const listarProductos = async(req,res) => {    
    try {
        // se llama al elemento padre en este caso modeloProducto 
        let resultado = await modeloProducto.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "categories", // nombre del hijo evidenciada en el modelo
                        localField:"categoria",// campo del padre evidenciando al hijo
                        foreignField: "_id", // foreign de la tabla categoria
                        as: "listaProductos" // es un alias 
                    }
                }
            ]
        )
       resultado = resultado.map(item => {
         item.precio = formatearPesoChileno(item.precio,'CLP')
         return item
       })
       const categorias = await modeloCategoria.find().lean()
      
        res.render('productos/index.hbs',{resultado: resultado, categorias:categorias})    
    } catch (error) {
        console.log(error)
    }
}


let formatearPesoChileno = (valor,formatoLenguaje = undefined) => {
    return Intl.NumberFormat(formatoLenguaje).format(valor);
}


const ingresarProducto = async (req, res) => { 

const {marca,modelo,precio,peso,imagen,categoria} = req.body

try {
    
const producto = new modeloProducto({marca,modelo,precio,peso,imagen,categoria})
producto.save();
res.status(200).send("producto creado")

} catch (error) {
    console.log(error)
    res.status(400).send("problemas al crear producto")
}
}

const productoSeleccionado =  async (req,res) => {
    const{id} = req.params
    try {
        const productoBuscado = await modeloProducto.findById(id).lean();
        res.render('productos/show.hbs',{productoBuscado})
    } catch (error) {
        console.log(error)
        res.send("error algo falló")
    }
}

const carritoCompra = (req,res) => {
    res.render("compra/carrito.hbs")
}

const filtrarCategoria = async(req,res) => {


try {
    const{id} = req.params
    let resultado
    if(id == -1){

       resultado = await modeloProducto.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "categories", // nombre del hijo evidenciada en el modelo
                        localField:"categoria",// campo del padre evidenciando al hijo
                        foreignField: "_id", // foreign de la tabla categoria
                        as: "listaProductos" // es un alias 
                    }
                }
            ]
        )
    }else{

       resultado = await modeloProducto.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "categories", // nombre del hijo evidenciada en el modelo
                        localField:"categoria",// campo del padre evidenciando al hijo
                        foreignField: "_id", // foreign de la tabla categoria
                        as: "listaProductos" // es un alias 
                    }  
                },
                {
                     $unwind: '$listaProductos' ,
                },
                                
                {
                    $match : {'categoria': ObjectId(id)}
                }
            ]
        )

    }
    resultado = resultado.map(item => {
        item.precio = formatearPesoChileno(item.precio,'CLP')
        return item
      })
      
res.json(resultado)

    
} catch (error) {
    console.log(error)
}

}

module.exports = {
    ingresarProducto,
    listarProductos,
    productoSeleccionado,
    carritoCompra,
    filtrarCategoria,
}


