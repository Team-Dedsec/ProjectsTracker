"use strict";

module.exports = function (data) {
    return {
        homePage(req, res) {
            res.render("home-page", { req });
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
    }
};
