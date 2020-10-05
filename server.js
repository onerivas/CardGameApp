//Dependencies

const express =require('express');
const mongoose = require('mongoose');


//Config
const app = express();
require('dotenv').config();
const PORT = process.env.PORT


//database
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// Error / success
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

app.use(express.json())
app.use(express.static('public'))

const usersController = require('./controllers/usersController.js');
app.use('/users', usersController)
const postsController = require('./controllers/postsController.js');
app.use('/travel', postsController)
const sessionsController = require('./controllers/sessionsController.js');
app.use('/sessions', sessionsController)


app.listen(PORT, () => {
  console.log(`Listening on port, ${PORT}`);
})
