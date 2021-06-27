const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
//LLAMADA AL MODELO CURSOS
require('./models/cursos');

const port = 3000;

//Inicializaciones
require('./database/database'); //Conexion a base de datos
require('./passport/local-auth'); //Autenticaciones

//---------------- Middlewares- ------------------
//Estos son los servicios y funciones para que el login y registro funcione
//Configuracion de sesion
app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({extended : false}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

//Variables de sesion y mensajes de error y exito
app.use((req,res,next) => {
    app.locals.mensajeRegistro = req.flash('mensajeRegistro');
    app.locals.mensajeRegistroAuto = req.flash('mensajeRegistroAuto');
    app.locals.mensajeLogin = req.flash('mensajeLogin');
    app.locals.registroExito = req.flash('registroExito');
    app.locals.user = req.user;
    next();
});

// Rutas Web
app.use('/', require('./router/rutasWeb'));

// Rutas Usuario
app.use('/', require('./router/rutasUsuario'));

// Rutas Admin
app.use('/', require('./router/rutasAdmin'));

// Rutas Cursos
app.use('/', require('./router/rutasCursos'));

//Rutas Login
app.use('/', require('./router/rutasLoginRegistro'));

app.listen(port, () => console.log('el servidor está corriendo en el puerto', port));