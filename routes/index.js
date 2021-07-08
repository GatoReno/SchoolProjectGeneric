const express = require('express');
const router = express.Router();

const pool = require('../database')

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../lib/auth');

router.get('/', (req,res) => {

    res.render('public/index');    
});


router.get('/',isLoggedIn, (req, res) => {    
    console.log('redirect')
});

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('public/profile');
});


router.get('/dashboard',isLoggedIn,(req,res)=>{
    res.render('dashboard/dashboard');
});


router.get('/logout',isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = router;