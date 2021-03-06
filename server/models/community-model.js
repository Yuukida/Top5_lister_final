const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunitySchema = new Schema(
    {
        itemsCount: {type: String, required: true},
        name: {type: String, required: true},
        users: {type: [String], required: true},
        views: {type: Number, required: true},
        comments: {type: [[String, String]], required: true},
        publishDate: {type: Date, required:true},
        likes: {type: Number, required:true},
        likedUsers: {type: [String], required: true},
        dislikes: {type: Number, required: true},
        dislikedUsers: {type: [String], required: true},
        updateDate: {type: Date, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Community', CommunitySchema)
