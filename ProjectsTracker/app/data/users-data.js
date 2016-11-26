/* globals require module Promise */
"use strict";
module.exports = function (models) {
    let { User } = models;

    return {
        registerUser(firstName, lastName, username, password) {
            User.validatePassword(password);
            let passInfo = User.generateHash(password);
            let passHash = passInfo.passwordHash;
            let salt = passInfo.salt;

            let user = new User({
                firstName,
                lastName,
                username,
                password: passHash,
                salt
            });

            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne()
                    .byName(username)
                    .exec((err, user) => {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }

                        console.log(user);
                        return resolve(user);
                    });
            });
        },
        findUserById(id) {
            return new Promise((resolve, reject) => {
                User.findById(id).exec((err, user) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    console.log(user.fullName);
                    return resolve(user);
                });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                User.find((err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(users);
                });
            });
        }
    };
};
