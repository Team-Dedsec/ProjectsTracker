/* globals require module*/
"use strict";
module.exports = function (data) {
    return {
        viewAllProjects(req, res) {
            data.getAllProjects().then((projects) => {
                res.render("../views/projects.pug", { projects });
            });
        },
        getRegister(req, res) {
            res.render("../views/create-project.pug", {});
        },
        postProject(req, res) {
            // console.log(req.user);
            let title = req.body.name;
            let description = req.body.description;
            let projectType = req.body.type;
            let leadUser = req.user;
            data.createProject(title, description, leadUser, projectType).then((project) => {
                res.redirect(`/projects/${project._id}`);
            });
        },
        loadProject(req, res) {
            console.log(req.params.name);
            res.send("<h1>Pesho</h1>");
        },
        getProjectById(req, res) {
            if (!req.isAuthenticated()) {
                data.getProjectById(req.params.id).then((project) => {
                    if (project.isPrivate === true) {
                        res.redirect("/login");
                    }
                    res.render("../views/project.pug", project);
                });
            }
            data.getProjectById(req.params.id).then((project) => {
                console.log(project);
                res.render("../views/project.pug", { project, req });
            });
        },
        addUserToProject(req, res) {
            console.log("Params");
            console.log(req.params);
            console.log("Body");
            console.log(req.body);
            res.render("../views/home-page.pug");
        }
    };
};