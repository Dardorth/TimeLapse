const express = require('express');
const router = express.Router();

// Rutas de página
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/tienda', async (req, res) => {
    
    const cursoRedSocial = await Cursos.find({categoria:'red_social'});
    const cursoTrabajo = await Cursos.find({categoria:'trabajo'});
    //console.log(curso);

    res.render('pages/tienda',{
        cursoRedSocial,
        cursoTrabajo
    });

});

router.get('/producto', async (req, res) => {
    //RECIBIMOS LOS DATOS DEL OPRIMIDO DE LA TIENDA
    var id_curso =req.query.id;
    var nombre = req.query.nombre;
    var logo = req.query.logo;
    var precio =req.query.precio;

    //console.log('ID DEL PRODUCTO SELECCIONADO: '+id_curso);
    //console.log('NOMBRE DEL PRODUCTO SELECCIONADO: '+nombre);
    //console.log('LOGO DEL PRODUCTO SELECCIONADO: '+logo);
    //console.log('PRECIO DEL PRODUCTO SELECCIONADO: '+precio);
    //const cursoProducto = await Cursos.find({_id:id});
    //console.log('nombre DEL PRODUCTO SELECCIONADO: '+cursoProducto.nombre);
    
    //ENVIAMOS LOS DATOS A LA PAGINA DE PRODUCTO
    res.render('pages/producto',{
        id_curso, nombre, logo, precio
    });
});

router.get('/carrito', (req, res) => {
    res.render('pages/carrito');
});

router.get('/checkout', (req, res) => {
    res.render('pages/checkout');
});

router.get('/sobreNosotros', (req, res) => {
    res.render('pages/sobreNosotros');
});

router.get('/politicaPrivacidad', (req, res) => {
    res.render('pages/politicaPrivacidad');
});

module.exports = router;