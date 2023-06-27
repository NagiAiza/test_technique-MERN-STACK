import Head from 'next/head'
import 'semantic-ui-css/semantic.min.css'
import Navbar from "./componenent/Navbar";
import {Divider} from "semantic-ui-react";

export default function Home() {
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

                <Divider horizontal style={{marginTop:"10px", marginLeft:"10px", marginRight:"10px"}}>
                    <p style={{color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px"}}>MENU</p>
                </Divider>

                <div style={{textAlign : "center", marginTop: "5%"}}>
                    <a href={"./entree"} style={{marginTop:"40px",color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px"}}>ENTRÉE</a>
                    <p style={{marginTop:"10px",color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px"}}>.</p>
                    <a href={"./plat"} style={{marginTop:"10px",color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px"}}>PLAT</a>
                    <p style={{marginTop:"10px",color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px"}}>.</p>
                    <a href={"./dessert"} style={{marginTop:"10px",color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px"}}>DESSERT</a>
                    <p style={{marginTop:"10px",color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px"}}>.</p>
                    <a href={"./vins"} style={{marginTop:"10px",color:"White",fontFamily:"Whisper",fontStyle: "Regular", fontSize:"32px"}}>VINS</a>
                </div>
            </div>
            </main>



        </>
    )
}
