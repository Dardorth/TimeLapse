const express = require('express');
const user = require('../models/user');
const router = express.Router();

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
           },
           {
            $match: {
             user: req.user.user
            }
          },
           { $unwind : "$cursos" }
        ]);
        // console.log('****************Resultado =====>');
        // console.log(req.user.user);
        // console.log(cursosComprados);

        // console.log(cursosComprados);

        res.render('user/perfil',{
            cursosComprados
        });

    } catch (err) {
        console.log(err);
    }

});

router.get('/editarPerfil',  isAuthenticated, (req, res) => {
    res.render('user/editarPerfil');
});

router.get('/miProgreso',  isAuthenticated, (req, res) => {
    res.render('user/progreso');
});




function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;