/* globals require */

let express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),        
    // passport = require("passport"),
    //logger = require("morgan"),
    error;

let path = require("path");


module.exports = function(app, config) {  


    app.use(bodyParser.json());    
    app.use(bodyParser.urlencoded({ extended: true }));    
    app.use(cookieParser());


    app.set("views", path.join(config.rootPath, "app/views/"));
    app.set("view engine", "pug");              
     
    app.use("/public", express.static(path.join(config.rootPath, "public"))); 
    app.set('view options', { layout: false });   
         
    
    require("../routers")(app);
    
    //app.use(logger("dev"));    
            
    //app.use(passport.initialize());
    //app.use(passport.session());
    

    // app.use((req, res, next) => {
    //     //console.log(res);
    //     // console.log(res);
    //     // console.log(next);
    //     error = new Error("Not Found");
    //     error.status = 404;
    //     next(error);
    // });

    app.use(function(req, res, next) {
        if (req.session.error) {
            let msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
            console.log(msg);
        }
        else {
            app.locals.errorMessage = undefined;
        }

        next();
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