/* globals require module Promise */
"user strict"

module.exports = function(models) {
    let { Project } = models;

    return {
        createProject(name) {
            let project = new Project({
                name
            });

            return new Promise((resolve, reject) => {
                project.save((err) => {
                    if(err) {
                        return reject(err);
                    }

                    return resolve(project);
                }) ;
            });
        }
    };
};