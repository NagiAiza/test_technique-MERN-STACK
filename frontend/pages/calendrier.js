import React, { useEffect, useState } from "react"
import { useAuthContext } from "./hooks/useAuthContext"
import { format } from "date-fns";
// components
import { fr } from 'date-fns/locale';

const Calendrier = () => {
    const { user } = useAuthContext();
    const [reservations, setReservations] = useState([]);
    const [users, setUsers] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchReservation = async () => {
            // Récupérer toutes les données utilisateur
            const usersResponse = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const usersJson = await usersResponse.json();
            setUsers(usersJson);

            // Récupérer les réservations
            const response = await fetch('/api/reservation', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            setReservations(json);
        };

        const fetchMeals = async () => {
            // Récupérer les détails des repas
            const mealsResponse = await fetch("/api/plat/meals", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const mealsJson = await mealsResponse.json();
            setMeals(mealsJson);
        };

        if (user) {
            fetchReservation();
            fetchMeals();
        }
    }, [user]);


    const getMealName = (mealId) => {
        const meal = meals.find((meal) => meal._id === mealId);
        return meal ? meal.title : "";
    };

    return (
        <div className="home">
            <div >
                {reservations &&
                    reservations.map((reservation) => {
                        const user = users.find((user) => user._id === reservation.userId);
                        const userName = user ? user.nom : '';

                        // Formater la date au format "YYYY-MM-DD"
                        const  formattedDate  = format(new Date(reservation?.date), "EEEE, MMMM dd, yyyy", { locale: fr });


                        // Récupérer les noms des entrées, plats et desserts choisis
                        const selectedMenus = reservation.menus.map((menu) => {
                            return {
                                entree: getMealName(menu.entree),
                                plat: getMealName(menu.plat),
                                dessert: getMealName(menu.dessert),
                            };
                        });

                        const selectedBottles = reservation.bottles.map((bottle) => {
                            return {
                                nom: getMealName(bottle.vin),
                                quantite: bottle.quantity,
                            };
                        });

                        return (
                            <div style={{
                                borderRadius: "20px",
                                padding: "1%",
                                margin:"1%",
                                color:"white",
                                backgroundColor:"#FFFFFF0F",

                            }} key={reservation._id}>
                                <strong>Date :</strong> {formattedDate}
                                <br />
                                <strong>Nom du client :</strong> {userName}
                                <br />
                                <strong>Creneau :</strong> {reservation.timeSlot}
                                <br />
                                <strong>Nombre de personnes :</strong> {reservation.numberOfPeople}
                                <br /><br />
                                <strong>Menus choisis :</strong>
                                {selectedMenus.map((menu, index) => (
                                    <div key={index}>
                                        <strong>Entrée :</strong> {menu.entree}
                                        <br />
                                        <strong>Plat :</strong> {menu.plat}
                                        <br />
                                        <strong>Dessert :</strong> {menu.dessert}
                                        <br />
                                    </div>
                                ))}
                                <strong>Bouteilles choisies :</strong>
                                {selectedBottles.map((bottle, index) => (
                                    <div key={index}>
                                        <strong>Nom :</strong> {bottle.nom}
                                        <br />
                                        <strong>Quantite :</strong> {bottle.quantite}
                                        <br />
                                    </div>
                                ))}
                                <br />
                                <strong>Prix :</strong> {reservation.totalPrice} €
                                <br /><br />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Calendrier;
