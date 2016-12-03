/* globals require module */
const Schema = require("mongoose").Schema;

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
    }
});

module.exports = TaskSchema;