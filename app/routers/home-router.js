"use strict";

const user = require("../config/roles");

module.exports = function (server, controller) {
    server.get("", controller.homePage);
    server.get("/search", controller.search);
    server.get("/settings/users", user.can("access admin page"), controller.viewSettingsAllUsers);
    server.get("/settings/projects", user.can("access admin page"), controller.viewSettingsAllProjects);
    server.get("/settings/tasks", user.can("access admin page"), controller.viewSettingsAllTasks);
    server.get("/settings/users/delete/:id", controller.deleteUserById);
};
