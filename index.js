//
//require('dotenv').config()
//'use strict';

// Require process, so we can mock environment variables
const process = require('process');

// [START app]
const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const path = require('path');
const crypto = require('crypto');
const flash = require('connect-flash');
const session = require('express-session'); 
const mysqlStore = require('express-mysql-session');
const passport = require('passport');


const app = express();
require('./lib/passport');
const {database} = require('./keys');

app.enable('trust proxy');

// Middleware

app.use(session({
  secret: 'seceto', //cambiar secreto por devvar
  resave: false,
  saveUninitialized: false,
  store: new mysqlStore(database)
}));


app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: false
}));

// flash middle-ware
app.use(flash());

app.use(express.json());
app.use(passport.initialize()); 
app.use(passport.session());

//Globar Variables
app.use((req,res,next) => {
    //variables para mensajes Flash
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.errores = req.flash('errores');
  
    // Vairable local de usuario
    app.locals.user = req.user;
    next();
  });

  //routes

app.use(require('./routes/'));
app.use(require('./routes/admin')); 
app.use(require('./routes/students')); 
app.use(require('./routes/auth'));
app.use(require('./routes/courses'));
app.use(require('./routes/levels'));
//app.use('/auth',require('./routes/auth'));
  


app.set('views', path.join(__dirname, 'views')); //vistas
// view engine
app.engine('.hbs', hbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layout'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers : require ('./lib/handlebars')
}));
app.set('view engine', '.hbs');
app.use(express.static(__dirname + '/public'));

var portVar = app.get('port');  
app.listen(5000, () => { 
      console.log(`App listening on port 5000`);
   
  });