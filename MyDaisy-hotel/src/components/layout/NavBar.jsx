import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false)
    const handleClickShowAccount = () => {
        setShowAccount(prev => !prev)
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <div className="container-fluid">
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
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                Admin
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="d-flex navbar-nav align-items-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Find my booking
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <button
                                className={`btn dropdown-toggle ${showAccount ? "show" : ""}`}
                                type="button"
                                data-bs-target="#dropdownAccount"
                                id="dropdownAccount"
                                aria-expanded="false"
                                onClick={handleClickShowAccount}
                            >
                                Account
                            </button>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="dropdownAccount"
                            >
                                <li className="dropdown-item">
                                    <Link to={"/login"}>Login</Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link to={"/profile"}>Profile</Link>
                                </li>
                                <div className="dropdown-divider"></div>
                                <li className="dropdown-item">
                                    <Link to={"/logout"}>Logout</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
