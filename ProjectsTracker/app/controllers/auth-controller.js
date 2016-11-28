"use strict";

module.exports = function(data) {
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

                res.redirect("/profile");

            });
        });

        auth(req, res, next);
    }
  }
};
