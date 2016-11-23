const controller = require("../controllers/home-controller");


module.exports = function(server) {    

    server.get("/", controller.index);
};