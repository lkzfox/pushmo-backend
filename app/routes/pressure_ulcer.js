const express = require('express');
const base64ToImage = require('base64-to-image');
const path = require('path');
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
    let { count } = await PressureUlcer.findAndCountAll({ where: { pacient_id } });    
    
    if (count >= 4) return res.status(400).send({
        success: false,  
        message: "All available pressure ulcers have been already registered."
    });

    pressure_ulcer = await new PressureUlcer(req.body);
    
    try{
		if (req.body.image) {
			const base64Str = req.body.image;
			const filePath = path.join(__dirname, '..', 'images/');
			const fileName = `${(new Date()).getTime()}-${req.params.id}`;
			const optionalObj = { fileName, type: 'jpeg' };
	
			const imageInfo = base64ToImage(base64Str,filePath,optionalObj);
			pressure_ulcer.image_path = imageInfo.fileName;
		}

	
        await pressure_ulcer.save();
        const loaded = await PressureUlcer.findOne({
            where: { id: pressure_ulcer.id },
            include: [{ 
                model: User,
                attributes: ['name', 'email'] 
            }, PressureUlcerLocation, PressureUlcerStage ]
        });

        res.send({
            success: true,
            message: "PressureUlcer registered.",
            data: loaded
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "PressureUlcer registration failed.",
            error: err.parent.detail
        });
    }
    
})


router.get('/pressure_ulcers/info', async (req, res) => {

    const locations = await PressureUlcerLocation.findAll();
    const stages = await PressureUlcerStage.findAll();

    res.status(200).send({
        locations,
        stages
    });
})

module.exports = router;