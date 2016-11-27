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
            data.getAllProjects().then(projects => {
                res.render("../views/create-task.pug", projects);                
            });
        },
        postTask(req, res){
            let title = req.body.title;
            let description = req.body.description;
            let priority = req.body.priority;
            let dueDate = req.body.dueDate;
            //let reporter = req.user._id;
            let assignee = req.body.assignee;
            let project = req.body.project;
            data.createTask(title, description, priority, dueDate, project);
        }
    }
};