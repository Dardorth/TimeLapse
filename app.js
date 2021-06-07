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

app.get('/usuarioPerfil',(req,res)=>{
    res.render('pages/usuarioPerfil');
});

app.get('/sobreNosotros', (req, res) => {
    res.render('pages/sobreNosotros');
});


// Rutas para cursos 
app.get('/course-whatsapp',(req,res)=>{
    res.render('courses/whatsapp');
});



app.listen(port, () => console.log('el servidor está corriendo en el puerto', port));