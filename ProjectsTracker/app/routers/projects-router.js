/* globals require module */
const controller = require("../controllers/project-controller");

module.exports = function(server) {
    //let router = server.Router();

    server.get("/projects", controller.viewAllProjects);
    server.get("/projects/create", controller.getRegister);
    server.post("/projects/create", controller.postProject);
    server.get("/projects/:id", controller.getProjectById);
        //server.get("/project/:name", controller.loadProject);


};