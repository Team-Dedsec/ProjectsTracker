/* globals require module Promise */
"use strict";

module.exports = function (models) {
    let {Project} = models;

    return {
        createProject(title, description, leadUser, type) {
            let isPrivate = false;
            let tasks = [];
            let users = [];
            if (type === "private") {
                isPrivate = true;
            }

            let project = new Project({
                title,
                description,
                leadUser,
                isPrivate,
                tasks,
                users
            });

            return new Promise((resolve, reject) => {
                project.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(project);
                });
            });
        },
        getAllProjects() {
            return new Promise((resolve, reject) => {
                Project.find((err, projects) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(projects);
                });
            });
        },
        getAllPublicProjects() {
            let query = {"isPrivate": false};
            return new Promise((resolve, reject) => {
                Project.find(query)
                    .exec((err, projects) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(projects);
                    });
            });
        },
        getProjectByTitle(title) {
            return new Promise((resolve, reject) => {
                Project.find()
                    .byTitle(title)
                    .exec((err, project) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(project);
                    });
            });
        },
        getProjectById(id) {
            return new Promise((resolve, reject) => {
                Project.findOne({_id: id}, (err, project) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(project);
                });
            });
        },
        searchProjects(title) {
            let query = {"title": new RegExp(`${title}`, "i")};
            return new Promise((resolve, reject) => {
                Project.find(query)
                    .exec((err, projects) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(projects);
                    });
            });
        },
        addUserToProject(projectId, userId) {
            this.getProjectById(projectId).then(project => {
                project.users.push(userId);
            });
        },
        addTaskToProject(projectId, task) {
            this.getProjectById(projectId).then(project => {
                project.tasks.push(task);
            });
        },
        getProjectsForUser(userId) {
            let query = {"leadUser._id": userId};
            return new Promise((resolve, reject) => {
                Project.find(query)
                    .exec((err, projects) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(projects);
                    });
            });
        },
        deleteProject(id) {
            return new Promise((resolve, reject) => {
                Project.findOneAndRemove({_id: id}, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve();
                });
            });
        },
        paginatedProjects(page, limit) {
            return new Promise((resolve, reject) => {
                Project.paginate({}, {
                    page,
                    limit
                }, (err, projects) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(projects);
                });
            });
        }
    };
};