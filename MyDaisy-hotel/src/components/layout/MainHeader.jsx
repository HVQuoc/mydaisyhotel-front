import React from 'react'

const MainHeader = () => {
  return (
    <header className="header-banner">
        <div className="overlay"></div>
        <div className="animated-text overlay-content">
            <h1>
                Welcome to <span className="hotel-color">My Daisy Hotel</span>
            </h1>
            <h4>Experience the best hotels in the town</h4>
        </div>
    </header>
  )
}

export default MainHeader
