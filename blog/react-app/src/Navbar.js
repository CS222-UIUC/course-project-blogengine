import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">The Inkwell</a>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/blog'>Blog</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
        </ul>
    </nav>
}