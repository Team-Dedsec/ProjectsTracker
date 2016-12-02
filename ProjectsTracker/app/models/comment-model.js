"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: { type: String, required: true, minLength: 10, maxLength: 100 },
    content: { type: String, minLength: 10, maxLength: 1000 },
    isDeleted: { type: Boolean, required: true },
    posterId: { type: String }
});

let Comment;
mongoose.model("Comment", CommentSchema);
Comment = mongoose.model("Comment");
module.exports = Comment;