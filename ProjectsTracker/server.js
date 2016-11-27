/* globals require */

let express = require("express");

let env = process.env.NODE_ENV || "development";
let app = express();
let config = require("./app/config/config")[env];

require("./app/config/express")(app, config);

const User = require("./app/models/user-model");
const Task = require("./app/models/task-model");
const Project = require("./app/models/project-model");
const data = require("./app/data")({ User, Task, Project });
const controllers = require("./app/controllers")(data);

require("./app/routers")(app, controllers);
require("./app/config/mongoose")(config);
require("./app/config/express-error")(app);

app.listen(config.port);
console.log(`Server running on http://localhost:${config.port}`);