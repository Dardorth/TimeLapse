const express = require('express');
const app = express();
const port = 3000;

// Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/tienda',(req,res)=>{
    res.render('pages/tienda');
});

app.get('/sobreNosotros',(req,res)=>{
    res.render('pages/sobreNosotros');
});



app.listen(port,()=> console.log('el servidor está corriendo en el puerto', port));