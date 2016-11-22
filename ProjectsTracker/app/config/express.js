let express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),        
    passport = require("passport"),
    error;

let path = require("path");
let rootPath = path.normalize(__dirname);
console.log(rootPath);

module.exports = function(app, config) {    
    app.set("view engine", "pug");
    app.set("views", config.rootPath + "/app/views");
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));    
    app.use(cookieParser());
    //app.use(passport.initialize());
    //app.use(passport.session());
    app.use(express.static(path.join(__dirname, "../../public")));

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
};