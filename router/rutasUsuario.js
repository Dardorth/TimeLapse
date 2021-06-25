const express = require('express');
const router = express.Router();

// Rutas usuario
router.get('/perfil', isAuthenticated,(req, res) => {
    res.render('user/perfil');
});

router.get('/editarPerfil', (req, res) => {
    res.render('user/editarPerfil');
});

router.get('/miProgreso', (req, res) => {
    res.render('user/progreso');
});

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;