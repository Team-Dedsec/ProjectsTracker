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
        max: 100000
    },
    leadUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        //required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    //userContributetTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
    Tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
});

let Project;
mongoose.model("Project", ProjectSchema);
Project = mongoose.model("Project");
module.exports = Project;
