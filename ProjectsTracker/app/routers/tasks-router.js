/* globals require */
module.exports = (server, controller, isAuthenticated) => {
    server.get("/tasks", controller.viewAllTasks);
    server.get("/tasks/create", isAuthenticated, controller.getCreate);
    server.post("/tasks/create", isAuthenticated, controller.postTask);
    server.get("/tasks/:id", isAuthenticated, controller.getTaskById);
    server.post("/tasks/:id/add-comment", isAuthenticated, controller.addCommentToTask);
    server.post("/tasks/:id/delete-comment", isAuthenticated, controller.deleteCommentFromTask);

    server.get("/tasks/resolveTask/:id", isAuthenticated, controller.resolveTask);
    server.get("/tasks/closeTask/:id", isAuthenticated, controller.closeTask);
    server.get("/tasks/reopenTask/:id", isAuthenticated, controller.reopenTask);
    server.get("/tasks/waitingForTask/:id", isAuthenticated, controller.waitingForTask);
    server.get("/tasks/duplicateTask/:id", isAuthenticated, controller.duplicateTask);
    server.get("/tasks/needMoreInfoTask/:id", isAuthenticated, controller.needMoreInfoTask);
};