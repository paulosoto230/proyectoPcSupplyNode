const mongose = require('mongoose')
const {Schema} = mongose

const ProductSchema = new Schema ({

    marca: {
        type:String,
        unique:true,
        require: true
    },
    modelo:{
        type:String,
        unique:true,
        require:true,
    },
    precio:{
        type: Number,
        require:true
    },
    stock:{
        type:Number,
        require:true,
    },
    peso:{
        type:Number,
        require:true
    },
    imagen:{
        type:String,
        unique:true,
        require:true,
    },
    categoria:{
        type: mongose.Types.ObjectId
    }
})

const product = mongose.model('Product', ProductSchema )
module.exports = product
