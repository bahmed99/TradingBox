const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    }, likes: [{ type: ObjectId, ref: "Client" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "Client" }
    }],

}, { timestamps: true })


Video = mongoose.model("Video", videoSchema)
module.exports = Video

