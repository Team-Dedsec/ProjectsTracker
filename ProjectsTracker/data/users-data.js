/* globals require module Promise */
"use strict";

module.exports = function(models) {
    let { User } = models;

    return {
        registerUser(FirstName, LastName, Username, Password) {
            let user = new User({
                FirstName,
                LastName,
                Username,
                Password
            });
            console.log(user);
            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};
