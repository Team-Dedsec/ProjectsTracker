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
                email,
                role: "user"
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

                    console.log(user);
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
        generateRandomCryptoString(length) {
            let randomString = User.generateCryptoString(length);
            return randomString;
        },
        updateUserToken(email, token) {
            return new Promise((resolve, reject) => {
                User.findOne({ email: email }, (err, user) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    user.resetPasswordToken = token;
                    // 1h
                    let futureTime = constants.passwordResetExpirationInHours * 1000 * 60 * 60;
                    user.resetPasswordExpires = Date.now() + futureTime;
                    user.save((error) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }

                        resolve(user, token);
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

                    if (!user.resetPasswordExpires || user.resetPasswordExpires < Date.now()) {
                        reject(new Error("Your token has expired, please request another one!"));
                    }

                    let passInfo = User.generateHash(password);
                    let passHash = passInfo.passwordHash;
                    let salt = passInfo.salt;

                    user.resetPasswordToken = "";
                    user.resetPasswordExpires = Date.now();
                    user.password = passHash;
                    user.salt = salt;

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
