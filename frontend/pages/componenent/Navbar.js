import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>

            <div className='container'>
                <a href="/">
                    <h1>Menu</h1>
                </a>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <a href="/Login">Login</a>
                            <a href="/Signup">Signup</a>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar