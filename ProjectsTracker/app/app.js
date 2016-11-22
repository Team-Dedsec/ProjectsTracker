/* globals require */
const mongoose = require("mongoose");
const passport = require("./config/facebook-authentication");
let express = require("express");
let path = require("path");
//  let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let error;
//let config = require("./config");
//let index = require("./routes/index");
//const users = require("./routes/users");
//const constants = require("./constants/constants");


require("./config/mongoose")(mongoose);


let Project = require("./models/project-model");
let User = require("./models/user-model");
const data = require("./data")({ Project, User });

// data.createProject("Pesho", 8).then(() => {
//     console.log("Created project");
// });

data.registerUser("Georgi", "Georgiev", "Gosho8", "qwe123456").then((user) => {
    console.log(user);
    console.log(user.comparePassword("qwe123456"));
    console.log("User is registered successfully.");
});

data.findUserByUsername("Gosho5").then(() => {
    console.log("User found");
});

// data.findUserById("58335da78909fc272432bb4a").then(()=> {
//   console.log("User command by id");
// });

let app = express();
require("./config/routes")(app);

// facebook authentication route
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

// app.get("/login/facebook",
//     passport.authenticate("facebook"));

// app.get("/auth/facebook",
//     passport.authenticate("facebook"));

// app.get("/auth/facebook/return",
//     passport.authenticate("facebook", { failureRedirect: "/login" }),
//     (req, res) => {
//         // Successful authentication, redirect home.
//         res.redirect("/");
//     });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//  uncomment after placing your favicon in /public
//  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

//app.use("/", index);
//app.use("/users", users);

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