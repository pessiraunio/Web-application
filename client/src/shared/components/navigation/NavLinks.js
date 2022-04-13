import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context'

import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext); //Linking our AuthContext from app

  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    {auth.isLoggedIn && (
      <li>
        <NavLink to={`/${auth.userId}/plans`}>MY PLANS</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/plans/new">ADD PLAN</NavLink>
      </li>
    )}
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li>
    )}

  </ul>
};

export default NavLinks;