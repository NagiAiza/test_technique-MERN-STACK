import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import Navbar from "./componenent/Navbar";
import { Divider } from "semantic-ui-react";
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);

    useEffect(() => {
        // Effectuez une requête HTTP GET à votre API pour récupérer tous les plats
        fetch('/api/plat/meals')
            .then(response => response.json())
            .then(data => setMeals(data))
            .catch(error => console.error(error));
    }, []);

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
                        <p style={{ color: "White", fontFamily: "Whisper", fontStyle: "Regular", fontSize: "32px" }}>PLAT</p>
                    </Divider>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        {meals.map(meal => (
                            <div

                                key={meal._id}
                                style={{ textAlign: 'center', marginTop: '3%', backgroundColor:"#FFFFFF0F", color : "white", fontSize : "24px", width : "80%", height : "80%", borderRadius : "30px", padding : "1%", justifyContent : "center",}}
                                onClick={() => handleClick(meal)}
                            >
                                <p style={{ color: 'White', fontFamily: 'Whisper', fontStyle: 'Regular', fontSize: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>{meal.title}</p>
                                {selectedMeal && selectedMeal._id === meal._id && (
                                    <div style={{ textAlign: 'center' }}>
                                        <p>{meal.description}</p>
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
