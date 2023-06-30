const express = require('express')
const {
    getReservations,
    getReservationsUser,
    getReservation,
    createReservation,

    checkLimit,

    deleteReservation,
    updateReservation
} = require('../controllers/reservationController')

const router = express.Router()

//get all reservation
router.get('/', getReservations)

//get all reservation from one user
router.get('/user/:id', getReservationsUser)

//get one reservation
router.get('/:id', getReservation)

//post a new reservation
router.post('/', createReservation)

//delete a reservation
router.delete('/:id', deleteReservation)

module.exports = router
