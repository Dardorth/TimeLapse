const express = require('express');
const router = express.Router();

// Rutas para cursos
router.get('/curso-whatsapp', (req, res) => {
    res.render('courses/whatsapp/seccion1');
});
router.get('/curso-whatsapp-p1', (req, res) => {
    res.render('courses/whatsapp/prueba1');
});

router.get('/prueba', (req, res) => {
    res.render('pages/prueba');
});

module.exports = router;