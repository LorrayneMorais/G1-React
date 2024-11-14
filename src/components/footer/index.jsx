import React from "react";
import "./Footer.css";
import Logo from "../../assets/images/Logo.png";
import linkedinIcon from "../../assets/images/linkedin.png";
import instagramIcon from "../../assets/images/insta.png";
import githubIcon from "../../assets/images/git.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section logo-section">
                <img src={Logo} alt="Logo" className="footer-logo" />
            </div>
            <div className="footer-section text-section">
                <p>Desenvolvido por Ana Mattos, Lorrayne, Gabriel Cruz, Gabriel Bardason, Sávio, Igor e Júlio</p>
                <p>Serratec - Residência em TIC - 2024-2</p>
            </div>
            <div className="footer-section social-section">
                <div className="social-icons">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                        <img src={githubIcon} alt="GitHub" />
                    </a>
                </div>
                <button className="contact-button">Contato</button>
            </div>
        </footer>
    );
};

export default Footer;