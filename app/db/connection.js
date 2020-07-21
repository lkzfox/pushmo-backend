const Sequelize = require('sequelize');
const config = require('config');
var dbString = 'postgres://pushmo:P@s577orDs@pushmo.postgres.uhserver.com:5432/pushmo';

if (config.has('NODE_ENV') && config.get('NODE_ENV') == 'production'){
    dbString = `postgres://pushmo:${config.get("database.password")}@${config.get("database.host")}:5432/pushmo`;
    
}
console.log(config.get('NODE_ENV'));
console.log(dbString);

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