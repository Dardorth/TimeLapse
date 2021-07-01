const express = require('express');
const product = require('../models/product');
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
        // console.log(req.user.id);
        // console.log(cursosComprados);

        // console.log(cursosComprados);

        res.render('user/perfil',{
            cursosComprados
        });

    } catch (err) {
        console.log(err);
    }

});


router.get('/perfil/:cart', async (req, res) => {
    products = req.params.cart;

    array = [];
    array = products.split(',');

    console.log('***********Resultado');
    // console.log(req.user.id);
    try {
        let ids = '';
        array.forEach(async item => {
            ids = await product.find({name:item});
            ids.forEach(async x =>{
                await user.updateOne(
                    { _id: req.user.id},
                    {
                      $push: {
                        cursos: {
                           $each: [ { id_curso: x._id } ]
                        }
                      }
                    }
                 )
                 console.log(x);
            });
        });

        res.redirect('/perfil');


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