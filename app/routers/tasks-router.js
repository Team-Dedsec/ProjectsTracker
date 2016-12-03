/* globals require */
module.exports = (server, controller, isAuthenticated) => {
    server.get("/tasks", controller.viewAllTasks);
    server.get("/tasks/asignee/:username", isAuthenticated, controller.findTasksByAsignee);
    server.get("/tasks/reporter/:username", isAuthenticated, controller.findTasksByReporter);
    server.get("/tasks/priority/:priority", isAuthenticated, controller.findTasksByPriority);
    server.get("/tasks/status/:status", isAuthenticated, controller.findTasksByStatus);
    server.get("/tasks/create", isAuthenticated, controller.getCreate);
    server.post("/tasks/create", isAuthenticated, controller.postTask);
    server.get("/tasks/edit/:id", isAuthenticated, controller.getEditTask);
    server.post("/tasks/edit/:id", isAuthenticated, controller.postEditTask);
    server.get("/tasks/:id", isAuthenticated, controller.getTaskById);
    server.post("/tasks/:id/add-comment", isAuthenticated, controller.addCommentToTask);
    server.post("/tasks/:id/delete-comment", isAuthenticated, controller.deleteCommentFromTask);
    server.post("/tasks/:id/change-status", isAuthenticated, controller.changeTaskStatus);
};