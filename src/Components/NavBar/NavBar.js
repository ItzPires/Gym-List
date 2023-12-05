import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <div className="logo-box">
                    <span className="first-letter">G</span>
                    <span className="rest-of-word">ym</span>
                </div>
            </Link>
            <div className="links">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to="/exercises" className={location.pathname === '/exercises' ? 'active' : ''}>Exercises</Link>
            </div>
        </nav>
    );
}

export default Navbar;
