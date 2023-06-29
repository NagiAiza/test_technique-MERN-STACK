import { useEffect } from "react"
import { useAuthContext } from "./hooks/useAuthContext"
import { useUsersContext } from "./hooks/useUsersContext";

// components
import UserDetails from "./componenent/UserDetails";


const Clients = () => {
    const { comptes , dispatch } = useUsersContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_USERS', payload: json})
            }
        }

        if (user) {
            fetchUsers()
        }
    }, [dispatch, user])
    console.log(comptes)
    return (

        <div >
            <div >
                {comptes && comptes.map(compte => (
                    <UserDetails compte={compte} key={compte._id} />
                ))}
            </div>
        </div>

    )
}

export default Clients