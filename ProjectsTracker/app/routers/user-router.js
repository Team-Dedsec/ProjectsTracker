/* globals module require */
const userController = require("../controllers/user-controller");

module.exports = function (server) {
    let passport = require("../config/facebook-authentication.js");

    server.get("/users", userController.viewAllUsers);
    server.get("/user/:name", userController.viewUserByName);
    server.get("/register", userController.register);
    server.post("/register", userController.createUser);

    server.post("/login", userController.loginUser);
    server.get("/login", userController.login);

    server.get("/login/facebook",
        passport.authenticate("facebook"));

    server.get("/auth/facebook/return",
        passport.authenticate("facebook", {
            failureRedirect: "/login"
        }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect("/");
        });
};
