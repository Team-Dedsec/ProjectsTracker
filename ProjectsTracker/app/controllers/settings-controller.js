"use strict";

const User = require("../models/user-model"),
      paginate = require("express-paginate");

module.exports = function(data) {
  return {
    viewSettingsAllUsers(req, res) {
      data.getAllUsers().then(users => res.render("../views/settings-all-users.pug", {
        users
      }));
    },
    viewSettingsAllProjects(req, res) {
      data.getAllProjects().then(projects => res.render("../views/settings-all-projects.pug", {
        projects
      }));
    },
    viewSettingsAllTasks(req, res) {
      data.getAllTasks().then(tasks => res.render("../views/settings-all-tasks.pug", {
        tasks
      }));
    },
    viewPaging(req, res, next) {
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
