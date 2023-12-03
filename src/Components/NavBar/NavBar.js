import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <div className="logo-box">
                    <span className="first-letter">G</span>
                    <span className="rest-of-word">ym</span>
                </div>
            </Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/exercises">Exercises</Link>
            </div>
        </nav>
    );
}

export default Navbar;
