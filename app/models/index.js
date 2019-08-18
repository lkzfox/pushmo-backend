var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(__filename);
var db        = {};
const { Sequelize, sequelize } = require('../db/connection');

fs
.readdirSync(__dirname)
.filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
    
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;