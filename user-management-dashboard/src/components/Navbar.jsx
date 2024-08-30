import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add-user">Add User</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
