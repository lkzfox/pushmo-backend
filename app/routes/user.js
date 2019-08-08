const express = require('express');
const router = express.Router();
const { User } = require('../models')
const _ = require('lodash');

router.get('/me', async (req, res) => {
    const result = await User.findOne({
        where: {
            id: req._user.id
        },
        attributes: ['name', 'email', 'id']
    });    
    res.send(result);
})

module.exports = router;