/* global require */
"use strict";

/* eslint-disable camelcase */
const User = require("../models/user-model"),
    Task = require("../models/task-model"),
    Project = require("../models/project-model");

module.exports = function(data) {
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
            Project.paginate({}, {
                page: req.query.page,
                limit: req.query.limit
            }, (err, projects) => {
                if (err) {
                    return next(err);
                }
                res.format({
                    html: () => {
                        res.render("../views/settings-all-projects.pug", {
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
            });
        },
        viewSettingsAllTasks(req, res, next) {
            Task.paginate({}, {
                page: req.query.page,
                limit: req.query.limit
            }, (err, tasks) => {
                if (err) {
                    return next(err);
                }
                res.format({
                    html: () => {
                        res.render("../views/settings-all-tasks.pug", {
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
            });
        },
        viewSettingsAllUsers(req, res, next) {
            User.paginate({}, {
                page: req.query.page,
                limit: req.query.limit
            }, (err, users) => {
                if (err) {
                    return next(err);
                }
                res.format({
                    html: () => {
                        res.render("../views/settings-all-users.pug", {
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
            });
        }
    };
};