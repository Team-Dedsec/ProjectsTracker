const Project = require("../models/project-model");
const data = require("../data")({ Project });


module.exports = {
    index(req, res) {
<<<<<<< .mine
        //// TODO: parse json - pug integration 
=======
        // TODO: parse json - pug integration
>>>>>>> .theirs
        // data.getAllProjects().then(projects => res.json(projects))
        // .then(jsonProjects => res.render("../views/index.pug", { title: "JSONPLACE" }));
        res.render("../views/index.pug", { title: "Bugs" });
    }
};
