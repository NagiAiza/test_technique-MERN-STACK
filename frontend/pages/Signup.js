import { useState } from "react"
import { useSignup } from "./hooks/useSignup"
import Navbar from "@/pages/componenent/Navbar";


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
            <Navbar/>
        <div style={{justifyContent:"center", alignItems:"center"}}>
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
        </>
    )
}

export default Signup
