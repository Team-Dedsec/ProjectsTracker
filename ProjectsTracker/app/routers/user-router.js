/* globals module require */
const userController = require("../controllers/user-controller");

module.exports = function(server) {

    server
         .get("/users", userController.viewAllUsers);
        //.get("/:id", userController.getById)
        //.post("/register", userController.register);
};
