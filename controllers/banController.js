const express = require('express');

const Data = require('../models/data');

const router = express.Router();

router.post('/register', async(req,res) => {
    const { ip } = req.body;
    try {
        if(await Data.findOne({ ip })){
            return res.sendStatus(405)
        }
        Data.create(req.body)
        return res.redirect('http://localhost:3000/')
    } catch (error) {
        return res.status(400).send({error: 'Registration failed'});
    }
});

module.exports = app => app.use('/blacklist',router);