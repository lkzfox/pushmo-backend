const express = require('express');
const router = express.Router();
const { User, PushEntry, Area, Exudato, Skin } = require('../models');
const { Sequelize } = require('../db/connection');
const Op = Sequelize.Op;

router.get('/pressure_ulcer/:id/entries', async (req, res) => {

    const push_entries = await PushEntry.findAll({
        where: { pressure_ulcer_id: req.params.id },
        include: [{ 
            model: User,
            attributes: ['name', 'email'] 
        }, Area, Exudato, Skin ]
    });

    res.status(200).send(push_entries || []);
})

router.post('/pressure_ulcer/:id/entries', async (req, res) => {

    req.body.user_id = req._user.id;
    req.body.pressure_ulcer_id = req.params.id;

    const { width, length } = req.body;
    if (!width || !length) {
        return res.status(400).send({
            success: false,
            message: "PushEntry registration failed.",
            errors: [{message: 'Width and Length are required.'}]
        });
    }
    const square_area = parseFloat((width * length).toFixed(2));
    const area = await Area.findOne({
        where: {
            min: {
                [Op.lte]: square_area
            },
            max: {
                [Op.gte]: square_area
            }
        }
    })

    req.body.area_id = area.id;
    const { success, result } = await new PushEntry(req.body).validate(); 
    
    if (!success) return res.status(400).send({
        success,
        errors: result.error.details,
        message: "Invalid fields"
    })

    const push_entry = await new PushEntry(req.body);
    
    try{
        await push_entry.save();
        res.send({
            success: true,
            message: "PushEntry registered.",
            data: push_entry
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "PushEntry registration failed.",
            errors: [{message: err.parent.detail}]
        });
    }
    
})

module.exports = router;