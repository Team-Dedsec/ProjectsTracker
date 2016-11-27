/* globals require */

let express = require("express"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    logger = require("morgan"),
    flash = require("connect-flash-plus"),
    roles = require("./roles");

let path = require("path");

module.exports = function (app, config) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    }));

    app.set("views", path.join(config.rootPath, "app/views/"));
    app.set("view engine", "pug");
    app.use("/public", express.static(path.join(config.rootPath, "public")));
    app.set("view options", { layout: false });

    app.use(logger("dev"));

    require("../config/passport/")(app);

    app.use(roles.middleware());
    // Connect Flash
    app.use(flash());

    // Global Vars
    app.use(function (req, res, next) {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        next();
    });

    const User = require("../models/user-model");
    const Task = require("../models/task-model");
    const Project = require("../models/project-model");
    const data = require("../data")({ User, Task, Project });
    const controllers = require("../controllers")(data);

    require("../routers")(app, controllers);
    require("../config/mongoose")(config);

    app.use((req, res, next) => {
        let err = new Error("We can't seem to find the page you are looking for!");
        err.status = 404;
        next(err);
    });

    // error handler
    app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        if (req.app.get("env") === "development") {
            res.locals.error = err;
        }
        else {
            res.locals.error = {};
        }
        // render the error page
        res.status(err.status || 500);
        res.render("error");
    });
};
