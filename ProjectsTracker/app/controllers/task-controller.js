"use strict";
module.exports = function (data) {
    return {
        viewAllTasks(req, res) {
            data.getAllTasks().then(tasks => res.render("../views/tasks.pug", { tasks }));
        },

        getCreate(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/login");
            }
            res.render("../views/create-task.pug");
        },

        postTask(req, res) {
            let title = req.body.title;
            let description = req.body.description;
            let priority = req.body.priority;
            let reporter = req.user._id;
            let assignee = req.body.assignee;
            let project = req.user.projectWorkingOnId;
            let status = "Open";
            let comments = [];
            data.createTask(title, description, priority, status, reporter, assignee, project, comments).then((task) => {
                res.redirect(`/tasks/${task._id}`);
            });
        },

        getTaskById(req, res) {
            data.getTaskById(req.params.id).then((task) => {
                res.render("../views/task-details.pug", task);
            });
        },

        resolveTask(req, res) {
            data.resolveTask(req.params.id).then(() => {
                res.redirect(`/tasks/${req.params.id}`);
            });
        },

        closeTask(req, res) {
            data.closeTask(req.params.id).then(() => {
                res.redirect(`/tasks/${req.params.id}`);
            });
        },

        reopenTask(req, res) {
            data.reopenTask(req.params.id).then(() => {
                res.redirect(`/tasks/${req.params.id}`);
            });
        },

        waitingForTask(req, res) {
            data.waitingForTask(req.params.id).then(() => {
                res.redirect(`/tasks/${req.params.id}`);
            });
        },

        duplicateTask(req, res) {
            data.duplicateTask(req.params.id).then(() => {
                res.redirect(`/tasks/${req.params.id}`);
            });
        },

        needMoreInfoTask(req, res) {
            data.needMoreInfoTask(req.params.id).then(() => {
                res.redirect(`/tasks/${req.params.id}`);
            });
        },

        addCommentToTask(req, res) {
            if (req.isAuthenticated()) {
                let content = req.body.content;
                let user = req.user.username;
                data.addCommentToTask(req.params.id, content, user)
                    .then(() => {
                        res.redirect(`/tasks/${req.params.id}`);
                    })
                    .catch(err => {
                        req.flash("error_msg", err.message);
                        res.redirect("/");
                    });
            } else {
                req.flash("error_msg", "You must be logged in to do that!");
                res.redirect("/login");
            }
        }
    };
};