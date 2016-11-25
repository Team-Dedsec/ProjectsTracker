"use strict";

const User = require("../models/user-model");
const data = require("../data")({ User });

module.exports = {
    viewAllUsers(req, res) {
        data.getAllUsers().then(users => res.render("../views/users.pug", { users }));
    },
    viewUserByName(req, res) {
        data.findUserByUsername(req.params.name.toLowerCase())
            .then(foundUsers => {
                let user = foundUsers[0];
                res.render("../views/user-details.pug", { user });
            });
    },
    register(req, res) {
        res.render("../views/register.pug");
    },
    login(req, res) {
        res.render("../views/login.pug");
    },
    createUser(req, res) {
        let { firstName, lastName, username, password } = req.body;

        return data.registerUser(firstName, lastName, username.toLowerCase(), password)
            .then(user => {
                return res.redirect(`/user/${user.username}`, user);
            })
            .catch(err => {
                res.status(400)
                    .send(err);
            });
    },
    loginUser(req, res) {
        // TODO:
        let user = req.body.user;
        data.findUserByUsername(user.name.toLowerCase())
            .then((dbUsers) => {
                if (!dbUsers || dbUsers.length !== 1) {
                    res.redirect("/login");
                }
                let dbUser = dbUsers[0];
                if (dbUser.comparePassword(user.password)) {
                    // Login successfull
                    res.redirect("/");
                } else {
                    // Login failed
                    res.redirect("/login");
                }
            });
    }
};