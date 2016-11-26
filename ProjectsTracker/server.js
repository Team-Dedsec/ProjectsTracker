/* globals require */

let express = require("express");

let env = process.env.NODE_ENV || "development";
let app = express();
let config = require("./app/config/config")[env];

require("./app/config/express")(app, config);
require("./app/routers")(app);
require("./app/config/mongoose")(config);
require("./app/config/express-error")(app);

app.listen(config.port);
console.log(`Server running on http://localhost:${config.port}`);