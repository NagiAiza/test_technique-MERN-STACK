import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import Navbar from "./componenent/Navbar";
import { Divider } from "semantic-ui-react";
import React, { useEffect, useState } from 'react';

import {useAuthContext} from "@/pages/hooks/useAuthContext";

export default function Home() {
    const { user } = useAuthContext()

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

    useEffect(() => {
        // Effectuez une requête HTTP GET à votre API pour récupérer tous les plats
        fetch('/api/plat/meals')
            .then(response => response.json())
            .then(data => setMeals(data))
            .catch(error => console.error(error));
    }, []);

    const handleClick1 = (meal) => {
        if(changement===null)
        {
            setChangement(meal)
        }
        else
        {
            setChangement(null)
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
                    <div style={{marginBottom:"10px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                         {meals.map(meal => meal.ordre === 2 && (



                            <div

                                key={meal._id}
                                style={{ textAlign: 'center', marginTop: '3%', backgroundColor:"#FFFFFF0F", color : "white", fontSize : "24px", width : "80%", height : "80%", borderRadius : "30px", padding : "1%", justifyContent : "center",}}
                                onClick={() => handleClick(meal)}
                            >
                                {changement && changement._id=== meal._id && (
                                    <form style={{ borderRadius:"20px", width:"auto", padding:"5%", display:"inline-grid",margin:"auto", justifyContent:"center", alignItems:"center"}}>
                                        <h3>Changement de {meal.title}</h3>

                                        <label>Nom</label>
                                        <input
                                            type="Nom"

                                        />
                                        <label>Password:</label>
                                        <input
                                            type="password"

                                        />

                                        <button>log in</button>


                                    </form>
                                )}
                                <p style={{ color: 'White', fontFamily: 'Whisper', fontStyle: 'Regular', fontSize: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>{meal.title}</p>
                                {!changement && selectedMeal && selectedMeal._id === meal._id && (
                                    <div style={{ textAlign: 'center' }}>
                                        <p>{meal.description}</p>
                                    </div>
                                )}
                                {user && (
                                    <div style={{ textAlign: 'center' }}>
                                       <button
                                           style={{marginBottom:"10px", marginTop:"20px",fontFamily:"Whisper", fontSize:"30px", color:"white", backgroundColor:"transparent", borderStyle:"none", padding:"15px", borderTop:"solid white", borderBottom:"solid white"}}
                                           onClick={() => handleClick1(meal)}
                                       >
                                           changer
                                       </button>
                                    </div>
                                )}

                            </div>))}




                    </div>
                </div>
            </main>
        </>
    );
}
