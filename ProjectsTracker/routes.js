const passport = require("./config/facebook-authentication");
module.exports = function(app) {
    app.get("/login/facebook",
        passport.authenticate("facebook"));

    app.get("/auth/facebook",
        passport.authenticate("facebook"));

    app.get("/auth/facebook/return",
        passport.authenticate("facebook", { failureRedirect: "/login" }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect("/");
        });
};