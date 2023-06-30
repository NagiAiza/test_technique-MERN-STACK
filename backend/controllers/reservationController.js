const Reservation = require('../models/reservationModel');
const mongoose = require('mongoose');

// Récupérer toutes les réservations
const getReservations = async (req, res) => {
    const reservations = await Reservation.find({}).sort({ date: -1 });
    res.status(200).json(reservations);
};

// Récupérer les réservations d'un utilisateur spécifique
const getReservationsUser = async (req, res) => {
    const user_id = req.params.id;

    try {
        const reservations = await Reservation.find({ userId: user_id }).sort({ date: -1 });

        if (reservations.length === 0) {
            return res.status(404).json({ error: 'Aucune réservation trouvée' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une réservation spécifique
const getReservation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'Aucune réservation trouvée' });
    }

    const reservation = await Reservation.findById(id);

    if (!reservation) {
        res.status(404).json({ error: 'Aucune réservation trouvée' });
    }

    res.status(200).json(reservation);
};

// Créer une nouvelle réservation
const createReservation = async (req, res) => {
    const { userId, date, timeSlot, numberOfPeople, menus, bottles, totalPrice } = req.body;

    try {
        const reservation = await Reservation.create({
            userId,
            date,
            timeSlot,
            numberOfPeople,
            menus,
            bottles,
            totalPrice
        });
        res.status(200).json(reservation);
    } catch (error) {
        console.error('Erreur lors de la création de la réservation :', error);
        res.status(400).json({ error: error.message });
    }
};

// Supprimer une réservation
const deleteReservation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'Aucune réservation trouvée' });
    }

    const reservation = await Reservation.findOneAndDelete({ _id: id });

    if (!reservation) {
        res.status(404).json({ error: 'Aucune réservation trouvée' });
    }

    res.status(200).json(reservation);
};

// Vérifier la limite de réservations
const checkLimit = async (req, res) => {
    const { date, timeSlot } = req.body;

    try {
        const reservationsCount = await Reservation.countDocuments({ date, timeSlot });
        console.log(
            "Nombre de réservations : " + reservationsCount + "\n" +
            "Date : " + date + "\n" +
            "Créneaux : " + timeSlot
        );

        res.status(200).json({ reservationsCount });
    } catch (error) {
        console.error('Erreur lors de la vérification de la limite de réservations :', error);
        res.status(500).json({
            message: "Une erreur s'est produite lors de la vérification de la limite de réservations",
        });
    }
};

module.exports = {
    getReservations,
    getReservationsUser,
    getReservation,
    createReservation,
    deleteReservation,
    checkLimit
};
