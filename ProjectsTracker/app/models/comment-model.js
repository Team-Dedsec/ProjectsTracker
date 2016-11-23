"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    Title: { type: String, required: true, min: 10, max: 100 },
    Content: { type: String, min: 10, max: 1000 },
    isDeleted: { type: Boolean, required: true},
    PosterID: { type: String }
});

let Comment;
mongoose.model("Comment", CommentSchema);
Comment = mongoose.model("Comment");
module.exports = Comment;