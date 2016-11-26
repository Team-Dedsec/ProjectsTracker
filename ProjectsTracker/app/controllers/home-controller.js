"use strict";

const Project = require("../models/project-model");
const Task = require("../models/task-model");
const User = require("../models/user-model");
const data = require("../data")({
    Project, Task, User
});


module.exports = {
    homePage(req, res) {
        res.render("../views/home-page.pug");
    },
    search(req, res, next) {
        let typeOfSearch = req.query.searchType;
        switch (typeOfSearch) {
            case "Users":
                data.findUserByUsername(req.query.q)
                    .then(user => {
                        res.render("user-details", { user });
                    });
                break;
            case "Tasks":
                res.status(502);
                throw new Error("Not implemented!");
                break;
            case "Projects":
                data.searchProjects(req.query.s)
                    .then(projects => {
                        res.render("../views/projects.pug", { projects });
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
