module.exports = function(server, controller) {

    // console.log("index route");
    server.get("/", controller.homePage);
    // server.get("/projects", controller.viewAllProjects);
    server.get("/search", controller.search);

};
