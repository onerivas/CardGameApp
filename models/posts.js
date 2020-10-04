const mongoose = require('mongoose')
// const User = require('./users.js')
// const Comment = require('./comment.js')

const postSchema = new mongoose.Schema({
  name: String,
  destination: String
  // img: { type: String, required: true },
  // comments: [Comment.schema],
  // author: mongoose.ObjectId
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
