import React from 'react';
import './Footer.css';

const Footer = () => {
    let currentYear = new Date().getFullYear()

    return (
        <div className='footer'>
            <p className='footer-text'>Made with love by us &lt;3</p>
            <p className='footer-text'>&#169; {currentYear} by The Inkwell</p>
        </div>
    )
}

export default Footer;