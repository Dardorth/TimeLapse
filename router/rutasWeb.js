const express = require('express');
const product = require('../models/product');
const router = express.Router();
let cartShop = [];

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
        const productName = await product.find({name:req.params.name});
        console.log('****************Resultado =====>');

        productName.forEach(element => {
            productDetails = element
        });
        console.log(productDetails);

        res.render('pages/producto',{productDetails});
    } catch (err) {
        console.log(err);
    }

});

// Rutas de carrito
router.get('/carrito', (req, res) => {
    res.render('pages/carrito',{cartShop});
});

// Rutas de carrito -- añadir al carrito
router.get('/carrito/:name', async (req, res) => {

    try {
        const addProduct = await product.find({name:req.params.name});
        cartShop.push(addProduct);
        console.log('****************Resultado =====>');
        console.log(cartShop);

        res.render('pages/carrito',{cartShop});
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