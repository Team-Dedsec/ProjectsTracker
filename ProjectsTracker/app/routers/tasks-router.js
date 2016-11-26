/* globals require */
const controller = require("../controllers/task-controller");

module.exports = function(server) {
    server.get("/tasks", controller.viewAllTasks);
    server.get("/tasks/create", controller.getCreate);
    server.post("/tasks/create", controller.postTask);
    server.get("/tasks/:id");
};