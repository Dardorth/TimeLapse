const router = require('express').Router();
const passport = require('passport');

router.post('/login',passport.authenticate('login',{
    successRedirect: '/perfil',
    failureRedirect: '/',
    passReqToCallback: true
})) 

router.get('/logout',(req,res) => {
    req.logout();
    res.redirect('/');
});

router.post('/register',passport.authenticate('register',{
    successRedirect: '/perfil',
    failureRedirect: '/',
    passReqToCallback: true
}));

router.post('/registerAuto',passport.authenticate('registerAuto',{
    successRedirect: '/perfil',
    failureRedirect: '/',
    passReqToCallback: true
}));


//Funcion para controlar el acceso a paginas
//Llamar esta funcion en la ruta de una pagina para controlar
//que el usuario haya iniciado sesion
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;