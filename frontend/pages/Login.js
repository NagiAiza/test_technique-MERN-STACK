import { useState } from "react"
import { useLogin } from "./hooks/useLogin"

import Head from "next/head";
import {Menu} from "semantic-ui-react";



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()



    const handleSubmit = async (e) => {
        e.preventDefault() //evite de recharger la page apres avoir appuyer sur le bouton

        await login(email, password)

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
        <form style={{backgroundColor:"#FFFFFFA4", borderRadius:"20px", width:"auto", padding:"5%", display:"inline-grid",margin:"1%", justifyContent:"center", alignItems:"center"}} className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>log in</button>
            {error && <div className="error">{error}</div>}

        </form>
                </div>
            </main>
        </>
    )
}

export default Login
