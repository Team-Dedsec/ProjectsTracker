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
                    data.createTask(title, description, priority, user, assignee[0], projectId, comments).then(task => {
                        project.tasks.push(task);
                        project.save();
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
        changeTaskStatus(req, res) {
            // TODO: check if user can change status
            let status = req.body.status;
            let taskId = req.params.id;
            return data.changeTaskStatus(req.params.id, status)
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
            return data.addCommentToTask(req.params.id, content, user)
                .then(() => {
                    req.flash("success_msg", "Comment added successfully!");
                    res.redirect(`/tasks/${req.params.id}`);
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
        }
    };
};