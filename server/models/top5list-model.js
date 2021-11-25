const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerId: {type: String, required:true},
        like: {type: Integer, required:true},
        likeUsers: {type: [String], required: true},
        dislike: {type: Integer, required: true},
        dislikedUsers: {type: [String], required: true},
        views: {type: Integer, required: true},
        dateCreated: {type: Date, required: true},
        published: {type: Boolean, required: true},
        comments: {type: {String: [String]}, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
