"use strict";

const mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const Statuses = ["Open", "Closed", "Resolved", "Reopened", "Waiting For", "Duplicate", "Need More Info"];
const SimpleUserSchema = require("./partial/simple-user-schema");
const SimpleProjectSchema = require("./partial/simple-project-schema");
const CommentSchema = require("./partial/comment-schema");

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    description: {
        type: String,
        maxLength: 500
    },
    priority: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 10
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: { type: Date },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: (v) => {
                return v > Date.now();
            },
            message: "Due date should be later than creation date!"
        }
    },
    reporter: {
        type: SimpleUserSchema,
        ref: "User"
    },
    assignee: {
        type: SimpleUserSchema,
        ref: "User"
    },
    status: { type: String, enum: Statuses, default: "Open" },
    projectId: { type: SimpleProjectSchema, ref: "Project" },
    comments: [CommentSchema]
});

TaskSchema.plugin(mongoosePaginate);

let Task;
mongoose.model("Task", TaskSchema);
Task = mongoose.model("Task");
module.exports = Task;
