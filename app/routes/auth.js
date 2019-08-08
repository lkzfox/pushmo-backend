const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });    
    
    if (!user) return res.status(400).send('Invalid credentials');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');


    res.header('x-auth-token', user.generateToken()).send({
        success: true,
        message: "Login succesful"
    });
})

router.post('/register', async (req, res) => {
    const { email } = req.body;
    var user = await db.User.findOne({ where: { email } });    
    if (user) return res.status(400).send({
        sucess: false,
        message: "Email already in use."
    });

    const salt = await bcrypt.genSalt(13);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    
    user = new db.User(req.body);
    
    const { success, result } = user.validate(); 
    
    if (!success) return res.status(400).send({
        success,
        errors: result.error.details,
        message: "Invalid fields"
    })

    try{        
        await user.save();
        
        res.send({
            success: true,
            message: "User registered."
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "User registration failed.",
            error: err.parent.detail
        });
    }
})

module.exports = router;