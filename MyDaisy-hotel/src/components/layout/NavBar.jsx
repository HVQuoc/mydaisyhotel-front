import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../auth/Logout'

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false)
    const handleClickShowAccount = () => {
        setShowAccount(prev => !prev)
    }
    const isLoggedIn = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")
    const isAdmin = userRole?.includes("ROLE_ADMIN")

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
            <div className="container">
                <NavLink className="nav-link" to="/">
                    <span className="hotel-color"><strong>My Daisy Hotel</strong></span>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aira-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                                Browse all rooms
                            </NavLink>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className="d-flex navbar-nav align-items-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Find my booking
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
                                onClick={handleClickShowAccount}
                            >
                                Account
                            </a>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="dropdownAccount"
                                style={{"transform": "translateX(-50%)"}}
                            >
                                {isLoggedIn ? (<Logout />) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
