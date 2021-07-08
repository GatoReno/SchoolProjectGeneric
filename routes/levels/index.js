const express = require('express');
const router = express.Router();

const pool = require('../../database');
const { route } = require('../auth');

//INSERT

router.post('/add-level', (req,res)=>
{


});

//UPDATED
router.post('/add-level', (req,res)=>
{

    
});
//DELETE
router.get('/delete-level/:id', (req,res)=>
{

    
});
//SELECT
router.get('/all-levels-json', (req,res)=>
{
    const qu = pool.query(' select * from levels');
    const levels = [];
    qu.then((data) => {

        data.forEach((data) => {
            levels.push(data);
        });
        res.json(levels);        
    }).catch((err) => {
        console.log(err)
    });
});

module.exports = router;