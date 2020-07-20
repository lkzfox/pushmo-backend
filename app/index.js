process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const express = require('express');
const { connect } = require('./db/connection');


const app = express();
console.log("connecting to database...");
connect();

require('./routes')(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server running on port ' + port)
});