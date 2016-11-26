/* mongoose global */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    SimpleUserSchema = require("./partial/simple-user-schema");

let ProjectSchema = new Schema({
    title: {
        type: String,
        minLength: 10,
        maxLength: 120,
        required: true
    },
    description: {
        type: String,
        //TODO: Change
        minLength: 10,
        maxLength: 100000
    },
    leadUser: {
        type: SimpleUserSchema,
        ref: "User"
        //required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    //userContributetTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
});

ProjectSchema.query.byTitle = function(name) {
    return this.find({
        title: name
    });
};

let Project;
mongoose.model("Project", ProjectSchema);
Project = mongoose.model("Project");
module.exports = Project;
