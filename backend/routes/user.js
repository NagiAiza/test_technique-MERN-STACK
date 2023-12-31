const express = require('express')

const { signupUser, loginUser, deleteUser, getUsers, getUser, uploadImage, uploadUser } = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)


//signup route
router.post('/signup', signupUser)

//get all users !admin
router.get('/', getUsers)

//GET a single user
// router.get('/:id', getUser)
router.get('/:email', getUser)

//delet one user
router.delete('/:id', deleteUser)

// Route pour le téléchargement d'image
router.post('/upload', uploadImage)


router.patch('/:id', uploadUser)



module.exports = router