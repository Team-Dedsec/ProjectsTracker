/* globals require module */
module.exports = function(server, controller, isAuthenticated) {
    server.get("/projects", controller.viewAllProjects);
    server.get("/projects/create", isAuthenticated, controller.getRegister);
    server.post("/projects/create", isAuthenticated, controller.postProject);
    server.get("/projects/:id", isAuthenticated, controller.getProjectById);
};