const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Crear sesion del usuario en el servidor
passport.serializeUser((user,done) => {
   done(null, user.id)
});

passport.deserializeUser(async (id,done) => {
   const user = await User.findById(id);
   done(null, user);
});

//Autenticacion para el REGISTRO
//Este modulo resive los datos y los guarda en la BD
/*
passport.use('register', new LocalStrategy(
 {
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
 },
 async (req, user, password, done) =>{

   if(await User.findOne({user: user})){
      done(null, false, req.flash('mensajeRegistro','El usuario ya existe'));
   }else{
      const newUser = new User();
      newUser.user = user;
      newUser.password = newUser.encrypthPassword(password);
      await newUser.save();
      done(null,newUser);
   }

 }   
));*/

//Autenticacion para el LOGIN
passport.use('login', new LocalStrategy(
   {
      usernameField: 'user',
      passwordField: 'password',
      passReqToCallback: true
   },
   async (req, user, password, done) => {
      const userDB = await User.findOne({user: user});
      if(!userDB){
         return done(null, false, req.flash('mensajeLogin','El usuario no existe'));
      }
      if(!userDB.validatePassword(password)){
         return done(null, false, req.flash('mensajeLogin','Contraseña incorrecta'));
      }
      done(null,userDB);
   }
));