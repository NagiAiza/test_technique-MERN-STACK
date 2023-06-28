import { useEffect, useState } from "react"
import { useAuthContext } from "./hooks/useAuthContext"
import Navbar from "@/pages/componenent/Navbar";

const MonCompte = () => {
    const {user} = useAuthContext()
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user/'+user.email, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            setUserData(json);
        }

        if (user) {
            fetchUser()
        }
    }, [user])

    //manque la liste de reservation
    return (
        <>
        <Navbar/>
        <div className="home">
            <h1 style={{color:"white"}}>Espace Perso</h1>
            <p style={{color:"white"}}><strong>Prenom: </strong>{userData?.prenom}</p>
            <p style={{color:"white"}}><strong>Nom: </strong>{userData?.nom}</p>
            {userData?.image && (
                <img
                    src={`http://localhost:4000/${userData.image}`}
                    alt="User Image"
                    style={{ width: "200px", height: "200px" }}
                />
            )}
        </div>
        </>
    )
}

export default MonCompte