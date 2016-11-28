"use strict";

module.exports = function (data) {
    return {
      viewSettingsAllUsers(req, res) {
          data.getAllUsers().then(users => res.render("../views/settings-all-users.pug", { users }));
      },
      viewSettingsAllProjects(req, res) {
          data.getAllProjects().then(projects => res.render("../views/settings-all-projects.pug", { projects }));
      },
      viewSettingsAllTasks(req, res) {
        data.getAllTasks().then(tasks => res.render("../views/settings-all-tasks.pug", {tasks}));
      }
    }
  };
