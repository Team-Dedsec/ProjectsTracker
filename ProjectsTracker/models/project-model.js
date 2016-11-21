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
mongoose.model("Project", ProjectSchema);
Project = mongoose.model("Project");
module.exports = Project;
