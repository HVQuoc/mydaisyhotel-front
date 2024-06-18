import React from 'react'

const Header = ({ title }) => {
  return (
    <header className="header p-2">
      <div className="overlay">
          <h1 className="header-title text-center m-0 h-100">{title}</h1>
      </div>
    </header>
  )
}

export default Header
