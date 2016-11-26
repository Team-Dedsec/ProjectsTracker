'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO:
const Statuses = ["Open", "Closed", "Resolved", "Reopened", "Waiting For", "Duplicate"];

const TaskSchema = new mongoose.Schema({
    Title: { type: String, required: true, min: 3, max: 50 },
    Description: { type: String, max: 500 },
    Priority: { type: Number, required: true, min: 1, max: 10 },
    CreatedDate: { type: Date, default: Date.now },
    UpdatedDate: { type: Date },
    DueDate: {
        type: Date,
        required: true,
        validate: {
            validator: (v) => {
                return v > TaskSchema.CreatedDate;
            },
            message: "Due date should be later than creation date!"
        }
    },
    ReporterID: { type: Schema.Types.ObjectID, ref: "User" },
    AssigneeID: { type: Schema.Types.ObjectID, ref: "User" },
    Status: { type: String, required: true, enum: Statuses },
    ProjectID: { type: Schema.Types.ObjectID, ref: "Project" },
    Comments: [{ type: Schema.Types.ObjectID, ref: "Comment" }]
});

let Task;
mongoose.model("Task", TaskSchema);
Task = mongoose.model("Task");
module.exports = Task;