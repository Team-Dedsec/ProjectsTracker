/* globals require module Promise */
"use strict";
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
                        reject(err);
                    }
                    user.resetPasswordToken = token;
                    // 1h
                    user.resetPasswordExpires = Date.now() + 3600000;
                    // user.visits.$inc();
                    user.save((error) => {
                        if (error) {
                            reject(error);
                        }

                        resolve(user, token);
                    });
                });
            });
        }
    };
};
