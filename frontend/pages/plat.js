import Head from 'next/head'
import 'semantic-ui-css/semantic.min.css'
import Navbar from "./componenent/Navbar";
import {Divider} from "semantic-ui-react";
import { useState } from 'react';





export default function Home() {

    const [selectedDish,setSelectedDish] = useState(null);
    const [selectedDish1,setSelectedDish1] = useState(null);
    const [selectedDish2,setSelectedDish2] = useState(null);
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>
            <main>
                <div>
                    <Navbar/>

                    <Divider horizontal style={{marginTop:"10px", marginLeft:"10px", marginRight:"10px", lineHeight:"30px"}}>
                        <p style={{color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px"}}>PLAT</p>
                    </Divider>
                    <div  style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <div id="target-element" style={{textAlign : "center"}}  onClick={() => handleClick()}>
                        <p  style={{color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px",  display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}} >Sautée de Pomme de terre</p>
                        {selectedDish && (
                            <div style ={{textAlign: 'center' }}>

                                <p>Pomme de terre sautée à la poele</p>
                            </div>
                        )}
                    </div>
                        <div id="target-element1"  style={{textAlign : "center", marginTop: "3%"}} onClick={() => handleClick1()}>
                        <p style={{color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px",display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>Sautée de Pomme de terre</p>
                            {selectedDish1 && (
                                <div style ={{textAlign: 'center' }}>

                                    <p>Pomme de terre sautée à la poele</p>
                                </div>
                            )}
                        </div>
                        <div id="target-element2"  style={{textAlign : "center", marginTop: "3%"}} onClick={() => handleClick2()} >
                            <p style={{color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px",display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>Sautée de Pomme de terre</p>
                            {selectedDish2 && (
                                <div style ={{textAlign: 'center' }}>

                                    <p>Pomme de terre sautée à la poele</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>



        </>
    )


    function handleClick2() {
        const element2 = document.getElementById("target-element2");
        // Changer le style de l'élément
        if(selectedDish2==null)
        {
            setSelectedDish2("patate");
            element2.style.backgroundColor = "#FFFFFF0F";
            element2.style.color = "white";
            element2.style.fontSize = "24px";
            element2.style.width ="80%";
            element2.style.height ="80%";
            element2.style.borderRadius="30px";
            element2.style.padding="1%";
            element2.style.justifyContent="center";

        }
        else
        {
            element2.style.textAlign="center";
            element2.style.backgroundColor = "#FFFFFF00";
            setSelectedDish2(null);
        }


    }
    function handleClick1() {
        const element1 = document.getElementById("target-element1");
        // Changer le style de l'élément
        if(selectedDish1==null)
        {
            setSelectedDish1("patate");
            element1.style.backgroundColor = "#FFFFFF0F";
            element1.style.color = "white";
            element1.style.fontSize = "24px";
            element1.style.width ="80%";
            element1.style.height ="20%";
            element1.style.borderRadius="30px";
            element1.style.padding="1%";
            element1.style.justifyContent="center";

        }
        else
        {
            element1.style.textAlign="center";
            element1.style.backgroundColor = "#FFFFFF00";
            setSelectedDish1(null);
        }


    }
    function handleClick() {
        const element = document.getElementById("target-element");
        // Changer le style de l'élément
        if(selectedDish==null)
        {
            setSelectedDish("patate");
            element.style.backgroundColor = "#FFFFFF0F";
            element.style.color = "white";
            element.style.fontSize = "24px";
            element.style.width ="80%";
            element.style.height ="20%";
            element.style.borderRadius="30px";
            element.style.padding="1%";
            element.style.justifyContent="center";

        }
        else
        {
            element.style.textAlign="center";
            element.style.backgroundColor = "#FFFFFF00";
            setSelectedDish(null);
        }


    }
}


