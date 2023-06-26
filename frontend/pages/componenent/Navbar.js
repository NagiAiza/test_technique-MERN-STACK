import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'






export default class Navbar extends Component {



    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {


        return (


            <Menu secondary stackable style={{fontFamily: 'Whisper', fontSize:"30px", padding:"10px", marginRight:"20px", marginLeft:"20px" , borderBottom:"solid 1px",color:"white"}} >
                <Menu.Item
                    name='Menu'
                    style={{color:"white"}}
                    onClick={this.handleItemClick}
                    href={"../menu"}


                >
                    Menu
                </Menu.Item>

                <Menu.Item
                    name='Reserver'
                    style={{color:"white"}}
                    onClick={this.handleItemClick}
                    position={"right"}
                    href={"../reserver"}
                >
                    Réserver
                </Menu.Item>

                <Menu.Item
                    name='Se connecter'
                    style={{color:"white"}}

                    onClick={this.handleItemClick}
                    href={"../connexion"}
                >
                    Se connecter

                </Menu.Item>
            </Menu>
        )
    }

}






