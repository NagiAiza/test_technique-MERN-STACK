const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Customer"],
        required: true
    },
    prenom: {
        type: String
    },
    nom: {
        type: String
    },
    image: {
        type: String
    }
})

// static signup method
userSchema.statics.signup = async function (email, password, role = 'Admin', prenom, nom, image) {

    //validation
    if (!email || !password || !image) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    let hash = password

    if(role === 'Customer'){
        const salt = await bcrypt.genSalt(10)
        hash = await bcrypt.hash(password, salt)
    }

    const user = await this.create({ email, password: hash, role, prenom, nom, image })

    return user
}

//static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect Email')
    }

    let match = false

    if(user.role === 'Customer'){
        match = await bcrypt.compare(password, user.password)
    } else {
        if(user.password === password) {
            match = true
        }
    }

    if(!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)