process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const express = require('express');
const { sequelize, Sequelize, connect } = require('./db/connection');


const app = express();
connect();

require('./routes')(app);
const port = process.env.PORT || 3000;
app.listen(port);