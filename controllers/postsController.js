const express = require('express');
const posts = express.Router();
const Post = require('../models/posts.js');

// const isAuthorized = (req, res, next) => {
//   req.session.currentUser ? next() : res.redirect('/sessions/new')
// }

posts.get('/', (req, res) => {
  Post.find({}, (err, foundPost) => {
    res.json(foundPost)
  })
})

posts.post('/', (req, res) => {
  Post.create(req.body, (err, createPost) => {
    Post.find({}, (err, foundPost) => {
      res.json(foundPost)
    })
  })
})

posts.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPost) => {
    if(err){
      res.send(err)
    } else {
      Post.find({}, (err, foundPost) => {
        res.json(foundPost)
      })
    }
  })
})

posts.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, deletePost) => {
    Post.find({}, (err, foundPost) => {
      res.json(foundPost)
    })
  })
})

module.exports = posts
