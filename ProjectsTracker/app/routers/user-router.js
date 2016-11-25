/* globals module require */
const userController = require("../controllers/user-controller");

module.exports = function(server) {

    server.get("/users", userController.viewAllUsers);
    server.get("/user", userController.viewUserByName);
    server.get("/register", userController.register);
    server.get("/login", userController.login);
};
