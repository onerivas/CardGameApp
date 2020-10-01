const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

const isAuthorized = (req, res, next) => {
  req.session.currentUser ? next() : res.redirect('/sessions/new')
}

users.get('/', (req, res) => {
  User.find({}, (err, foundUser) => {
    res.json(foundUser)
  })
})

users.post('/', (req, res) => {
  User.create(req.body, (err, createUser) => {
    User.find({}, (err, foundUser) => {
      res.json(foundUser)
    })
  })
})

users.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser) => {
    if(err){
      res.send(err)
    } else {
      User.find({}, (err, foundUser) => {
        res.json(foundUser)
      })
    }
  })
})

users.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deleteUser) => {
    User.find({}, (err, foundUser) => {
      res.json(foundUser)
    })
  })
})

module.exports = users
