const mongoose = require('mongoose');
const { mongodb } = require('./keys')

//Conexion a la base de datos
mongoose.connect(mongodb.URI,{useUnifiedTopology: true,  useNewUrlParser: true  })
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log('Error: ',err));


