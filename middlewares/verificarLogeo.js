module.exports = (req,res,next) => {  
    let devolver = false
    if(req.isAuthenticated()){
         devolver = true
    }
    console.log(devolver)
    res.locals.devolver = devolver
    next()
  }
