const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    expireToken: Date,

}, { timestamps: true })


Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin

