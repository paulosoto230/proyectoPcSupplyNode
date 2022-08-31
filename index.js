const express = require('express');
const app = express();
const sessions = require('express-session')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const { create } = require("express-handlebars");
require('dotenv').config()
require('./Database/Db')
const passport = require('passport');
const ModelsUser = require('./Models/ModelsUser');

app.use(sessions({
    secret: 'seguridad',
    resave:false,
    saveUninitialized: false,
    name: "claveSecreta",
}))
// flash se ocupa para los mensajes al usuario
app.use(flash())
// se ocupa para mantener iniciada las sesion de un usuario
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user,done) => done(null, {id: user._id, userName: user.nombre, apellido: user.apellido}))

passport.deserializeUser( async(user,done) => {
const usuarioBuscado = await ModelsUser.findById(user.id)
return done(null, {id: user.id, userName: user.userName, apellido: user.apellido})
})

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())
app.use("/", require('./routes/home'))
app.use("/producto", require('./routes/product'))
app.use("/categoria", require('./routes/Category'))
app.use("/login", require('./routes/Login'))
app.use("/compra", require('./routes/Compra'))
app.use("/account", require('./routes/Account'))
app.use(express.static(__dirname + "/public"));

const port = process.env.port || 5000
app.listen( port, ()  => console.log('servidor ok'));