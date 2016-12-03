"use strict";

let passport = require("passport");

module.exports = function () {
    return {
        loginLocal(req, res, next) {
            const auth = passport.authenticate("local", (err, user) => {
                if (err) {
                    next(err);
                    return;
                }

                if (!user) {
                    req.flash("error_msg", "Invalid username or password!");
                    res.redirect("/login");
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    req.flash("success_msg", "You have logged in successfully!");
                    res.redirect(req.session.returnTo || "/profile");
                    req.session.returnTo = null;
                    // res.redirect("/profile");
                });
            });

            auth(req, res, next);
        },
        externalLoginSuccess(req, res) {
            // Successful authentication, redirect home.
            req.flash("success_msg", "You have logged in successfully!");
            res.redirect("/profile");
        },
        logout(req, res) {
            req.logout();
            res.redirect("/");
        },
        login(req, res) {
            res.render("../views/login.pug");
        }
    };
};