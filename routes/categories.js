const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category');

//get all posts in the category
router.get('/', (req,res,next) =>{
    Category.find((err,categorien) =>{
        if(err) throw err;
        res.json(categorien);
    });
});

router.post('/categorie', (req, res, next) => {
    let categorie = new Category({name: req.body.name});
    categorie.save((err, categorie) => {
        if(err) throw err;
        res.json(categorie);
    });
});



module.exports = router;