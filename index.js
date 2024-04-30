const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 592

app.get('/', (req, res) => {
    res.send('Home')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/firsttestdata')
    .then(() => {
        console.log('Connected to MongoDB')
        // Schema for the login
        const mongooseSchema = new mongoose.Schema({
            User_name: {
                type: String,
                required: true // corrected 'require' to 'required'
            },
            password: {
                type: String,
                required: true // corrected 'require' to 'required'
            },
            date: {
                type: Date,
                default: Date.now
            }
        })

        // Model for the login
        const LoginModel = mongoose.model('LoginModel', mongooseSchema)

        // Create a document
        const LoginFunction = async () => {
            try {
                const loginData = new LoginModel({
                    User_name: 'zkirya',
                    password: '1231'
                })
                const result = await LoginModel.insertMany([loginData])
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        // LoginFunction();

        // Get document
        const getdocument = async () => {
            try {
                const result = await LoginModel.find().sort({ User_name: 1 })
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        // getdocument()

        // Update the data
        const updatedocument = async (_id) => {
            try {
                const result = await LoginModel.findByIdAndUpdate({ _id: _id }, {
                    $set: {
                        User_name: "zakirya"
                    },
                }, {
                    new: true
                })
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        // updatedocument('6630bb77678ac276f0d55335')

        // Delete the data
        const deletdocument = async (_id) => {
            try {
                const result = await LoginModel.deleteOne({ _id: _id })
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        // deletdocument('6630bb77678ac276f0d55335')


    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error)
    })
