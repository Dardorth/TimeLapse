const express = require('express');
const user = require('../models/user');
const multer = require('multer');
const bcrypt = require('bcrypt');
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
        //Pequeña validacion para que un ADMIN no ingrese a esta ruta.
            if(req.user.role != 'admin'){
                res.render('user/perfil',{
                    cursosComprados
                });
            }else{
                res.redirect('/');
            }

        } catch (err) {
            console.log(err);
        }


});

// Ruta view editar perfil
//Pequeña validacion para que un ADMIN no ingrese a esta ruta.
router.get('/editarPerfil', isAuthenticated,(req, res) => {
    if(req.user.role != 'admin'){ 
        res.render('user/editarPerfil');
    }else{
        res.redirect('/');
    }
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

// Ruta actualizar contraseña
router.post('/editarContrasena/:id', async (req, res) => {
    
    const id = req.params.id;
    const body = req.body;

    body.password = encrypthPassword(req.body.password)
    
    try {
        await user.findByIdAndUpdate(id, body, {useFindAndModify: false});

        res.redirect('/editarPerfil');
    } catch (err) {
        console.log(err);
    }

});

function encrypthPassword(password){

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash
}


//UZAMOS LA DEPENDENCIA MULTER PARA ALMACENAR UNA IMAGEN EN LA CARPETA PRODUCT
const upload = multer({
    storage: multer.diskStorage({
      destination:'./public/images/profiles',
      filename: (req, file, cb)=>{
        cb(null,file.originalname)
        }
        })
  });



// Ruta actualizar foto perfil
router.post('/editarFoto/:id',upload.single('profile'), async (req, res) => {

    const id = req.params.id;
    const logo = req.file.originalname;

    try {
        if(req.file != undefined){
            await user.updateOne({_id:id},{profile:logo});       
        };
        res.redirect('/editarPerfil');
    } catch (err) {
        console.log(err);
    }

});

// Ruta mi progreso
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

            //Pequeña validacion para que un ADMIN no ingrese a esta ruta.
            if(req.user.role != 'admin'){ 
                res.render('user/progreso',{
                    cursosComprados
                });
            }else{
                res.redirect('/');
            }

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