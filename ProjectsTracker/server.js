/* globals require */

let express = require("express");
let mongoose = require("mongoose");
let env = process.env.PORT || "development";

let app = express();
let config = require("./app/config/config")[env];

require('./app/config/express')(app, config);
require("./app/config/mongoose")(mongoose);
require("./app/config/routes")(app);

app.listen(config.port);
console.log(`Server running on ${config.port}`);