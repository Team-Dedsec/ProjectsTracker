"use strict";
const fs = require("fs"),
    path = require("path");

function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash("errorMessage", "You must be logged in to do that!");
    req.session.returnTo = req.path;
    res.status(401).redirect("/login");
}

module.exports = function (server, controller) {
    fs.readdirSync(__dirname)
        .filter(fileName => fileName.indexOf("-router") !== -1)
        .forEach((routerName) => {
            const router = require(path.join(__dirname, `/${routerName}`));
            router(server, controller, isAuthenticated);
        });
};