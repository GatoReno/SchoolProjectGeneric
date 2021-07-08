const express = require('express');
const router = express.Router();

const pool = require('../database')

const {
    isLoggedIn,
    isNotLoggedIn
} = require('../lib/auth');

router.get('/add-subadmin', (req,res) => {

    res.render('dashboard/sub-admins/add');    
});



module.exports = router;