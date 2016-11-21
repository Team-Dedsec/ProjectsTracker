/* globals require module Promise */
"user strict";

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
        }
    };
};