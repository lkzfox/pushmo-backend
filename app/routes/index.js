const express   = require('express');
const fs        = require('fs');
const path      = require('path');
const ignored   = [path.basename(__filename)];
const cors      = require('cors');


module.exports = function (app) {
    ignored.push("auth.js");
    app.use(express.json());
    app.use(cors({
        origin: true,
        credentials: true
    }));
    app.use(express.static('../images'));
    app.use('/api/auth/', require('./auth'));
    app.use(require('../middleware/auth'));

    fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && !ignored.includes(file) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        app.use('/api/', require(path.join(__dirname, file)));
    });
    
}