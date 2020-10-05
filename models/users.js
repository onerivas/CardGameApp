const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  username: {type: String, unique:true, required: true},
  name: {type: String, required: true},
  password: {type:String, required:true},
  post:
})

const User = mongoose.model('User', userSchema);

module.exports = User
