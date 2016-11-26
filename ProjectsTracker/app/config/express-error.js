module.exports = function (app) {
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