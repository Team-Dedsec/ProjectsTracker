module.exports = function(server, controller) {

    // console.log("index route");
    server.get("/", controller.homePage);
    // server.get("/projects", controller.viewAllProjects);
    server.get("/search", controller.search);

    server.get("/settings/users", controller.viewSettingsAllUsers);

    server.get("/settings/projects", controller.viewSettingsAllProjects);

    server.get("/settings/tasks", controller.viewSettingsAllTasks);
};
