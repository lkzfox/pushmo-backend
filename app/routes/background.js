const express = require('express');
const router = express.Router();
const { User, Background } = require('../models');

router.get('/pacient/:id/background', async (req, res) => {

    const background = await Background.findOne({
        where: { pacient_id: req.params.id },
        include: [{ 
            model: User,
            attributes: ['name', 'email'] 
        }]
    });

    res.status(200).send(background || {});
})

router.post('/pacient/:id/background', async (req, res) => {

    req.body.user_id = req._user.id;
    req.body.pacient_id = req.params.id;
    const { success, result } = await new Background(req.body).validate(); 
    
    if (!success) return res.status(400).send({
        success,
        errors: result.error.details,
        message: "Invalid fields"
    })

    const { pacient_id } = req.body;
    var background = await Background.findOne({ where: { pacient_id } });    
    if (background) return res.status(400).send({
        success: false,  
        message: "Background already registered."
    });

    background = await new Background(req.body);
    
    try{
        await background.save();
        res.send({
            success: true,
            message: "Background registered.",
            data: background
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Background registration failed.",
            error: err.parent.detail
        });
    }
    
})

module.exports = router;