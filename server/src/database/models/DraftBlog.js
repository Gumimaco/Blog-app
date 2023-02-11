const mongoose = require('mongoose')

const DraftSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        default: ""
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
    tags: {
        type: [mongoose.SchemaTypes.String],
        default: []
    },
    content: {
        type: mongoose.SchemaTypes.String,
        default: ""
    }
})
module.exports = mongoose.model("drafts",DraftSchema)