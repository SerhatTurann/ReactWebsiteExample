import React, { useState, useEffect } from 'react';
import '../Css/ScrollToTop.css';
import { FaArrowUp, FaPhone, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div className="icon-container">
          <button onClick={scrollToTop} className="scroll-button">
            <FaArrowUp />
          </button>
          <button onClick={() => window.location.href = 'tel:+902164988242'} className="scroll-button">
            <FaPhone />
          </button>
          <button onClick={() => window.open('https://wa.me/902164988242', '_blank')} className="scroll-button">
            <FaWhatsapp />
          </button>
          <button onClick={() => window.open('https://maps.google.com/maps?hl=tr&gl=tr&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x14cad1bf8c789927:0xdb44428e033a5f58', '_blank')} className="scroll-button">
            <FaMapMarkerAlt />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
