const express = require('express');
const mealController = require('../controllers/platController');

const router = express.Router();

router.get('/meals', mealController.getMeals);
router.get('/meals/:id', mealController.getMeal);
router.post('/meals', mealController.createMeal);
router.delete('/meals/:id', mealController.deleteMeal);
router.put('/meals/:id', mealController.updateMeal);



module.exports = router;
