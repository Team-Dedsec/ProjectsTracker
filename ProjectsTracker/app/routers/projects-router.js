/* globals require */
const controller = require("../controllers/project-controller");

module.exports = function(server) {
    server.get("/projects", controller.viewAllProjects);    
};