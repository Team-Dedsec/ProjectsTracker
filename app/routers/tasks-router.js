/* globals require */
module.exports = (server, controller, isAuthenticated) => {
    server.get("/tasks", controller.viewAllTasks);
    server.get("/tasks/create", isAuthenticated, controller.getCreate);
    server.post("/tasks/create", isAuthenticated, controller.postTask);
    server.get("/tasks/:id", isAuthenticated, controller.getTaskById);
    server.post("/tasks/:id/add-comment", isAuthenticated, controller.addCommentToTask);
    server.post("/tasks/:id/delete-comment", isAuthenticated, controller.deleteCommentFromTask);
    server.post("/tasks/:id/change-status", isAuthenticated, controller.changeTaskStatus);
};