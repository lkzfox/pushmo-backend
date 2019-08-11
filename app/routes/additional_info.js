const express = require('express');
const router = express.Router();
const { AdditionalInfo } = require('../models');

router.get('/pressure_ulcer/entry/:id/additional_info', async (req, res) => {

    const additional_info = await AdditionalInfo.findOne({
        where: { push_entry_id: req.params.id }
    });

    res.status(200).send(additional_info || {});
})

router.post('/pressure_ulcer/entry/:id/additional_info', async (req, res) => {

    req.body.push_entry_id = req.params.id;
    const additional_info = await new AdditionalInfo(req.body);
    const { success, result } = additional_info.validate(); 

    if (!success) return res.status(400).send({
        success,
        errors: result.error.details,
        message: "Invalid fields"
    })
    
    try{     
        await additional_info.save();

        res.send({
            success: true,
            message: "AdditionalInfo registered.",
            data: additional_info
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "AdditionalInfo registration failed.",
            errors: [{message: err.parent.detail}]
        });
    }
    
})

module.exports = router;