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

            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    console.log(user);
                    return resolve(user);
                });
            });
        },
        findUserByUsername(Username){
          return new Promise((resolve, reject) => {
            User.find().byName(Username).exec(function(err, username) {
              if (err) {
                console.log(err);
                return reject(err);
              }

              console.log(username);
              return resolve(username);
            });
          })
        },
        findUserById(id){
          return new Promise((resolve, reject)=> {
            User.findById(id).exec(function(err, user){
              if (err) {
                console.log(err);
                return reject(err);
              }

              console.log(user.FullName);
              return resolve(user.FullName);
            })
          })
        }
    };
};
