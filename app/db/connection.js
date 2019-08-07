const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/pushmo');


module.exports = {
    Sequelize, 
    sequelize,
    Types: Sequelize,
    connect() { 
        sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            //sequelize.sync({force: true});
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });        
    }
}