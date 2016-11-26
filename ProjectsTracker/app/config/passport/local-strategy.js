/* globals, require */
const LocalStrategy = require("passport-local");//.Strategy;

module.exports = function(passport, data){
    //console.log("local-local-strategy.js");
    passport.use(new LocalStrategy((username, password, done) => {
        //console.log(username); 
        //console.log(password);   
        data.findUserByUsername(username).then(user => {
            //console.log(user);
            if (user[0] && user[0].comparePassword(password)) {
                done(null, user[0]);
            } else {
                done(null, false);
            }
        })
    .catch(error => done(error, false));   
    }));    
};
