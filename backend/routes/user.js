const express = require('express')

const { signupUser, loginUser, deleteUser, getUsers } = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)


//signup route
router.post('/signup', signupUser)

//get all users !admin
router.get('/', getUsers)

//delet one user
router.delete('/:id', deleteUser)

module.exports = router