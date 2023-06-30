const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const multer = require('multer')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// Configuration de multer pour le téléchargement d'image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images') // Spécifiez le répertoire de destination où vous souhaitez enregistrer les images
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    }
})

const upload = multer({ storage: storage })

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token, role: user.role, id: user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// signup a user
const signupUser = async (req, res) => {
    const { email, password, role, prenom, nom, image } = req.body
    console.log(image)
    try {
        const user = await User.signup(email, password, role, prenom, nom, image)

        //create a token
        const token = createToken(user._id)
        res.status(200).json({ email, token, role, id: user._id  })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get all users
const getUsers = async (req, res) => {
    const users = await User.find({ "role": "Customer" }).sort({ "_id": 1 })

    res.status(200).json(users)
}

//get one users
const getUser = async (req, res) => {
    // const { id } = req.params
    //
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     res.status(404).json({ error: 'No such User' })
    // }
    //
    // const user = await User.findById(id)
    //
    // if (!user) {
    //     res.status(404).json({ error: 'No such user' })
    // }
    //
    // res.status(200).json(user)
    const {email} = req.params
    const user = await User.findOne({ email }); // Recherchez un utilisateur dans la collection "users" en utilisant l'adresse e-mail
    if (!user) {
        res.status(404).json({ error: 'No such user' })
    }
    res.status(200).json(user)
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

// Fonction pour télécharger l'image
const uploadImage = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: err.message })
        } else {
            const imageUrl = req.file.path // Récupérez le chemin de l'image téléchargée
            res.status(200).json({ imageUrl }) // Renvoyez l'URL de l'image en JSON
        }
    })
}

const uploadUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    if(!user){
        res.status(400).json({ error: "No user found" })
    }
    res.status(200).json(user)
}



module.exports = { signupUser, loginUser, getUsers, getUser, deleteUser, uploadImage, uploadUser }