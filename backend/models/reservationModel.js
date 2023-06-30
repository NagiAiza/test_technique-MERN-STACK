const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Définition du schéma de réservation
const reservationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        enum: ['Midi', 'Soir'],
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    menus: [
        {
            entree: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal',
                required: true
            },
            plat: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal',
                required: true
            },
            dessert: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal',
                required: true
            }
        }
    ],
    bottles: {
        vin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Reservation', reservationSchema)