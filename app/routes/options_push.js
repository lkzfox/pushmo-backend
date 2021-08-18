const express = require('express');
const router = express.Router();
const { OptionPush, Option, Feature } = require('../models');

router.get('/pressure_ulcer/entry/:id/feature/:feature_id', async (req, res) => {
    const options_push = await OptionPush.findAll({
        where: { 
            push_entry_id: req.params.id
        },
        include: [{
            model: Option,
            where: {
                feature_id: req.params.feature_id
            }
        }]
    });

    res.status(200).send(options_push || {});
})

router.get('/pressure_ulcer/entry/features', async (req, res) => {
    const features = await Feature.findAll({
        include: [Option],
        order: [['id', 'asc']]
    });

    res.status(200).send(features || {});
})

router.post('/pressure_ulcer/entry/:id/options', async (req, res) => {

    const { options }= req.body;    
    console.log(req.params.id);
    
    let validated_options = [];
    for(i = 0; i < options.length; i++) {
        let option = {};
        option.option_id = options[i];
        option.push_entry_id = req.params.id;
        let temp_option = await new OptionPush(option);
        let { success, result } = temp_option.validate(); 
    
        if (!success) return res.status(400).send({
            success,
            errors: result.error.details,
            message: "Invalid fields"
        })
        validated_options = validated_options.concat([temp_option]);
    };
    
    try{
        for(i = 0; i < options.length; i++) {        
            await validated_options[i].save();
        };    

        res.send({
            success: true,
            message: "OptionPush registered.",
            data: validated_options
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "OptionPush registration failed.",
            errors: [{message: err.parent.detail}]
        });
    }
    
})

module.exports = router;