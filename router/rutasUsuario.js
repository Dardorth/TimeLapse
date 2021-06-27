const express = require('express');
const user = require('../models/user');
const router = express.Router();
const User = require('../models/user');

// Rutas usuario
router.get('/perfil', isAuthenticated, async (req, res) => {

    try {
        const cursosComprados = await user.aggregate([
            {
                $lookup:
                {
                 from: 'products',
                 localField: 'cursos.id_curso',
                 foreignField: '_id',
                 as: 'cursos'
               }
            }, {
               $match: {
                user: req.user.user
               }
             },
             { 
                $unwind : '$cursos'
              }
           ]);

        // console.log(cursosComprados);

        res.render('user/perfil',{
            cursosComprados
        });

    } catch (err) {
        console.log(err);
    }

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