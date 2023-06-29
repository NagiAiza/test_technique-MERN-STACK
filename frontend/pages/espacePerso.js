import React, { useEffect, useState } from "react"
import { useAuthContext } from "./hooks/useAuthContext"
import { Menu } from 'semantic-ui-react'
import Head from "next/head";




const MonCompte = () => {
    const {user} = useAuthContext()//il me faut l'id
    const [userData, setUserData] = useState(null);
    const [reservationsData, setReservationsData] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user/'+user.email, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            setUserData(json);
            if(response){
                console.log(user._id)
                const response2 = await fetch ('/api/reservation/user/'+user._id, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json2 = await response2.json()
                setReservationsData(json2);
            }

        }
        if (user) {
            fetchUser()
        }
    }, [user])

    //manque la liste de reservation
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
        <div style={{margin:"1%",textAlign:"center",}} className="home">
            <h1 style={{textAlign:"center", color:"white"}}>Espace Perso</h1>
            <p style={{textAlign:"center",color:"white"}}><strong>Prenom: </strong>{userData?.prenom}</p>
            <p style={{textAlign:"center",color:"white"}}><strong>Nom: </strong>{userData?.nom}</p>
            {userData?.image && (
                <img
                    src={`http://localhost:4000/${userData.image}`}
                    alt="User Image"
                    style={{ width: "200px", height: "200px" }}
                />
            )}
            <h3>Mes reservations</h3>

            {reservationsData && reservationsData.length > 0 ? (
                <ul>
                    {reservationsData.map((reservation) => (
                        <li key={reservation._id}>
                            {/* Afficher les détails de la réservation */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune réservation trouvée</p>
            )}

            <h3 style={{textAlign:"center"}}>
             <a style={{textAlign:"center",color:"white", textDecoration:"none"}} href={`/editProfil?id=${userData?._id}&fname=${userData?.prenom}&name=${userData?.nom}`}>Modifier le profil</a>
            </h3>
        </div>

                </div>
            </main>
        </>
    )
}

export default MonCompte
