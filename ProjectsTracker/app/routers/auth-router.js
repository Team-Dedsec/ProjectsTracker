"use strict";
let passport = require("passport");

module.exports = function (server, authController) {
    server.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

    server.get("/auth/facebook/return", passport.authenticate("facebook", { failureRedirect: "/login" }), authController.externalLoginSuccess);

    server.get("/auth/github", passport.authenticate("github"));

    server.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), authController.externalLoginSuccess);

    server.post("/login", authController.loginLocal);

    server.get("/login", authController.login);
    server.get("/logout", authController.logout);
};