const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    c_email: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    creator: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    },
    upvoted: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    tags: {
        type: [mongoose.SchemaTypes.String],
        required: true
    },
    content: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
})
module.exports = mongoose.model("blogs",BlogSchema)