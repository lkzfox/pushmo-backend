const express = require('express');
const router = express.Router();
const { User, PushEntry, Area, Exudato, Skin, AdditionalInfo, OptionPush, Option, Feature, Pacient, PressureUlcer } = require('../models');
const { Sequelize } = require('../db/connection');
const DateModifier = require('../helpers/dateModifier');
const saveImage = require('../helpers/saveImage');
const Op = Sequelize.Op;
const path = require('path');

router.get('/pressure_ulcer/:id/entries', async (req, res) => {

    const push_entries = await PushEntry.findAll({
        where: { pressure_ulcer_id: req.params.id },
        include: [{ 
            model: User,
            attributes: ['name', 'email'] 
        }, Area, Exudato, Skin, AdditionalInfo, 
        {
            model: OptionPush,
            include: [{
                model: Option,
                include: [ Feature ]
            }]
        }]
    });

    res.status(200).send(push_entries || []);
})

router.get('/pressure_ulcer/image/:image', async (req, res) => {    
    if (!req.params.image)
        return res.send(404);
    
    console.log(__dirname, path.join(__dirname, '..', 'images/') );

    fs
    .readdirSync(path.join(__dirname, '..') )
    .forEach(file => {
        console.log(file);
    });
    
    fs
    .readdirSync(path.join(__dirname, '..', 'images/'))
    .forEach(file => {
        console.log(file);
    });

    const file = path.join(__dirname, '..', 'images/', req.params.image);
    return res.sendFile(file);

})


router.post('/pressure_ulcer/pacient/:id/entries', async (req, res) => {
    
    const begin = DateModifier.utcDate(req.body.begin);
    const end = DateModifier.utcDate(req.body.end);

    console.log(begin, end);
    
    
    const push_entries = await PushEntry.findAll({
        where: {
            created_at: {
                [Op.and]: {
                    [Op.gte]: begin,
                    [Op.lte]: end
                }
            },
        },
        include: [ Area, Exudato, Skin, 
            {
                model: PressureUlcer,
                required: true,
                include: [
                    {
                        model: Pacient,
                        required: true,
                        where: { id: req.params.id }
                    }
                ]
            }
        ],
        order: [[PressureUlcer, 'id'], 'created_at']
    });

    res.status(200).send(PushEntry.modelDataForChart(push_entries) || []);
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
		if (req.body.image) {	
			const imageInfo = saveImage(req.body.image, [req.params.id])
			push_entry.image_path = imageInfo.fileName;
        }
        
        await push_entry.save();
        await push_entry.reload({
            include: [{ 
                model: User,
                attributes: ['name', 'email'] 
            }, Area, Exudato, Skin, AdditionalInfo,]
        })
        const features = await Feature.findAll({
            include: [ Option ]
        });
        res.send({
            success: true,
            message: "PushEntry registered.",
            data: push_entry,
            features
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "PushEntry registration failed.",
            errors: [{message: err}]
        });
    }
    
})

module.exports = router;