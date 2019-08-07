const express = require('express');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/auth/', require('./auth'));
    app.use(require('../middleware/auth'));
    app.use('/api/', require('./user'));
}