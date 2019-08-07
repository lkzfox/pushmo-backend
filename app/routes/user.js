const express = require('express');
const router = express.Router();
const db = require('../models')
const _ = require('lodash');

router.get('/me', async (req, res) => {
    const result = await db.User.findByPk(req._user.id);    
    res.send(_.pick(result, ['id', 'name', 'email']));
})

module.exports = router;