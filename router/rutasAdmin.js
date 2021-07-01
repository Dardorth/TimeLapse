const express = require('express');
const product = require('../models/product');
const router = express.Router();
const multer = require('multer');

//PROPIEDAD PARA MANTENER LA EXTENSION ORIGINAL DE LA IMAGEN
const storage = multer.diskStorage({
    destination:'./public/images/products',
    filename: (req, file, cb)=>{
        cb(null,file.originalname)
    }});

//RUTA PARA GUARDAR LA IMAGEN
router.use(multer({
    storage,
    dest: './public/images/products'
}).single('logo'));


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


router.get('/administrarCursos', async (req, res) => {
    try {
        //LLAMO A TODOS LOS CURSOS SIN FILTRAR
        const administrarCursos = await product.find({}); 

        //ENVIO LA INFORMACION DE LOS CURSOS A administrarCursos
            res.render('admin/administrarCursos',{
                administrarCursos
        });
        } catch (err) {
            console.log(err);
        }

});

router.get('/administrarCursos/eliminar', async (req, res) => {
    
    try {
        const id= req.query.idEliminar;
        //console.log('****************Resultado =====>');
        //console.log(id);
        await product.remove({_id:id});

        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
         res.redirect('/administrarCursos');

    } catch (err) {
        console.log("No se puedo eliminar el curso: "+err);
    }

});

router.get('/administrarCursos/editar', async (req, res) => {
    
    try {
        //console.log("ID RECIBIDO========"+req.query.idEditar);
        
        //HACEMOS LA COMPARACION DE ID Y ACTUALIZAMOS LOS DATOS
        await product.updateOne({_id:req.query.idEditar},req.query);
 
        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
        res.redirect('/administrarCursos');

        console.log("=============Se actualizo correctamente el curso");
    } catch (err) {
        console.log("No se puedo editar el curso============ "+err);
    }

});


    router.post('/administrarCursos/agregar', async (req, res) => {
    try {
      
        //ALMACENAMOS LOS DATOS EN UNA VARIABLE
        let cursoNuevo = new product(req.body); 

        //GUARDAMOS LOS DATOS CON SAVE()
        cursoNuevo.save();

        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
        res.redirect('/administrarCursos');
    } catch (err) {
        console.log(err);
    }

});



module.exports = router;