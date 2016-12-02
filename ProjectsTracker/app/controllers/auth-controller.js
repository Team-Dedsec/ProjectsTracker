"use strict";

let passport = require("passport");

module.exports = function (data) {
    return {
        loginLocal(req, res, next) {
            const auth = passport.authenticate("local", (error, user) => {
                if (error) {
                    next(error);
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
                    res.redirect("/profile");

                });
            });

            auth(req, res, next);
        }
    }
};
