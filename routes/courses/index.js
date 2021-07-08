const express = require('express');
const router = express.Router();

const pool = require('../../database');
const { route } = require('../auth');

router.get('/add-course', (req, res) => {
  
    res.render('courses/addcourses');
});


router.post('/add-course',(req,res)=>{
    const {name} = req.body;
  
    const course = {
        name: name
    }

    const query = pool.query('Insert into courses set ?', [course]);
    query.then((result)=>{
               
        req.flash('message', 'Cliente eliminado con éxito');
        res.redirect('/dashboard');
    }).catch((err)=>{
        res.json(err)
    });
});



module.exports = router;
