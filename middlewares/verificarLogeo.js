module.exports = (req,res,next) => {  
    let devolver = false
    if(req.isAuthenticated()){
         devolver = true
    }
    res.locals.devolver = devolver
    next()
  }
