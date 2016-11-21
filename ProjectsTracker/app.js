/* globals require */
const mongoose = require("mongoose");
let express = require("express");
let path = require("path");
//  let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let error;
let index = require("./routes/index");
const users = require("./routes/users");
//const constants = require("./config/constants");


require("./config/mongoose")(mongoose);

let Project = require("./models/project-model");
let User = require("./models/user-model");
const data = require("./data")({ Project, User });

data.createProject("Pesho", 8).then(() => {
    console.log("Created project");
});

// data.registerUser("Alexander", "Nestorov", "Alexand", "qwe123456").then(()=> {
//   console.log("User is created");
// });

data.findUserByUsername("Alexandro").then(()=> {
  console.log("User found");
});

data.findUserById("58335da78909fc272432bb4a").then(()=> {
  console.log("User command by id");
});



let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//  uncomment after placing your favicon in /public
//  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
    res.locals.message = err.message;
    if (req.app.get("env") === "development") {
        res.locals.error = err;
    } else {
        res.locals.error = {};
    }

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
