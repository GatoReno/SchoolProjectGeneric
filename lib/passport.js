const passport = require('passport');
const LStrategy = require('passport-local').Strategy;

const helpers = require('../lib/helpers');
const pool = require('../database');



passport.use('local.signin', new LStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usernamae, password, done) => {
    console.log(req.body);
    console.log(usernamae, password);

    const qu = pool.query('SELECT * FROM  users where email = ?',[usernamae]);
    qu.then( async (res) => {

        if (res.length > 0) {
            const user = res[0];
            console.log(user);
            const validpass = await helpers.matchPass(password, user.password);
            console.log("VALID PASSWORD = " + validpass );
            if (validpass) {
                done(null,user,req.flash('success','Bienvenido '));
            }else{
                done(null,false,req.flash('message','Contraseña invalida'));
            }

        }else {
            done(null,false,req.flash('message','Usuario invalido '));
        }
    }).catch((err) => {
        console.log(err);
    });
}));


passport.use('local.signup', new LStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, userName, pass, done) => {

    console.log(req.body);
    const email = req.body.email;    
    const datenac = req.body.datenac;
    const newUser = {        
        email: email,        
        //id_usercreated: 0 // TODO pending get id from admin 
    };

    newUser.password = await helpers.encryptPass(pass);

    console.log(newUser);

    const query =  pool.query('INSERT INTO users set ?', [newUser]);
    
    query.then((data) => {
        console.log(data.toString());
        newUser.id = parseInt(data.insertId);
        console.log(data.insertId);
     return done(null, newUser,req.flash('message','Bienvenido '+newUser.username));


    }).catch((err) => {
        console.log(err);
    });


}));


// passport.use('local.signup-subadmin', new LStrategy({
//     usernameField: 'name',
//     passwordField: 'pass',
//     passReqToCallback: true
// }, async (req, userName, pass, done) => {

//     //console.log(req.body);
//     const email = req.body.email;
//     //const name = req.body.name;
//     const { lastnameM,
//             lastnameP,
//             phone, 
//             datenac,
//             id,role ,name} = req.body;

//     const newUser = {
//         username: userName,
//         name: name,
//         email: email,
//         datenac: datenac,
//         id_usercreated: id,
//         lastnameP: lastnameP,
//         lastnameM: lastnameM,
//         email: email,
//         phone: phone
//     };

//     switch(role){
//         case 1:
//         newUser.admin = true;
//         newUser.owner = false;
        
//         break;

//         case 2:
//         neUser.owner = true;
//         newUser.admin = false;
//         break;
//     }
    

//     newUser.pass = await helpers.encryptPass(pass);

//     console.log(newUser);

//     const query = pool.query('INSERT INTO users set ?', [newUser]);
    
//     query.then((data) => {
//         //console.log(data.toString());
//         newUser.id = parseInt(data);
//         console.log(newUser);
//      return done(null, false,req.flash('message','Usuario '+newUser.username + 'credo con éxito.'));


//     }).catch((err) => {
//         console.log(err);

//         return done(null,false,req.flash('errores','err:'+err))
//     });


// }));

passport.serializeUser((user, done) => {

    done(null, user.id); //user is an object resulted from a query be sure to use the correct property name
});


passport.deserializeUser(async (id, done) => {
    console.log(id)
    const qu = pool.query('SELECT * FROM users where idusers = ?', [id]);
    qu.then((res) => {
        console.log('datos recibidos con éxito')
        done(null, res[0]);  // datos de usuario por deseralizar
    }).catch((err) => {
        console.log(err)
    });

    
    //user is an object resulted from a query be sure to use the correct property name
});