"use strict";

const User = require("../models/user-model"),
      Task = require("../models/task-model"),
      paginate = require("express-paginate");

module.exports = function(data) {
  return {
    viewSettingsAllProjects(req, res) {
      data.getAllProjects().then(projects => res.render("../views/settings-all-projects.pug", {
        projects
      }));
    },
    viewSettingsAllTasks(req, res) {
      Task.paginate({}, {
        page: req.query.page,
        limit: req.query.limit
      }, function(err, tasks) {
        if (err) {
          return next(err);
        }
        res.format({
          html: function() {
            res.render("../views/settings-all-tasks.pug", {
              tasks: tasks.docs,
              pageCount: tasks.pages,
              itemCount: tasks.total,
              pages: res.locals.paginate.getArrayPages(3, tasks.pages, req.query.page)
            });
          },
          json: function() {
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
      }, function(err, users) {
        if (err) {
          return next(err);
        }
        res.format({
          html: function() {
            res.render("../views/settings-all-users.pug", {
              users: users.docs,
              pageCount: users.pages,
              itemCount: users.total,
              pages: res.locals.paginate.getArrayPages(3, users.pages, req.query.page)
            });
          },
          json: function() {
            res.json({
              object: "list",
              has_more: res.locals.paginate.hasNextPages(users.pages),
              data: users.docs
            });
          }
        });
      });
    }
  }
};
