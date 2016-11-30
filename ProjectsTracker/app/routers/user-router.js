/* globals module require */
"use strict";
const user = require("../config/roles");

module.exports = (server, userController, isAuthenticated) => {
    server.get("/users", userController.viewAllUsers);
    server.get("/user/:name", userController.viewUserByName);
    server.get("/register", userController.registerPage);
    server.post("/register", userController.createUser);
    server.get("/profile", isAuthenticated, userController.getProfile);

    server.post("/login", userController.loginLocal);

    server.get("/login", userController.login);
    server.get("/logout", userController.logout);

    server.get("/admin", user.can("access admin page"), userController.admin);
    server.get("/forgot", userController.forgot);
    server.post("/forgot", userController.handleForgottenPassword);

    server.get("/reset/:token", userController.showResetPassword);
    server.post("/reset", userController.resetPassword);
};
