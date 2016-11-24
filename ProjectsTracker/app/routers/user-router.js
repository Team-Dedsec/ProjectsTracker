/* globals module require */
const data = require("../data/users-data");
const userController = require("../controllers/user-controller")(data);
const express = require("express");

module.exports = function(app) {
  let router = express.Router();

    router
        //.get("/user", userController.getByUsername)
        //.get("/:id", userController.getById)
        .post("/register", userController.register);

    app.use("/users", router.post);
    console.log(app.get("/users", router));

    return router;
};
