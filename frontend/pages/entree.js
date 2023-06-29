import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import Navbar from "./componenent/Navbar";
import { Divider } from "semantic-ui-react";
import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@/pages/hooks/useAuthContext";

export default function Home() {
    const { user } = useAuthContext();
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [meals, setMeals] = useState([]);
    const [changement, setChangement] = useState(null);

    const handleClick = (meal) => {
        if (meal) {
            // Traitez l'événement de clic ici (ex: affichage des détails du plat)
            console.log(meal);
            if (selectedMeal === null) {
                setSelectedMeal(meal);
            } else {
                setSelectedMeal(null);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Effectuez une requête HTTP PUT vers votre API pour mettre à jour le plat
        fetch('/api/plat/meals/'+changement._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changement),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Plat mis à jour:', data);
                setChangement(null);
                window.location.reload(); // Rechargement de la page

            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        // Effectuez une requête HTTP GET à votre API pour récupérer tous les plats
        fetch('/api/plat/meals')
            .then(response => response.json())
            .then(data => setMeals(data))
            .catch(error => console.error(error));
    }, []);

    const handleClick1 = (meal) => {
        if (changement === null) {
            setChangement(meal);
        } else {
            setChangement(null);
        }
    };

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Généré par create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <div>
                    <Navbar />
                    <Divider horizontal style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px", lineHeight: "30px" }}>
                        <p style={{ color: "White", fontFamily: "Whisper", fontStyle: "Regular", fontSize: "32px" }}>Entree</p>
                    </Divider>
                    <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        {meals.map(meal => meal.ordre === 1 && (
                            <div
                                key={meal._id}
                                style={{
                                    textAlign: 'center',
                                    marginTop: '3%',
                                    backgroundColor: "#FFFFFF0F",
                                    color: "white",
                                    fontSize: "24px",
                                    width: "80%",
                                    height: "80%",
                                    borderRadius: "30px",
                                    padding: "1%",
                                    justifyContent: "center",
                                }}
                                onClick={() => handleClick(meal)}
                            >
                                {changement && changement._id === meal._id && (
                                    <form onSubmit={handleSubmit} style={{
                                        borderRadius: "20px",

                                        padding: "3%",
                                        display: "grid",
                                        gridTemplateColumns: "1fr",
                                        gap: "10px",
                                        margin: "auto",
                                        justifyContent: "center",
                                        alignItems: "center",



                                    }}>
                                        <h2>Changement de {meal.title} :</h2>
                                        <label >Plat :</label>
                                        <input
                                            style={{marginLeft:"10%", maxWidth:"80%",  justifyContent: "center", alignItems: "center", textAlign:"center"}}
                                            type="text"
                                            value={changement.title}
                                            onChange={(e) => setChangement({ ...changement, title: e.target.value })}
                                        />
                                        <label>Description :</label>
                                        <input
                                            style={{marginLeft:"10%", maxWidth:"80%",  justifyContent: "center", alignItems: "center", textAlign:"center"}}
                                            type="text"
                                            value={changement.description}
                                            onChange={(e) => setChangement({ ...changement, description: e.target.value })}
                                        />
                                        <button    style={{marginLeft:"10%", maxWidth:"80%",  justifyContent: "center", alignItems: "center", textAlign:"center"}} type="submit">Modifier</button>
                                    </form>
                                )}
                                <p style={{
                                    color: 'White',
                                    fontFamily: 'Whisper',
                                    fontStyle: 'Regular',
                                    fontSize: '32px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}>{meal.title}</p>
                                {!changement && selectedMeal && selectedMeal._id === meal._id && (
                                    <div style={{ textAlign: 'center' }}>
                                        <p>{meal.description}</p>
                                    </div>
                                )}
                                {user && user.role === "Admin" && (
                                    <div style={{ textAlign: 'center' }}>
                                        <button
                                            style={{
                                                marginBottom: "10px",
                                                marginTop: "20px",
                                                fontFamily: "Whisper",
                                                fontSize: "30px",
                                                color: "white",
                                                backgroundColor: "transparent",
                                                borderStyle: "none",
                                                padding: "15px",
                                                borderTop: "solid white",
                                                borderBottom: "solid white"
                                            }}
                                            onClick={() => handleClick1(meal)}
                                        >
                                            Changer
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
