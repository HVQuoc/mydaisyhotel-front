import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <section className="container mt-5">
            <h2>Welcome to admin page</h2>
            <hr />
            <Link to={"/existing-rooms"}>Manage room</Link>
            <br />
            <Link to={"/existing-bookings"}>Manage booking</Link>
        </section>    
    )
}

export default Admin
