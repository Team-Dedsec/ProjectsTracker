/* globals require module Promise */
"use strict";

module.exports = function (models) {
    let { Task } = models;

    return {
        createTask(name, description, priority, dueDate, reporter, assignee, project) {
            let createDate = Date.now(),
                updateDate = Date.now(),
                status = "Open",
                comments = [];

            let task = new Task({
                name,
                description,
                priority,
                createDate,
                updateDate,
                dueDate,
                reporter,
                assignee,
                status,
                project,
                comments
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