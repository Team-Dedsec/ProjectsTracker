const controller = require("../controllers/home-controller");

module.exports = function(server) {

    //console.log("index route");
    server.get("/", controller.homePage);
    //server.get("/projects", controller.viewAllProjects);

};
