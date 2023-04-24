const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
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
    content: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    comments: {
        type: [mongoose.SchemaTypes.String],
        default: []
    }
})
module.exports = mongoose.model("commments",CommentSchema)