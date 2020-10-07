const express = require('express');
const posts = express.Router();
const Post = require('../models/posts.js');
const Comment = require('../models/comments.js')

posts.get('/', (req, res) => {
  Post.find({}, (err, foundPost) => {
    res.json(foundPost)
  })
})

posts.post('/comments', (req, res) => {
  Comment.create(req.body, (err, createdComment) => {
    Post.findById(req.body.postId, (err, foundPost) => {
      foundPost.comments.push(createdComment)
      foundPost.save()
      res.json(foundPost)
    })
  })
})

posts.post('/', (req, res) => {
  const newBody = {
    name:req.body.name,
    location: req.body.location,
    img: req.body.img,
    description: req.body.description,
    comments:[]
  }
  Post.create(newBody, (err, createPost) => {
    Post.find({}, (err, foundPost) => {
      res.json(foundPost)
    })
  })
})

posts.put('/:id', (req, res) => {
  for (let key of req.body.posts) {
    if (req.params.id === key._id) {
      for (let key2 in key) {
        // console.log(req.body[key2]);
        if (!req.body[key2]) {
          req.body[key2] = key[key2];
        }
      }
    }
  }
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
