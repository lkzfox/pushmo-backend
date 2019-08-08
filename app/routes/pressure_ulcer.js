const express = require('express');
const router = express.Router();
const { User, PressureUlcer, PressureUlcerLocation, PressureUlcerStage } = require('../models');

router.get('/pacient/:id/pressure_ulcers', async (req, res) => {

    const pressure_ulcer = await PressureUlcer.findAll({
        where: { pacient_id: req.params.id },
        include: [{ 
            model: User,
            attributes: ['name', 'email'] 
        }, PressureUlcerLocation, PressureUlcerStage ]
    });

    res.status(200).send(pressure_ulcer || {});
})

router.post('/pacient/:id/pressure_ulcers', async (req, res) => {

    req.body.user_id = req._user.id;
    req.body.pacient_id = req.params.id;
    const { success, result } = await new PressureUlcer(req.body).validate(); 
    
    if (!success) return res.status(400).send({
        success,
        errors: result.error.details,
        message: "Invalid fields"
    })

    const { pacient_id } = req.body;
    var { count } = await PressureUlcer.findAndCountAll({ where: { pacient_id } });    
    
    if (count >= 4) return res.status(400).send({
        success: false,  
        message: "All available pressure ulcers have been already registered."
    });

    pressure_ulcer = await new PressureUlcer(req.body);
    
    try{
        await pressure_ulcer.save();
        res.send({
            success: true,
            message: "PressureUlcer registered.",
            data: pressure_ulcer
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "PressureUlcer registration failed.",
            error: err.parent.detail
        });
    }
    
})

module.exports = router;