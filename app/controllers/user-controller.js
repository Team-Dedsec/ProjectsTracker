"use strict";
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
                    let projects = foundUsers[0].projects;
                    res.render("../views/user-details.pug", { user, projects });
                });
        },
        registerPage(req, res) {
            res.render("../views/register.pug");
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
                    req.flash("errorMessage", err.message);
                    res.redirect("/register");
                });
        },
        getProfile(req, res) {
            const user = req.user;
            res.render("../views/profile", { user });
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
                    req.flash("successMessage", `An e-mail has been sent to ${options.to} with further instructions.`);
                    res.redirect("/");
                })
                .catch((error) => {
                    res.render("error", { error, message: error.message });
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
                    req.flash("successMessage", "Your password has been successfully changed!");
                    res.redirect("/login");
                })
                .catch(err => {
                    req.flash("errorMessage", err.message);
                    res.redirect("/");
                });
        },
        searchUsersAjax(req, res) {
            let username = req.query.username;
            data.searchUsers(username)
                .then(users => {
                    let sentUsers = users
                        .slice(0, 10)
                        .map(user => {
                            return {
                                username: user.username,
                                _id: user._id
                            };
                        });

                    res.json(sentUsers);
                });
        }
    };
};