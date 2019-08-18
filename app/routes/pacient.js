const express = require('express');
const router = express.Router();
const { Pacient, User } = require('../models');
const { Sequelize } = require('../db/connection');
const Op = Sequelize.Op;

router.get('/pacients', async (req, res) => {
    const { name, cpf } = req.query;
    const where = {};

    if (name) {
        where.name = {
            [Op.iLike]: '%' + name + '%'
        }
    }

    if (cpf) {
        where.cpf = {
            [Op.iLike]: cpf + '%'
        }
    }
    
    const pacients = await Pacient.findAll({
        where,
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

    const { success, result } = await new Pacient(req.body).validate(); 
    
    if (!success) return res.status(400).send({
        success,
        errors: result.error.details,
        message: "Invalid fields"
    })

    const { cpf } = req.body;
    var pacient = await Pacient.findOne({ where: { cpf } });    
    if (pacient) return res.status(400).send({
        success: false,  
        message: "Pacient already registered."
    });
    req.body.user_id = req._user.id;
    pacient = new Pacient(req.body);

    try{
        await pacient.save();
    
        res.send({
            success: true,
            message: "Pacient registered.",
            data: pacient
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Pacient registration failed.",
            error: err.parent.detail
        });
    }
    
})

module.exports = router;