const mongose = require('mongoose')
const {Schema} = mongose

const categorySchema = new Schema ({
 
    nombre:{
        type: String,
        require:true,
        unique:true,
    }
})

const category = mongose.model('Category',categorySchema)
module.exports = category

