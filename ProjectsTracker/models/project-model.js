/* mongoose global */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    leadUser: {
        type: Number,
        required: true
    }
});
let Project;
ProjectSchema.statics.getSimpleProjectByNameAndUserId =
    function (name) {
        let userId = 4;
        return new Project({ name, userId });
    };



mongoose.model("Projects", ProjectSchema);
Project = mongoose.model("Projects");
module.exports = Project;
