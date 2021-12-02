const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerId: {type: String, required:true},
        likes: {type: Number, required:true},
        likedUsers: {type: [String], required: true},
        dislikes: {type: Number, required: true},
        dislikedUsers: {type: [String], required: true},
        views: {type: Number, required: true},
        published: {type: Boolean, required: true},
        comments: {type: [[String, String]], required: true},
        publishDate: {type: Date, required:true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
