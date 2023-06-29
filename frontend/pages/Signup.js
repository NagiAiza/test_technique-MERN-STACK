import { useState } from "react"
import { useSignup } from "./hooks/useSignup"
import Navbar from "@/pages/componenent/Navbar";
import Head from "next/head";
import {Menu} from "semantic-ui-react";


const Signup = () => {
    const [email, setEmail] = useState('')
    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(null);
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault() //evite de recharger la page apres avoir appuyer sur le bouton
        await signup(email, password, 'Customer', prenom, nom, image)
    }


    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Généré par create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <div>
                    <Menu secondary stackable style={{fontFamily: 'Whisper', fontSize:"30px", padding:"10px", marginRight:"20px", marginLeft:"20px" , borderBottom:"solid 1px",color:"white"}} >

                        <Menu.Item
                            name='Acceuil'
                            style={{color:"white", textDecoration:"none",marginLeft:"1%"}}

                            href={"../"}


                        >
                            Accueil
                        </Menu.Item>
                        <Menu.Item
                            name='Menu'
                            style={{color:"white", textDecoration:"none",marginLeft:"1%"}}

                            href={"../menu"}
                            position={"right"}

                        >
                            Menu
                        </Menu.Item>
                        <Menu.Item
                            name='Reserver'
                            style={{color:"white", textDecoration:"none",marginLeft:"1%"}}


                            href={"../reserver"}
                        >
                            Réserver
                        </Menu.Item>
                    </Menu>
        <div style={{justifyContent:"center", alignItems:"center",margin:"1%"}}>
        <form style={{backgroundColor:"#FFFFFFA4", borderRadius:"20px", width:"auto", padding:"5%", display:"inline-grid",margin:"auto", justifyContent:"center", alignItems:"center"}} className="signup" onSubmit={handleSubmit}>

            <h3>Sign up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Prenom:</label>
            <input
                type="prenom"
                onChange={(e) => setPrenom(e.target.value)}
                value={prenom}
            />
            <label>Nom:</label>
            <input
                type="nom"
                onChange={(e) => setNom(e.target.value)}
                value={nom}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <label>Image:</label>
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />

            <button  disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
            </div>
                </div>
            </main>
        </>
    )
}

export default Signup
