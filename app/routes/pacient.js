const express = require('express');
const router = express.Router();
const { Pacient, User } = require('../models');

router.get('/pacients', async (req, res) => {

    const pacients = await Pacient.findAll({
        include: [{ 
            model: User,
            attributes: ['name', 'email'] 
        }],
        order: [
            ['name', 'ASC']
        ]
    });

    res.status(200).send(pacients);
})

router.post('/pacients', async (req, res) => {

    const { sucess, result } = await new Pacient(req.body).validate(); 
    
    if (!sucess) return res.status(400).send({
        sucess,
        errors: result.error.details,
        message: "Invalid fields"
    })

    const { cpf } = req.body;
    var pacient = await Pacient.findOne({ where: { cpf } });    
    if (pacient) return res.status(400).send({
        sucess: false,  
        message: "Pacient already registered."
    });
    req.body.user_id = req._user.id;
    pacient = new Pacient(req.body);

    await pacient.save();
    
    res.send({
        success: true,
        message: "Pacient registered.",
        data: pacient
    });
})

module.exports = router;