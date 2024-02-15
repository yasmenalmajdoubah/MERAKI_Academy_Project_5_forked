import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <h1>WorkedIn</h1>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/discover">Discover</NavLink>
        <NavLink to="/global">Global</NavLink>
    </div>
  )
}

export default NavBar