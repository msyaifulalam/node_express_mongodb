// import express from 'express'; --ES6
const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

router.get('/ninjas', (req, res, next) => {
    // Ninja.find({}).then((ninja) => {
    // res.send(ninja);
    // })
    Ninja.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 100000,
        spherical: true,
        distanceField: 'dist.calculated'  
    }).then((ninjas) => {
        res.send(ninjas)
    });
});

router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body).then((ninja) => {
    res.send(ninja);
    }).catch(next)
});

router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findOneAndUpdate({_id: req.params.id}, req.body).then(() => {
        Ninja.findOne({_id: req.params.id}).then((ninja) => {
        res.send(ninja);
        })
    })
});

router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findOneAndRemove({_id: req.params.id}).then((ninja) => {
        res.send(ninja);
    })
});


module.exports = router;