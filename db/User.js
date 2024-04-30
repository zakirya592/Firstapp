const mongoose = require('mongoose')
const validator = require('validator')


const mongooseSchema = new mongoose.Schema({
  User_name: {
    type: String,
    required: true
    // unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// Model for the login
module.exports = mongoose.model('LoginModel', mongooseSchema)
