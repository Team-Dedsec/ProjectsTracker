/* globals require */
"use strict";

module.exports = function (data) {
    return {
        homePage(req, res) {
            let options = { successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage") };
            res.render("home-page", { options });
        },
        search(req, res, next) {
            let typeOfSearch = req.query.searchType;
            let searchTerm = req.query.s;
            switch (typeOfSearch) {
            case "Users":
                data.searchUsers(searchTerm)
                    .then(users => {
                        res.render("users", { users });
                    })
                    .catch(err => {
                        res.status(500);
                        next(err, req, res);
                    });
                break;
            case "Tasks":
                if (!req.isAuthenticated()) {
                    req.flash("errorMessage", "You must be logged in to do that!");
                    res.status(401).redirect("/login");
                    return;
                }

                data.searchTasks(searchTerm)
                    .then(tasks => {
                        res.render("tasks", { tasks });
                    })
                    .catch((err) => {
                        res.status(500);
                        next(err, req, res);
                    });
                break;
            case "Projects":
                data.searchProjects(searchTerm)
                    .then(dbProjects => {
                        let projects;
                        if (req.isAuthenticated()) {
                            projects = dbProjects;
                        } else {
                            projects = dbProjects.filter(pr => !pr.isPrivate);
                        }
                        res.render("projects", { projects });
                    })
                    .catch((err) => {
                        res.status(500);
                        next(err, req, res);
                    });
                break;
            default:
                res.status(502);
                throw new Error("Invalid search type!");
            }
        }
    };
};