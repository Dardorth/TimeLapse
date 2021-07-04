const express = require('express');
const product = require('../models/product');
const router = express.Router();
const multer = require('multer');



  const upload = multer({
    storage: multer.diskStorage({
      destination:'./public/images/products',
      filename: (req, file, cb)=>{
        cb(null,file.originalname)
        }
        })
  });



router.post('/administrarCursos/agregar', upload.single('logo'), async (req, res) => {

    try {
        const cursoNuevo = await new product(req.body); //OBTENEMOS TODOS LOS DATOS, EXCEPTO EL LOGO
        cursoNuevo.logo = req.file.originalname //ASIGNAMOS UN NUEVO CAMPO LLAMADO LOGO AL JSON Y LE AGREGAMOS EL NOMBRE DEL LOGO
        console.log(cursoNuevo);
        cursoNuevo.save(); //GUARDAMOS LOS DATOS EN LA BD

      res.redirect('/administrarCursos')
    } catch (err) {
        console.log("NO SE PUDO AGREGAR EL CURSO: "+err);
    }
})




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
        req.flash('mensajeEliminado','El curso se elimino correctamente.');
        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
         res.redirect('/administrarCursos');
         
    } catch (err) {
        console.log("No se puedo eliminar el curso: "+err);
    }

});

router.post('/administrarCursos/editar',  upload.single('logoEditar'), async (req, res) => {
    
    try {
        //HACEMOS LA COMPARACION DE ID Y ACTUALIZAMOS LOS DATOS
        
        const datos=req.body;
        //const datosCompletos = JSON.stringify(datos);
        console.log("INFORMACION DE LOS DATOS============ "+datos);
        //datos.logo = req.file.originalname;
        //console.log("INFORMACION DE LOS DATOS CON LOGO ============ "+datos);
       // const logo= Object.values(req.file.originalname);
        //console.log("INFORMACION DEL LOGO============ "+logo);
        
        //await product.updateOne({_id:req.query.idEditar},datos);
 
        req.flash('mensajeEditado','El curso se edito correctamente.');
        //RECARGAMOS LA PAGINA PARA VER EL CAMBIO
        res.redirect('/administrarCursos');

        console.log("=============Se actualizo correctamente el curso===================");
    } catch (err) {
        console.log("No se puedo editar el curso============ "+err);
    }

});


module.exports = router;