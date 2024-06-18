import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        auth.handleLogout()
        window.location.reload()
        navigate("/", { state: { message: "You have been logged out." } })
    }
    
    const isLoggedIn = (auth.user != null)

    if (isLoggedIn) {
        return (
            <>

                <li>
                    <Link to={"/profile"} className="dropdown-item">
                        Profile
                    </Link>
                </li>
                <li className="dropdown-divider">
                    <hr />
                </li>
                <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                </button>
            </>
        )
    } else {
        return (<hr />)
    }
}

export default Logout
