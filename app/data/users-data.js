/* globals require module Promise */
"use strict";

const constants = require("../constants/constants");

module.exports = function (models) {
    let { User } = models;

    return {
        registerUser(firstName, lastName, username, password, email) {
            User.validatePassword(password);
            let passInfo = User.generateHash(password);
            let passHash = passInfo.passwordHash;
            let salt = passInfo.salt;

            let user = new User({
                firstName,
                lastName,
                username,
                password: passHash,
                salt,
                email
            });

            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        let error;
                        if (err.code === 11000 && err.message.indexOf("email") > 0) {
                            error = new Error("This email is already in use!");
                        } else if (err.code === 11000 && err.message.indexOf("username") > 0) {
                            error = new Error("This username is already in use!");
                        } else {
                            error = err;
                        }

                        return reject(error);
                    }

                    return resolve(user);
                });
            });
        },
        deleteUser(id) {
            return new Promise((resolve, reject) => {
                User.findOneAndRemove({ _id: id }, (err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve();
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

                    // console.log(user);
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
        },
        searchUsers(username) {
            return new Promise((resolve, reject) => {
                User.find()
                    .byName(username)
                    .exec((err, user) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(user);
                    });
            });
        },
        updateUserToken(email) {
            let token = User.generateCryptoString(constants.passwordResetTokenLength);
            return new Promise((resolve, reject) => {
                User.findOne({ email }, (err, user) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }

                    if (!user) {
                        reject(new Error("Invalid email address!"));
                        return;
                    }

                    user.resetPasswordToken = token;
                    let futureTime = constants.passwordResetExpirationInHours * 1000 * 60 * 60;
                    user.resetPasswordExpires = Date.now() + futureTime;
                    user.save((error) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }

                        resolve(user);
                    });
                });
            });
        },
        changeUserPassword(password, token) {
            User.validatePassword(password);
            return new Promise((resolve, reject) => {
                User.findOne({ resetPasswordToken: token }, (err, user) => {
                    if (err) {
                        reject(err);
                    }

                    if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < Date.now()) {
                        reject(new Error("Your token has expired or is invalid, please request another one!"));
                    }

                    user.resetPasswordExpires = Date.now();
                    let passInfo = User.generateHash(password);
                    user.password = passInfo.passwordHash;
                    user.salt = passInfo.salt;

                    user.save((error) => {
                        if (error) {
                            reject(error);
                        }

                        resolve(user);
                    });
                });
            });
        }
    };
};