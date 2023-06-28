require('dotenv').config()

const express = require('express')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const platRoutes = require('./routes/plat')
// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/plat',  platRoutes)
// Ajoutez cette ligne avant la définition des routes
app.use('/images', express.static('images'));

app.get('/images/:img', (req, res) => {
    const { img } = req.query; // Utilisez req.query au lieu de req.params
    if(!img)
    {
        res.status(400).json({ error:"Pas d'image trouvée" }); // Message d'erreur modifié
    }
    res.sendFile(img, { root: 'images' }); // Utilisez l'option 'root' pour spécifier le répertoire racine des images
});

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

