/* globals require module Promise*/
"use strict";

module.exports = function (models) {
    let { Task } = models;

    return {
        createTask(title, description, priority, user, assigneeFull, projectId, comments) {
            function addDays(date, days) {
                let result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }

            let createdDate = Date.now(),
                updatedDate = Date.now(),
                dueDate = addDays(Date.now(), 14),
                reporter = { username: user.username, role: user.role },
                assignee = { username: assigneeFull.username, role: assigneeFull.role };

            let task = new Task({
                title,
                description,
                priority,
                createdDate,
                updatedDate,
                dueDate,
                reporter,
                assignee,
                projectId,
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
        deleteTask(id){
            return new Promise((resolve, reject) => {
              Task.findOneAndRemove({_id: id}, (err)=>{
                if (err) {
                  return reject(err);
                }

                return resolve();
              })
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
        findTasksByAsignee(username) {
            return new Promise((resolve, reject) => {
                Task.find({ "assignee.username": username })
                    .exec((err, tasks) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(tasks);
                    });
            });
        },
        findTasksByReporter(username) {
            return new Promise((resolve, reject) => {
                Task.find({ "reporter.username": username })
                    .exec((err, tasks) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(tasks);
                    });
            });
        },
        findTasksByPriority(priority) {
            return new Promise((resolve, reject) => {
                Task.find({ "priority": priority })
                    .exec((err, tasks) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(tasks);
                    });
            });
        },
        findTasksByStatus(status) {
            return new Promise((resolve, reject) => {
                Task.find({ "status": status })
                    .exec((err, tasks) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(tasks);
                    });
            });
        },
        changeTaskStatus(taskId, status) {
            return new Promise((resolve, reject) => {
                Task.update(
                    { _id: taskId },
                    { $set: { status } },
                    { safe: true, upsert: true, runValidators: true })
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
                    { safe: true, upsert: true, runValidators: true },
                    (err, model) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(model);
                    }
                );
            });
        },
        deleteComment(commentId, taskId) {
            return new Promise((resolve, reject) => {
                Task.update(
                    { _id: taskId, "comments._id": commentId },
                    { $set: { "comments.$.isDeleted": true } },
                    { safe: true, upsert: true },
                    (err, model) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(model);
                    }
                );
            });
        },
        getTasksForProject(projectId) {
            let query = { "projectId._id": projectId };
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
        editTask(taskId, params) {
            return new Promise((resolve, reject) => {
                Task.update(
                    { _id: taskId },
                    {
                        $set: {
                            title: params.title,
                            description: params.description,
                            priority: params.priority
                        }
                    },
                    { safe: true, upsert: true, runValidators: true })
                    .exec((err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    }
                );
            });
        },
        reassign(taskId, assignee) {
            return new Promise((resolve, reject) => {
                let newAssignee = {
                    username: assignee.username,
                    role: assignee.role
                };

                Task.update({ _id: taskId }, { $set: { assignee: newAssignee } },
                    { safe: true, upsert: true, runValidators: true })
                    .exec((err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    }
                );
            });
        }
    };
};
