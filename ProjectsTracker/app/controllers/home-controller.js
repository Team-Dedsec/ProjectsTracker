const Project = require("../models/project-model");
const data = require("../data")({ Project });


module.exports = {
    index(req, res) {       
        // TODO: parse json - pug integration

        // data.getAllProjects().then(projects => res.json(projects))
        // .then(jsonProjects => res.render("../views/index.pug", { title: "JSONPLACE" }));
        res.render("../views/index.pug", { title: "Bugs" });
    }
};