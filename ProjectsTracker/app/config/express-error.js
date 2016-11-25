module.exports = function (app) {
    app.use((req, res, next) => {
        if (req.session.error) {
            let msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
            console.log(msg);
        } else {
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