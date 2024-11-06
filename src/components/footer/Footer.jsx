import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="logo-section">
                    <p>Logo</p>
                </div>
                <div className="credits-section">
                    <p>Desenvolvido por ...</p>
                    <p>Serratec - Residência em TIC - 2024-2</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;