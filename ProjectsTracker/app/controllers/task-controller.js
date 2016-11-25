const Task = require("../models/task-model");
const data = require("../data")({ Task });

module.exports = {
    viewAllTasks(req, res) {
        data.getAllTasks().then(tasks => res.render("../views/tasks.pug", { tasks }));
    },
    createTask(req, res) {
        let { name, description, priority, dueDate, reporter, assignee, project } = req.body;

        return data.createTask(name, description, priority, dueDate, reporter, assignee, project)
            .then(task => {
                return res.redirect("/task-details");
            })
            .catch(err => {
                res.status(400).send(err);
            });
    }
};
