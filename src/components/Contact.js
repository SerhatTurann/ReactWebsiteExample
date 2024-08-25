import React from 'react';
import '../Css/Contact.css';
import logo from '../assets/companyLogo.jpg';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <footer className="footer">
        <div className="footer-content">
        <div>
          <div className="contact-logo">
            {/*<a href="#home" className="contact-logo">Nova Banyo</a> */}
            <img src={logo} alt="Nova Banyo" className="logo" />
          </div>
          <div className="contact-info">
            <p>Yenilikçi çözümlerle banyolarınıza değer katın.</p>
          </div>
        </div>
        <div className="contact-info">
          <h2>İletişim Bilgileri</h2>
          <p>Adres: Akşemsettin Mh. Tasdik Sk. No : 16, Sultanbeyli, İstanbul</p>
          <p>Telefon: 0(216) 498-8242</p>
          <p>Email: info@novabanyo.com</p>
        </div>
        <div className="social-media">
          <h2>Sosyal Medya</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Nova Banyo &copy; 2024 Tüm Hakları Saklıdır</p>
      </div>
    </footer>
    </section>
    
  );
};

export default Contact;


