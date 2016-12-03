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
            data.createProject(title, description, leadUser, projectType)
                .then((project) => {
                    res.redirect(`/projects/${project._id}`);
                })
                .catch(err => {
                    req.flash("error_msg", err.message);
                    res.redirect("/");
                });
        },
        getProjectById(req, res) {
            let tasks;
            let projectId = req.params.id;

            return data.getTasksForProject(projectId)
                .then(projectTasks => {
                    tasks = projectTasks;
                })
                .then(() => {
                    return data.getProjectById(projectId);
                })
                .then(project => {
                    if (project.isPrivate === true && !req.isAuthenticated()) {
                        req.flash("error_msg", "You must be logged in to see a private project!");
                        req.session.returnTo = req.path;
                        res.redirect("/login");
                        return;
                    }
                    req.user.projectWorkingOnId = project;
                    res.render("project", { project, req, tasks });
                })
                .catch(err => {
                    req.flash("error_msg", err.message);
                    res.redirect("/");
                });
        },
        createTaskToProject(req, res) {
            console.log("createTask");
            console.log(req.params.id);
            res.render("../views/create-task.pug");
        },
        listUsersToAdd(req, res) {
            data.getAllUsers().then((users) => {
                res.render("../views/userToAdd.pug", { users });
            });
        }
    };
};