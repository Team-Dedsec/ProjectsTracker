/* globals require module*/
"use strict";
module.exports = function (data) {
    return {
        viewAllProjects(req, res, next) {
            // if (req.isAuthenticated() === false) {
            //     data.getAllPublicProjects().then((projects) => {
            //         res.render("../views/projects.pug", { projects });
            //     });
            // } else {
            //     data.getAllProjects().then((projects) => {
            //         res.render("../views/projects.pug", { projects });
            //     });
            // }
            data.paginatedProjects(req.query.page, req.query.limit)
                .then(projects => {
                    res.render("projects", {
                        projects: projects.docs,
                        pageCount: projects.pages,
                        itemCount: projects.total,
                        pages: res.locals.paginate.getArrayPages(3, projects.pages, req.query.page)
                    });
                })
                .catch(err => {
                    next(err);
                });
        },
        getRegister(req, res) {
            res.render("../views/create-project.pug", {});
        },
        postProject(req, res) {
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
            res.render("../views/create-task.pug");
        },
        listUsersToAdd(req, res) {
            data.getAllUsers().then((users) => {
                let projectId = req.params.id;
                res.render("../views/userToAdd.pug", { users, projectId });
            });
        },
        addUserToProject(req, res) {
            data.getProjectById(req.params.id).then((project) => {
                data.findUserById(req.params.userId).then(user => {
                    user.projects.push(project);
                    project.users.push(user);
                    user.save();
                    res.redirect(`/projects/${req.params.id}/addUser`);
                });
            });
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