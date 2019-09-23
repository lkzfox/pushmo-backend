const Sequelize = require('sequelize');
const config = require('config');
const dbString = 'postgres://postgres:postgres@localhost:5432/pushmo';

if (config.has('NODE_ENV') && config.get('NODE_ENV'))
    dbString = `postgres://${config.get("database.host")}:${config.get("database.password")}@localhost:5432/pushmo`;

const sequelize = new Sequelize(dbString);

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