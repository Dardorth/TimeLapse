const express = require('express');
const router = express.Router();

// Rutas admin
router.get('/panelControl', (req, res) => {
    res.render('admin/panelControl');
});
router.get('/usuariosRegistrados', (req, res) => {
    res.render('admin/usuariosRegistrados');
});
router.get('/ganancias', (req, res) => {
    res.render('admin/ganancias');
});
router.get('/administrarCursos', (req, res) => {
    res.render('admin/administrarCursos');
});


module.exports = router;