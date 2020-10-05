const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser
  })
})

sessions.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if(err) {
      console.log(err);
      res.send('db problem')
    } else if (!foundUser) {
      res.redirect('/sessions/new')
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/')
      } else {
        res.redirect('/sessions/new')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
