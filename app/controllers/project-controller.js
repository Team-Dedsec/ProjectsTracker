/* globals require module*/
"use strict";
module.exports = function (data) {
    return {
        viewAllProjects(req, res) {
            if (req.isAuthenticated() === false) {
                data.getAllPublicProjects().then((projects) => {
                    res.render("../views/projects.pug", { projects });
                });
            } else {
                data.getAllProjects().then((projects) => {
                    res.render("../views/projects.pug", { projects });
                });
            }
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
                    leadUser.projects.push(project);
                    res.redirect(`/projects/${project._id}`);
                })
                .catch(err => {
                    req.flash("errorMessage", err.message);
                    res.redirect("/projects/create");
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
                        req.flash("errorMessage", "You must be logged in to see a private project!");
                        req.session.returnTo = req.path;
                        res.redirect("/login");
                        return;
                    }

                    if (req.user) {
                        req.user.projectWorkingOnId = project;
                    }

                    res.render("project", { project, req, tasks });
                })
                .catch(err => {
                    req.flash("errorMessage", err.message);
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
                let projectId = req.params.id;
                res.render("../views/userToAdd.pug", { users, projectId });
            });
        },
        addUserToProject(req, res){
            data.getProjectById(req.params.id).then((project) => {
                data.findUserById(req.params.userId).then((user) => {
                    user.projectWorkingOnId.push(project);
                    project.userContributetTo.push(user);
                    console.log(user.projectWorkingOnId[0]);
                    res.redirect(`/projects/${req.params.id}/addUser`);
                });
            });
            console.log("params");
            console.log(req.params);
            console.log(req.body);
        },
        displayCurrentUserProjects(req, res) {
            let userId = req.user._id;
            data.getProjectsForUser(userId)
                .then(projects => {
                    res.render("projects", { projects });
                })
                .catch(err => {
                    req.flash("errorMessage", err.message);
                    res.redirect("/");
                });
        }
    };
};