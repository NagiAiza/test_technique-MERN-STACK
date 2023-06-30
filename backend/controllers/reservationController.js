const Reservation = require('../models/reservationModel')
const mongoose = require('mongoose')

//get all reservation
const getReservations = async (req, res) => {
    const reservations = await Reservation.find({}).sort({ date: -1})

    res.status(200).json(reservations)
}

//get all reservation from a user
const getReservationsUser = async (req, res) => {
    const user_id = req.params.id;

    try {
        const reservations = await Reservation.find({ userId: user_id }).sort({ date: -1 });

        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No reservation found' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get one reservation
const getReservation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such reservation' })
    }

    const reservation = await Reservation.findById(id)

    if (!reservation) {
        res.status(404).json({ error: 'No such reservation' })
    }

    res.status(200).json(reservation)
}

//create reservation
const createReservation = async (req, res) => {
    const { userId, date, timeSlot, numberOfPeople, menus, bottles, totalPrice} = req.body
    // const user_id = req.user._id peut etre utiliser cette ligne?
    try{
        const reservation = await Reservation.create({userId, date, timeSlot, numberOfPeople, menus, bottles, totalPrice})
        res.status(200).json(reservation)
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(400).json({ error: error.message })
    }
}

//delete reservation
const deleteReservation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such reservation' })
    }

    const reservation = await Reservation.findOneAndDelete({ _id: id})

    if(!reservation) {
        res.status(404).json({ error: 'No such reservation' })
    }

    res.status(200).json(reservation)
}

module.exports = {
    getReservations,
    getReservationsUser,
    getReservation,
    createReservation,
    deleteReservation
}