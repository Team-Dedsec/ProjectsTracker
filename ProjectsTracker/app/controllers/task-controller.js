module.exports = function (data) {
    return {
        viewAllTasks(req, res) {
            data.getAllTasks().then(tasks => res.render("../views/tasks.pug", { tasks }));
        },

        // createTask(req, res) {
        //     let { name, description, priority, dueDate, reporter, assignee, project } = req.body;

        // return data.createTask(name, description, priority, dueDate, reporter, assignee, project)
        //     .then(task => {
        //         return res.redirect(`/task/${task._id}`);
        //     })
        //     .catch(err => {
        //         res.status(400).send(err);
        //     });
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
                data.getTaskById(req.params.id).then((task) => {
                    res.render("../views/task-details.pug", task);
                });
            });
        },

        closeTask(req, res) {
            data.closeTask(req.params.id).then(() => {
                data.getTaskById(req.params.id).then((task) => {
                    res.render("../views/task-details.pug", task);
                });
            });
        },

        reopenTask(req, res) {
            data.reopenTask(req.params.id).then(() => {
                data.getTaskById(req.params.id).then((task) => {
                    res.render("../views/task-details.pug", task);
                });
            });
        },

        waitingForTask(req, res) {
            data.waitingForTask(req.params.id).then(() => {
                data.getTaskById(req.params.id).then((task) => {
                    res.render("../views/task-details.pug", task);
                });
            });
        },

        duplicateTask(req, res) {
            data.duplicateTask(req.params.id).then(() => {
                data.getTaskById(req.params.id).then((task) => {
                    res.render("../views/task-details.pug", task);
                });
            });
        },

        needMoreInfoTask(req, res) {
            data.needMoreInfoTask(req.params.id).then(() => {
                data.getTaskById(req.params.id).then((task) => {
                    res.render("../views/task-details.pug", task);
                });
            });
        }
    };
};