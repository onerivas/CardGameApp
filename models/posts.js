const mongoose = require('mongoose')
const Comment = require('./comments.js')

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  img: { type: String, required: true },
  description: String,
  comments: [Comment.schema]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
