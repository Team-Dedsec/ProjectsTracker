/* globals require */
const Project = require("../models/project-model");
const data = require("../data")({ Project });

module.exports = {
    viewAllProjects(req, res) {
        data.getAllProjects().then(projects => res.render("../views/projects.pug", { projects }));
    },
    createProject(req, res) {
        console.log(req);
        //data.createProject(req.title, req.leadUser, req.descripion).then(project => res.render("../views/create-project.pug", { project }));
    }
};

