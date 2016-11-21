/* mongoose global */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    title: {
        type: String,
        min: 10,
        max: 120,
        required: true
    },
    description: {
        type: String,
        min: 200,
        max: 100000,
        required: false
    },
    leadUser: {
        type: Number,
        required: true
    }
    //TODO: Add list of user and bugs
});
let Project;
mongoose.model("Project", ProjectSchema);
Project = mongoose.model("Project");
module.exports = Project;
