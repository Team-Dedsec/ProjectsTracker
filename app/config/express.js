/* globals require */

let express = require("express"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    csrf = require("csurf"),
    helmet = require("helmet"),
    logger = require("morgan"),
    flash = require("connect-flash-plus"),
    roles = require("./roles"),
    paginate = require("express-paginate"),
    MongoDBStore = require("connect-mongodb-session")(session),
    path = require("path"),
    filter = require("content-filter");

module.exports = (app, config) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    let sessionStorage = new MongoDBStore(
        {
            uri: config.db.cloud,
            collection: "userSessions"
        });

    app.use(session({
        secret: "secret",
        store: sessionStorage,
        resave: true,
        saveUninitialized: true
    }));

    app.set("views", path.join(config.rootPath, "app/views/"));
    app.set("view engine", "pug");
    app.use("/public", express.static(path.join(config.rootPath, "public")));
    app.set("view options", { layout: false });

    app.use(logger("dev"));

    require("../config/passport/")(app);

    app.use(helmet());
    app.use(filter());
    app.use(roles.middleware());
    // Connect Flash
    app.use(flash());

    // Global Vars
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        next();
    });

    app.use(csrf());
    app.use((req, res, next) => {
        let token = req.csrfToken();
        res.cookie("XSRF-TOKEN", token);
        res.locals._csrf = token;
        // res.locals._csrf = req.csrfToken();
        next();
    });

    // Paginate configuration
    app.use(paginate.middleware(10, 50));

    app.all((req, res, next) => {
      // set default or minimum is 10 (as it was prior to v0.2.0)
        if (req.query.limit <= 10) {
            req.query.limit = 10;
        }
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

    // CSRF token errors here
    app.use((err, req, res, next) => {
        if (err.code !== "EBADCSRFTOKEN") {
            return next(err);
        }
        let message = "Your session has expired or form has been tampered with!";
        let error = new Error(message);
        res.status(403)
            .render("error", { error, message });
    });

    // error handler
    // noinspection Eslint - next parameter is required
    app.use((err, req, res, next) => {
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
};