const controller = require("../controllers/home-controller");


module.exports = function(server) { 
    



    server.get("/", controller.index)
           .get("/index", controller.getProjectByTitle);

    
};