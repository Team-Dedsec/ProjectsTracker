/* globals require module Promise*/
"use strict";

module.exports = function (models) {
    let { Task } = models;

    return {
        createTask(title, description, priority, status, reporter, assignee, project, comments) {
            let createdDate = Date.now(),
                updatedDate = Date.now(),
                dueDate = addDays(Date.now(), 14);

            function addDays(date, days) {
                let result = new Date(date);
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
                Task.findById(id).exec((err, task) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(task);
                });
            });
        },

        searchTasks(title) {
            let query = { "title": new RegExp(`${title}`, "i") };
            return new Promise((resolve, reject) => {
                Task.find(query)
                    .exec((err, tasks) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(tasks);
                    });
            });
        },

        resolveTask(id) {
            return new Promise((resolve, reject) => {
                Task.update({ _id: id }, { status: "Resolved", updatedDate: Date.now() })
                    .exec((err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
            });
        },

        closeTask(id) {
            return new Promise((resolve, reject) => {
                Task.update({ _id: id }, { status: "Closed", updatedDate: Date.now() })
                    .exec((err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
            });
        },

        reopenTask(id) {
            return new Promise((resolve, reject) => {
                Task.update({ _id: id }, { status: "Reopened", updatedDate: Date.now() })
                    .exec((err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
            });
        },

        waitingForTask(id) {
            return new Promise((resolve, reject) => {
                Task.update({ _id: id }, { status: "Waiting For", updatedDate: Date.now() })
                    .exec((err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
            });
        },

        duplicateTask(id) {
            return new Promise((resolve, reject) => {
                Task.update({ _id: id }, { status: "Duplicate", updatedDate: Date.now() })
                    .exec((err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
            });
        },

        needMoreInfoTask(id) {
            return new Promise((resolve, reject) => {
                Task.update({ _id: id }, { status: "Need More Info", updatedDate: Date.now() })
                    .exec((err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
            });
        },

        addCommentToTask(id, content, username) {
            return new Promise((resolve, reject) => {
                Task.findByIdAndUpdate(
                    id,
                    { $push: { "comments": { content, username } } },
                    { safe: true, upsert: true },
                    (err, model) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(model);
                    }
                );
            });
        }
    };
};