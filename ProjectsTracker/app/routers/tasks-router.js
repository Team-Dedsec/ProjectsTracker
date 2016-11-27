/* globals require */
module.exports = function(server, controller) {
    server.get("/tasks", controller.viewAllTasks);
    server.get("/tasks/create", controller.getCreate);
    server.post("/tasks/create", controller.postTask);
    server.get("/tasks/:id", controller.getTaskById);
};