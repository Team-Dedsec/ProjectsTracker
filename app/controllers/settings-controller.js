/* global require */
"use strict";

/* eslint-disable camelcase */
module.exports = function (data) {
    return {
        deleteUserById(req, res) {
            data.deleteUser(req.params.id).then(() => res.redirect("/settings/users"));
        },
        deleteProjectById(req, res) {
            data.deleteProject(req.params.id).then(() => res.redirect("/settings/projects"));
        },
        deleteTaskById(req, res) {
            data.deleteTask(req.params.id).then(() => res.redirect("/settings/tasks"));
        },
        viewSettingsAllProjects(req, res, next) {
            data.paginatedProjects(req.query.page, req.query.limit)
                .then(projects => {
                    res.format({
                        html: () => {
                            res.render("settings-all-projects", {
                                projects: projects.docs,
                                pageCount: projects.pages,
                                itemCount: projects.total,
                                pages: res.locals.paginate.getArrayPages(3, projects.pages, req.query.page)
                            });
                        },
                        json: () => {
                            res.json({
                                object: "list",
                                has_more: res.locals.paginate.hasNextPages(projects.pages),
                                data: projects.docs
                            });
                        }
                    });
                })
                .catch(err => {
                    next(err);
                });
        },
        viewSettingsAllTasks(req, res, next) {
            data.paginatedTasks(req.query.page, req.query.limit)
                .then(tasks => {
                    res.format({
                        html: () => {
                            res.render("settings-all-tasks", {
                                tasks: tasks.docs,
                                pageCount: tasks.pages,
                                itemCount: tasks.total,
                                pages: res.locals.paginate.getArrayPages(3, tasks.pages, req.query.page)
                            });
                        },
                        json: () => {
                            res.json({
                                object: "list",
                                has_more: res.locals.paginate.hasNextPages(tasks.pages),
                                data: tasks.docs
                            });
                        }
                    });
                })
                .catch(err => {
                    next(err);
                });
        },
        viewSettingsAllUsers(req, res, next) {
            data.paginatedUsers(req.query.page, req.query.limit)
                .then(users => {
                    res.format({
                        html: () => {
                            res.render("settings-all-users", {
                                users: users.docs,
                                pageCount: users.pages,
                                itemCount: users.total,
                                pages: res.locals.paginate.getArrayPages(3, users.pages, req.query.page)
                            });
                        },
                        json: () => {
                            res.json({
                                object: "list",
                                has_more: res.locals.paginate.hasNextPages(users.pages),
                                data: users.docs
                            });
                        }
                    });
                })
                .catch(err => {
                    next(err);
                });
        }
    };
};