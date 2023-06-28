const Meal = require('../models/PlatModel');
const mongoose = require('mongoose');

// Obtenir tous les plats
const getMeals = async (req, res) => {
    const meals = await Meal.find().sort({ createdAt: -1 });
    res.status(200).json(meals);
};

// Obtenir un plat spécifique
const getMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such meal' });
    }

    const meal = await Meal.findById(id);

    if (!meal) {
        res.status(404).json({ error: 'No such meal' });
    }

    res.status(200).json(meal);
};

// Créer un nouveau plat
const createMeal = async (req, res) => {
    const { title, description, ordre } = req.body;

    // Validation des champs obligatoires
    if (!title || !ordre) {
        return res.status(400).json({ error: 'Please provide title and price' });
    }

    try {
        const meal = await Meal.create({ title, description, ordre });
        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create meal' });
    }
};

// Supprimer un plat
const deleteMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such meal' });
    }

    const meal = await Meal.findOneAndDelete({ _id: id });

    if (!meal) {
        res.status(404).json({ error: 'No such meal' });
    }

    res.status(200).json(meal);
};

// Mettre à jour un plat
const updateMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such meal' });
    }

    const meal = await Meal.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!meal) {
        res.status(404).json({ error: 'No such meal' });
    }

    res.status(200).json(meal);
};

module.exports = {
    getMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal,
};
