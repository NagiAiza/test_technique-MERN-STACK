import { useState } from "react"
import { useLogin } from "./hooks/useLogin"
import Navbar from "@/pages/componenent/Navbar";



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
            <Navbar/>
        <form style={{backgroundColor:"#FFFFFFA4", borderRadius:"20px", width:"auto", padding:"5%", display:"inline-grid",margin:"auto", justifyContent:"center", alignItems:"center"}} className="login" onSubmit={handleSubmit}>
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
        </>
    )
}

export default Login
