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

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;