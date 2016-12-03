"use strict";
module.exports = function (data) {
    return {
        viewAllTasks(req, res) {
            data.getAllTasks().then(tasks => res.render("../views/tasks.pug", { tasks }));
        },
        getCreate(req, res) {
            console.log(req.body);
            res.render("../views/create-task.pug");
        },
        postTask(req, res) {
            data.getProjectById(req.params.id).then(project => {
                data.findUserByUsername(req.body.assignee).then(assignee => {
                    let title = req.body.title,
                        description = req.body.description,
                        priority = req.body.priority,
                        user = req.user,
                        projectId = project,
                        comments = [];
                        console.log("Task User");
                        console.log(user);
                    data.createTask(title, description, priority, user, assignee[0], projectId, comments).then(task => {
                        project.tasks.push(task);
                        project.save();
                        req.flash("success_msg", "Added task with id: " + task._id);
                        res.redirect(`/tasks/${task._id}`);
                    });
                });
            });
        },
        getTaskById(req, res) {
            return data.getTaskById(req.params.id)
                .then((task) => {
                    res.render("task-details", task);
                })
                .catch(err => {
                    req.flash("error_msg", err.message);
                    res.redirect("/");
                });
        },
        findTasksByAsignee(req, res) {
            return data.findTasksByAsignee(req.params.username).then((tasks) => {
                res.render("../views/tasks.pug", { tasks });
            });
        },
        findTasksByReporter(req, res) {
            return data.findTasksByReporter(req.params.username).then((tasks) => {
                res.render("../views/tasks.pug", { tasks });
            });
        },
        findTasksByPriority(req, res) {
            return data.findTasksByPriority(req.params.priority).then((tasks) => {
                res.render("../views/tasks.pug", { tasks });
            });
        },
        findTasksByStatus(req, res) {
            return data.findTasksByStatus(req.params.status).then((tasks) => {
                res.render("../views/tasks.pug", { tasks });
            });
        },
        changeTaskStatus(req, res) {
            // TODO: check if user can change status
            let status = req.body.status;
            let taskId = req.params.id;
            return data.changeTaskStatus(taskId, status)
                .then(() => {
                    res.redirect(`/tasks/${taskId}`);
                })
                .catch(() => {
                    req.flash("error_msg", "Invalid task status!");
                    res.redirect(`/tasks/${taskId}`);
                });
        },
        addCommentToTask(req, res) {
            // TODO: check if user can add comment
            let content = req.body.content;
            let user = req.user.username;
            let taskId = req.params.id;
            return data.addCommentToTask(taskId, content, user)
                .then(() => {
                    req.flash("success_msg", "Comment added successfully!");
                    res.redirect(`/tasks/${taskId}`);
                })
                .catch(err => {
                    req.flash("error_msg", err.message);
                    res.redirect("/");
                });
        },
        deleteCommentFromTask(req, res) {
            let commentId = req.body.commentId;
            let taskId = req.params.id;
            return data.deleteComment(commentId, taskId)
                .then(() => {
                    req.flash("success_msg", "Comment removed successfully!");
                    res.redirect(`/tasks/${taskId}`);
                })
                .catch(err => {
                    req.flash("error_msg", err.message);
                    res.redirect("/");
                });
        },
        getEditTask(req, res) {
            return data.getTaskById(req.params.id).then((task) => {
                res.render("../views/edit-task.pug", task);
            });
        },
        postEditTask(req, res) {
            let taskId = req.params.id;
            return data.editTask(taskId, req.body)
                .then(() => {
                    req.flash("success_msg", "Task edited successfully!");
                    res.redirect(`/tasks/${taskId}`);
                })
                .catch(() => {
                    req.flash("error_msg", "Invalid task parameters!");
                    res.redirect(`/tasks/${taskId}`);
                });
        },
        getReassign(req, res) {
            return data.getTaskById(req.params.id).then((task) => {
                res.render("../views/reassignTask.pug", task);
            });
        },
        postReassign(req, res) {
            let taskId = req.params.id;
            return data.findUserByUsername(req.body.assignee).then(assignee => {
                data.reassign(taskId, assignee[0]).then(() => {
                    req.flash("success_msg", "Assignee changed successfully!");
                    res.redirect(`/tasks/${taskId}`);
                })
                .catch(() => {
                    req.flash("error_msg", "Invalid assignee!");
                    res.redirect(`/tasks/${taskId}`);
                });
            });
        }
    };
};