/* globals */
"use strict";

module.exports = function(mongoose) {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/Projects");
};
