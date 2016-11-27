/* globals require module Promise */
"use strict";

module.exports = function (models) {
    let { Task } = models;

    return {
        createTask(title, description, priority, status, reporter, assignee, project, comments) {
            let createdDate = Date.now(),
                updatedDate = Date.now(),
                dueDate = addDays(Date.now(), 14);

            console.log(createdDate);
            console.log(updatedDate);
            console.log(dueDate);
            console.log(status);
            
            function addDays(date, days) {
                var result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }

            let task = new Task({
                title,
                description,
                priority,
                createdDate,
                updatedDate,
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

        getAllTasks() {
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
                Task.findById(id).exec((err, user) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    return resolve(task);
                });
            });
        }
    };
};