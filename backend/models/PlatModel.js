const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ordre: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

});

const Meal = mongoose.model('Meal', mealSchema);




module.exports = Meal;
