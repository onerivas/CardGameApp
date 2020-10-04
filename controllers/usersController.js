// const bcrypt = require('bcrypt')
// const express = require('express');
// const users = express.Router();
// const User = require('../models/users.js');
//
//
//
// users.get('/', (req, res) => {
//   User.find({}, (err, foundUser) => {
//     res.json(foundUser)
//   })
// })
//
// users.post('/', (req, res) => {
//   User.create(req.body, (err, createUser) => {
//     User.find({}, (err, foundUser) => {
//       res.json(foundUser)
//     })
//   })
// })
//
// users.put('/:id', (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser) => {
//     if(err){
//       res.send(err)
//     } else {
//       User.find({}, (err, foundUser) => {
//         res.json(foundUser)
//       })
//     }
//   })
// })
//
// users.delete('/:id', (req, res) => {
//   User.findByIdAndRemove(req.params.id, (err, deleteUser) => {
//     User.find({}, (err, foundUser) => {
//       res.json(foundUser)
//     })
//   })
// })

// users.get('/new', (req, res) => {
//   res.render('users/new.ejs', {
//     currentUser: req.session.currentUser
//   })
// })
//
// users.post('/', (req, res) => {
//   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
//   req.body.role = 'base'
//   User.create(req.body, (err, createdUser) => {
//     console.log('User is created', createdUser);
//     res.redirect('/toolow')
//   })
// })

// module.exports = users
