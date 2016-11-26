"use strict";

const Project = require("../models/project-model");
const Task = require("../models/task-model");
const User = require("../models/user-model");
const data = require("../data")({
    Project, Task, User
});


module.exports = {
    homePage(req, res) {
        res.render("home-page");
    },
    search(req, res, next) {
        let typeOfSearch = req.query.searchType;
        let searchTerm = req.query.s;
        switch (typeOfSearch) {
            case "Users":
                data.searchUsers(searchTerm)
                    .then(users => {
                        res.render("user-list", { users });
                    })
                    .catch(err => {
                        res.status(500);
                        next(err, req, res);
                    });
                break;
            case "Tasks":
                res.status(502);
                throw new Error("Not implemented!");
                break;
            case "Projects":
                data.searchProjects(searchTerm)
                    .then(projects => {
                        res.render("projects", { projects });
                    })
                    .catch((err) => {
                        res.status(500);
                        next(err, req, res);
                    });
                break;
            default:
                res.status(502);
                throw new Error("Not implemented!");
        }
    },

};
