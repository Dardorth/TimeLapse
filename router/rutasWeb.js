const express = require('express');
const product = require('../models/product');
const router = express.Router();

// Rutas de inicio
router.get('/', (req, res) => {
    res.render('index');
});

// Rutas de tienda
router.get('/tienda', async (req, res) => {

    try {
        const cursosRedesSociales = await product.find({category:'redes sociales'}); 
        const cursosOfimatica = await product.find({category: 'ofimatica'});

        res.render('pages/tienda',{
            cursosRedesSociales,
            cursosOfimatica
        });
    } catch (err) {
        console.log(err);
    }

});

// Rutas de tienda -- ver detalles de producto
router.get('/tienda/:name', async (req, res) => {

    try {
        const productDetails = await product.find({name:req.params.name});
        console.log('****************Resultado =====>');
        console.log(productDetails);

        res.render('pages/producto',{productDetails});
    } catch (err) {
        console.log(err);
    }

});

// Rutas de carrito
router.get('/carrito', (req, res) => {
    res.render('pages/carrito');
});

// Rutas de carrito -- añadir al carrito
router.get('/carrito/:id', async (req, res) => {

    try {
        const addProduct = await product.findById(req.params.id);
        console.log('****************Resultado =====>');
        console.log(addProduct);

        res.render('pages/carrito',{addProduct});
    } catch (err) {
        console.log(err);
    }

    
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