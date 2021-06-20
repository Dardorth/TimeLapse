const express = require('express');
const app = express();
const port = 3000;

// Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Rutas Web
app.use('/', require('./router/rutasWeb'));

// Rutas Usuario
app.use('/', require('./router/rutasUsuario'));

// Rutas Admin
app.use('/', require('./router/rutasAdmin'));

// Rutas Cursos
app.use('/', require('./router/rutasCursos'));


app.listen(port, () => console.log('el servidor está corriendo en el puerto', port));