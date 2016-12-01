const Schema = require("mongoose").Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1000
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = CommentSchema;