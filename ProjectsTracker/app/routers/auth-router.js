"use strict";
let passport = require("passport");

module.exports = function (server, authController) {
    server.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

    server.get("/auth/facebook/return", passport.authenticate("facebook", { failureRedirect: "/login" }),
        (req, res) => {
            // Successful authentication, redirect home.
            req.flash("success_msg", "You have logged in successfully!");
            res.redirect("/profile");
        });

    server.get("/auth/github", passport.authenticate("github"));

    server.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/login" }),
        (req, res) => {
            // Successful authentication, redirect home.
            req.flash("success_msg", "You have logged in successfully!");
            res.redirect("/profile");
        });
};