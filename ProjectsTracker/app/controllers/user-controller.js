"use strict";

const passport = require("passport");
const smtpTransport = require("../utils/smtpTransport");

module.exports = function (data) {
    return {
        viewAllUsers(req, res) {
            data.getAllUsers().then(users => res.render("../views/users.pug", { users }));
        },
        viewUserByName(req, res) {
            data.findUserByUsername(req.params.name)
                .then(foundUsers => {
                    let user = foundUsers[0];
                    res.render("../views/user-details.pug", { user });
                });
        },
        registerPage(req, res) {
            res.render("../views/register.pug");
        },
        // register(req, res) {
        //     res.render("../views/register.pug");
        // },
        login(req, res) {
            res.render("../views/login.pug");
        },
        createUser(req, res) {
            let {
                firstName,
                lastName,
                username,
                password,
                email
            } = req.body;

            return data.registerUser(firstName, lastName, username, password, email)
                .then(user => {
                    return res.redirect(`/user/${user.username}`);
                })
                .catch(err => {
                    res.status(400)
                        .send(err);
                });
        },
        loginLocal(req, res, next) {
            console.log(req.body);
            const auth = passport.authenticate("local", (error, user) => {
                if (error) {
                    next(error);
                    return;
                }
                console.log("login local");
                console.log(user);
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
        },
        logout(req, res) {
            req.logout();
            res.redirect("/");
        },
        getProfile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).redirect("/unauthorized");
            } else {
                const user = req.user;
                // res.status(200).send(`Welcome, ${user}! Go to <a href="/">Home</a>`);
                req.flash("success_msg", "You have logged in successfully!");
                res.render("../views/profile", {
                    user,
                    success_msg: req.flash("success_msg")
                });
            }
        },
        get404(req, res) {
            res.send("Unauthorized access");
        },
        admin(req, res) {
            res.render("admin");
        },
        forgot(req, res) {
            res.render("forgotten-password");
        },
        handleForgottenPassword(req, res) {
            data.updateUserToken(req.body.email)
                .then((user) => {
                    let mailOptions = {
                        to: user.email,
                        from: "webmaster@projecttracker.com",
                        subject: "Project Tracker Password Reset",
                        text: `${"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
                        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
                        "http://"}${req.headers.host}/reset/${user.resetPasswordToken}\n\n` +
                        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
                    };

                    return smtpTransport.sendMail(mailOptions);
                })
                .then((options) => {
                    req.flash("success_msg", `An e-mail has been sent to ${options.to} with further instructions.`);
                    res.redirect("/");
                })
                .catch((err) => {
                    res.render("error", err);
                });
        },
        showResetPassword(req, res) {
            let token = req.params.token;
            res.render("reset-password", { token });
        },
        resetPassword(req, res) {
            let password = req.body.password;
            let token = req.body.token;

            data.changeUserPassword(password, token)
                .then(() => {
                    req.flash("success_msg", "Your password has been successfully changed!");
                    res.redirect("/login");
                })
                .catch(err => {
                    req.flash("error_msg", err.message);
                    res.redirect("/");
                });
        }
    };
};