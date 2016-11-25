/* globals require */
const Project = require("../models/project-model");
const data = require("../data")({ Project });

module.exports = {
    viewAllProjects(req, res) {
        data.getAllProjects().then(projects => res.render("../views/projects.pug", { projects }));
    }
};

