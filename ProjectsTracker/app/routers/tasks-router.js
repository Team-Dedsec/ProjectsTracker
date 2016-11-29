/* globals require */
module.exports = function(server, controller) {
    server.get("/tasks", controller.viewAllTasks);
    server.get("/tasks/create", controller.getCreate);
    server.post("/tasks/create", controller.postTask);
    server.get("/tasks/:id", controller.getTaskById);
    server.get("/tasks/resolveTask/:id", controller.resolveTask);
    server.get("/tasks/closeTask/:id", controller.closeTask);
    server.get("/tasks/reopenTask/:id", controller.reopenTask);
    server.get("/tasks/waitingForTask/:id", controller.waitingForTask);
    server.get("/tasks/duplicateTask/:id", controller.duplicateTask);
    server.get("/tasks/needMoreInfoTask/:id", controller.needMoreInfoTask);
};