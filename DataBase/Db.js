const mogoose = require('mongoose');

mogoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
.then(() => console.log('dbConectada'))
.catch(e => console.log('fallo la conexion' + e))