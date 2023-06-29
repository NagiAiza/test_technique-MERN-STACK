import { useAuthContext } from '../hooks/useAuthContext'
import { useUsersContext } from "../hooks/useUsersContext";
import { useRouter } from 'next/router';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const UserDetails = ({ compte }) => {
    const { dispatch } = useUsersContext()
    const { user } = useAuthContext()
    const router = useRouter();


    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/user/' + compte._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
            router.reload(); // Rafraîchit la page
        }


    }
    return (
        <>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
        <div className="user-details" style={{color:"white"}}>
            <h4>{compte.title}</h4>
            <p><strong>Prenom: </strong>{compte.prenom}</p>
            <p><strong>Nom: </strong>{compte.nom}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
        </>
    )
}

export default UserDetails