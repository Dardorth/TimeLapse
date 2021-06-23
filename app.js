const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const port = 3000;

//Inicializaciones
require('./database/database'); //Conexion a base de datos
require('./passport/local-auth'); //Autenticaciones

//---------------- Middlewares- ------------------
//Estos son los servicios y funciones para que el login funcione
//Configuracion de sesion
app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({extended : false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next) => {
    app.locals.mensajeRegistro = req.flash('mensajeRegistro');
    app.locals.mensajeLogin = req.flash('mensajeLogin');
    next();
});

// Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

//Variables de sesion y mensajes de error
app.use((req,res,next) => {
    //app.locals.mensajeRegistro = req.flash('mensajeRegistro');
    app.locals.mensajeLogin = req.flash('mensajeLogin');
    app.locals.user = req.user;
    console.log(app.locals.user);
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
app.use('/', require('./router/rutasLogin'));

app.listen(port, () => console.log('el servidor está corriendo en el puerto', port));