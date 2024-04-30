const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 200

require('./db/Config')
const User = require('./db/User')
app.use(express.json())

app.post('/Signup', async (req, res) => {

  try {
    const existingEmail = await User.findOne({ email: req.body.email })
    const existingUsername = await User.findOne({ User_name: req.body.User_name })
    if (existingEmail && existingUsername) {
      return res.status(400).json({ message: 'Username and email already exist' })
    } else if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' })
    } else if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' })
    }
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })

  }
});

app.post('/Login', async (req, res) => {
  try {
    const { email, password } = req.body
    // Find the user in the database
    const user = await User.findOne({ email })
    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: 'email not found' })
    }
    // Check if the password is correct
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' })
    }
    // If user and password are correct, send a success message
    res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
