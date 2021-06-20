const express = require('express');
const router = express.Router();

// Rutas de página
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/tienda', (req, res) => {
    res.render('pages/tienda');
});

router.get('/producto', (req, res) => {
    res.render('pages/producto');
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