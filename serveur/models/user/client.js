const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const clientSchema = new mongoose.Schema({
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
    tel: {
        type: String,
        required: true
    }
    ,
    resetToken: String,
    expireToken: Date

}, { timestamps: true })

Client = mongoose.model("Client", clientSchema)
module.exports = Client