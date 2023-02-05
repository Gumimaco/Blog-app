const mongoose = require('mongoose')

const GUserSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    },
})
module.exports = mongoose.model("g_users",GUserSchema)