import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { Menu } from 'semantic-ui-react'
import React, { Component } from 'react'
import Link from 'next/link';

const Navbar = () => {


    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (

            <Menu secondary stackable style={{fontFamily: 'Whisper', fontSize:"30px", padding:"10px", marginRight:"20px", marginLeft:"20px" , borderBottom:"solid 1px",color:"white"}} >

                <Menu.Item
                    name='Acceuil'
                    style={{color:"white"}}

                    href={"../"}


                >
                    Accueil
                </Menu.Item>
                <Menu.Item
                    name='Menu'
                    style={{color:"white"}}

                    href={"../menu"}
                    position={"right"}

                >
                    Menu
                </Menu.Item>
                <Menu.Item
                    name='Reserver'
                    style={{color:"white"}}


                    href={"../reserver"}
                >
                    Réserver
                </Menu.Item>
                {!user && (

                <Menu.Item
                    name='Se connecter'
                    style={{color:"white"}}


                    href={"/Login"}
                >
                    Se connecter

                </Menu.Item>
                )}
                {!user && (
                <Menu.Item
                    name='Se connecter'
                    style={{color:"white"}}


                    href={"/Signup"}
                >
                    S'inscrire

                </Menu.Item>

                )}
                {user && (
                    <Menu.Item
                        name='Se connecter'
                        style={{color:"white"}}

                        onClick={handleClick}

                    >

                        Log out

                    </Menu.Item>

                )}




            </Menu>

    )
}

export default Navbar
