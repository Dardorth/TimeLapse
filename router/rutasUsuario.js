const express = require('express');
const router = express.Router();

// Rutas usuario
router.get('/perfil', (req, res) => {
    res.render('user/perfil');
});

router.get('/editarPerfil', (req, res) => {
    res.render('user/editarPerfil');
});

router.get('/miProgreso', (req, res) => {
    res.render('user/progreso');
});


module.exports = router;