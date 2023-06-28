const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token,  })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// signup a user
const signupUser = async (req, res) => {
    const { email, password, role } = req.body

    try {
        const user = await User.signup(email, password, role)

        //create a token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUsers = async (req, res) => {
    const users = await User.find({ "role": "Customer" }).sort({ "_id": 1 })

    res.status(200).json(users)
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such user' })
    }
    // il faudra penser a supprimer les reservations en meme temps
    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(user)
}

module.exports = { signupUser, loginUser, getUsers, deleteUser }