const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SimpleUserSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    username: {
        type: String,
        required: true
    },
    role: { type: String }
});

module.exports = SimpleUserSchema;