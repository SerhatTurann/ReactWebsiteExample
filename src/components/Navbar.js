import React, { useState, useEffect } from 'react';
import '../Css/Navbar.css';
import logo from '../assets/companyLogo.jpg';

const Navbar = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch('../data/products.json')
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const handleCategoryClick = (category) => {
    onCategoryClick(category); // Kategoriyi üst bileşene ilet
  };

  const handleScroll = () => {
    setIsTransparent(window.scrollY <= 0);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isTransparent ? 'transparent' : ''}`}>
      <a href="#home" className="navbar-logo">
        <img src={logo} alt="Nova Banyo" className="logo" />
      </a>
      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li><a href="#home" onClick={closeMenu}>Anasayfa</a></li>
        <li><a href="#about" onClick={closeMenu}>Hakkımızda</a></li>
        <li><a href="/catalog.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Online Katalog</a></li>
        <li className="dropdown">
          <a href="#products" onClick={() => [closeMenu(), handleCategoryClick(null)]}>Ürünler</a>
          <div className="dropdown-content">
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <a href="#products" onClick={() => [closeMenu(), handleCategoryClick(category)]}>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li><a href="#contact" onClick={closeMenu}>İletişim</a></li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
