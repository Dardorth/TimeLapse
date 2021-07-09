const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Users = require('../models/user');


router.get('/API/cursos', async (req, res) => {
    
    try {
        //LLAMO A TODOS LOS CURSOS SIN FILTRAR
        const administrarCursos = await Product.find({}).select({ 
            "name": 1,
            "price": 1,
            "_id": 0
        });

        //ENVIO LA INFORMACION DE LOS CURSOS A administrarCursos
            res.send({administrarCursos});
        } catch (err) {
            console.log(err);
        }

});


router.get('/API/usuarios', async (req, res) => {
    
    try {
        //LLAMO A TODOS LOS CURSOS SIN FILTRAR
        const usuarios = await Users.find({}).select({ 
            "name": 1,
            "lastname":1,
            "_id": 0
        });

        //ENVIO LA INFORMACION DE LOS CURSOS A administrarCursos
            res.send({usuarios});
        } catch (err) {
            console.log(err);
        }

});

  module.exports = router;