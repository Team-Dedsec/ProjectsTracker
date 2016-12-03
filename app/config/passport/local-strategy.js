/* globals, require */
const LocalStrategy = require("passport-local");

module.exports = function(passport, data) {
    passport.use(new LocalStrategy((username, password, done) => {
        data.findUserByUsername(username).then(user => {
            if (user[0] && user[0].comparePassword(password)) {
                done(null, user[0]);
            } else {
                done(null, false);
            }
        })
    .catch(error => done(error, false));
    }));
};