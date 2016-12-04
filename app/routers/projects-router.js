/* globals require module */
module.exports = function(server, controller, isAuthenticated) {
    server.get("/projects", controller.viewAllProjects);
    server.get("/projects/create", isAuthenticated, controller.getRegister);
    server.post("/projects/create", isAuthenticated, controller.postProject);
    server.get("/projects/:id", controller.getProjectById)
    .get("/projects/:id/createTask", isAuthenticated, controller.createTaskToProject);
    server.post("/projects/:id/createTask", isAuthenticated, controller.postTask);
    server.get("/projects/:id/addUser", isAuthenticated, controller.listUsersToAdd);
    server.post("/projects/:id/addUser/:userId", isAuthenticated, controller.addUserToProject);
};