const express = require('express');
const app = express();
const port = 3000;

// Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// Rutas de página
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/tienda', (req, res) => {
    res.render('pages/tienda');
});

app.get('/producto', (req, res) => {
    res.render('pages/producto');
});

app.get('/carrito', (req, res) => {
    res.render('pages/carrito');
});

app.get('/checkout', (req, res) => {
    res.render('pages/checkout');
});

app.get('/sobreNosotros', (req, res) => {
    res.render('pages/sobreNosotros');
});

app.get('/politicaPrivacidad', (req, res) => {
    res.render('pages/politicaPrivacidad');
});

// Rutas usuario
app.get('/perfil', (req, res) => {
    res.render('user/perfil');
});

app.get('/editarPerfil', (req, res) => {
    res.render('user/editarPerfil');
});


// Rutas admin
app.get('/panelControl', (req, res) => {
    res.render('admin/panelControl');
});
app.get('/usuariosRegistrados', (req, res) => {
    res.render('admin/usuariosRegistrados');
});
app.get('/ganancias', (req, res) => {
    res.render('admin/ganancias');
});
app.get('/administrarCursos', (req, res) => {
    res.render('admin/administrarCursos');
});


// Rutas para cursos
app.get('/curso-whatsapp', (req, res) => {
    res.render('courses/whatsapp/seccion1');
});
app.get('/curso-whatsapp-p1', (req, res) => {
    res.render('courses/whatsapp/prueba1');
});

app.get('/prueba', (req, res) => {
    res.render('pages/prueba');
});

app.listen(port, () => console.log('el servidor está corriendo en el puerto', port));
