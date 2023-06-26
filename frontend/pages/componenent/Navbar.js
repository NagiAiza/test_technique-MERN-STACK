import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import Link from 'next/link';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>

            <div className='container'>
                <Link href="/">
                    <h1>Menu</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link href="/Login">Login</Link>
                            <Link href="/Signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar