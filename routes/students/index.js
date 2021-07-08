const express = require('express');
const router = express.Router();

const pool = require('../../database')

router.get('/add-student', (req,res) => {

    res.render('students/add');    
});


module.exports = router;