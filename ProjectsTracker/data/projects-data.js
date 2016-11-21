/* globals require module Promise */
"use strict";

module.exports = function(models) {
    let { Project } = models;

    return {
        createProject(title, leadUser) {
            let project = new Project({
                title,
                leadUser
            });

            return new Promise((resolve, reject) => {
                project.save((err) => {
                    if (err) {
                        console.log(err);
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
        }
    };
};


//  TODO:   createProject(title, description, leadUser, users, bugs) {
//             let project = new Project({
//                 title,
//                 description,
//                 leadUser,
//                 users,
//                 bugs
//             });

//             return new Promise((resolve, reject) => {
//                 project.save((err) => {
//                     if (err) {
//                         console.log(err);
//                         return reject(err);
//                     }

//                     return resolve(project);
//                 });
//             });
//         }