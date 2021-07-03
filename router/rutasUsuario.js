const express = require('express');
const product = require('../models/product');
const user = require('../models/user');
const router = express.Router();

// Ruta perfil usuario
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
        console.log(cursosComprados);

        // console.log(cursosComprados);

        res.render('user/perfil',{
            cursosComprados
        });

    } catch (err) {
        console.log(err);
    }

});

// Ruta comprar productos
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

// Ruta view editar perfil
router.get('/editarPerfil', (req, res) => {
    res.render('user/editarPerfil');
});


// Ruta actualizar info perfil
router.post('/editarPerfil/:id', async (req, res) => {
    
    const id = req.params.id;
    const body = req.body;
    try {
        await user.findByIdAndUpdate(id, body, {useFindAndModify: false});

        res.redirect('/editarPerfil');
    } catch (err) {
        console.log(err);
    }

});


// Ruta actualizar foto perfil
router.post('/editarFoto/:id', async (req, res) => {
    
    const id = req.params.id;
    const body = req.body;

    console.log(id);
    console.log(body);
    try {
        
    } catch (err) {
        console.log(err);
    }

});


router.get('/miProgreso',  isAuthenticated, async (req, res) => {

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
        res.render('user/progreso',{
            cursosComprados
        });

    } catch (err) {
        console.log(err);
    }

});

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;