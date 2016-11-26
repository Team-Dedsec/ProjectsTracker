/* globals require */
const controller = require("../controllers/project-controller");

module.exports = function(server) {
    server.get("/projects", controller.viewAllProjects);
    server.get("/projects/create", controller.getRegister);
    server.post("/projects/create", controller.postProject);
    server.get("/project/:name");
    server.get("/search", controller.searchProjects);
};