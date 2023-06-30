const express = require('express');
const router = express.Router();
const {
    getReservations,
    getReservationsUser,
    getReservation,
    createReservation,
    deleteReservation,
    checkLimit
} = require('../controllers/reservationController');

// Récupérer toutes les réservations
router.get('/', getReservations);

// Récupérer les réservations d'un utilisateur spécifique
router.get('/user/:id', getReservationsUser);

// Récupérer une réservation spécifique
router.get('/:id', getReservation);

// Créer une nouvelle réservation
router.post('/', createReservation);

// Supprimer une réservation
router.delete('/:id', deleteReservation);

// Vérifier la limite de réservations
router.post('/checkLimit', checkLimit);

module.exports = router;
