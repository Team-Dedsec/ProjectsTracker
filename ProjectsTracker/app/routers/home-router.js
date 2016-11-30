module.exports = function (server, controller) {
    server.get("/", controller.homePage);
    server.get("/search", controller.search);
    server.get("/settings/users", controller.viewSettingsAllUsers);
    server.get("/settings/projects", controller.viewSettingsAllProjects);
    server.get("/settings/tasks", controller.viewSettingsAllTasks);
};