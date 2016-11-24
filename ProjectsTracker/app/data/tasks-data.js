/* globals require module Promise */
"use strict";

module.exports = function (models) {
    let { Task } = models;

    return {
        createTask(name, description, priority, dueDate, reporter, assignee, project) {
            let task = new Task({
                Name = name,
                Description = description,
                Priority = priority,
                CreatedDate = Date.now(),
                UpdatedDate = Date.now(),
                DueDate = dueDate,
                ReporterID = reporter,
                AssigneeID = assignee,
                Status = "Open",
                ProjectID = project,
                Comments =[]
            });

            return new Promise((resolve, reject) => {
                task.save((err) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    return resolve(task);
                });
            });
        },

        getAlltasks() {
            return new Promise((resolve, reject) => {
                Task.find((err, tasks) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(tasks);
                });
            });
        },

        getTaskById(id) {
            return new Promise((resolve, reject) => {
                Task.find()
                    .byId(id)
                    .exec((err, task) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(task);
                    });
            });
        }
    };
};