const express = require('express');
const router = express.Router();

// Rutas para cursos
router.get('/curso-whatsapp', isAuthenticated, (req, res) => {
    res.render('courses/whatsapp/seccion1');
});
router.get('/curso-whatsapp-p1', isAuthenticated, (req, res) => {
    res.render('courses/whatsapp/prueba1');
});

router.get('/prueba', isAuthenticated, (req, res) => {
    res.render('pages/prueba');
});

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;