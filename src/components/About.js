import React, { useState, useEffect } from 'react';
import '../Css/About.css';
import companyImage from '../assets/hakkımızda.jpg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import logo1 from '../assets/logo1.jpg';
import logo2 from '../assets/logo2.jpg';
import logo3 from '../assets/logo3.jpg';
import logo4 from '../assets/logo4.jpg';
import logo5 from '../assets/logo5.jpg';
import logo6 from '../assets/logo6.jpg';
import logo7 from '../assets/logo7.jpg';
import logo8 from '../assets/logo8.jpg';
import logo9 from '../assets/logo9.jpg';
import logo10 from '../assets/logo10.jpg';
import logo11 from '../assets/logo11.jpg';
import logo12 from '../assets/logo12.jpg';
import logo13 from '../assets/logo13.jpg';
import logo14 from '../assets/logo14.jpg';
import logo15 from '../assets/logo15.jpg';

const referenceLogos = [
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8,
  logo9, logo10, logo11, logo12, logo13, logo14, logo15,
];

const About = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [logosPerPage, setLogosPerPage] = useState(5); // Ekranda aynı anda gösterilecek logo sayısı

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - logosPerPage;
      return newIndex < 0 ? referenceLogos.length - logosPerPage : newIndex;
    });
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + logosPerPage;
      return newIndex >= referenceLogos.length ? 0 : newIndex;
    });
  };

  useEffect(() => {
    const updateLogosPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setLogosPerPage(3); // Küçük ekranlar için 3 logo göster
      } else if (width < 1024) {
        setLogosPerPage(4); // Orta boy ekranlar için 4 logo göster
      } else {
        setLogosPerPage(5); // Büyük ekranlar için 5 logo göster
      }
    };

    updateLogosPerPage();
    window.addEventListener('resize', updateLogosPerPage);

    return () => {
      window.removeEventListener('resize', updateLogosPerPage);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000); // Her 3 saniyede bir kaydır

    return () => clearInterval(interval); // Temizleme işlemi
  }, [startIndex, logosPerPage]);

  const visibleLogos = referenceLogos.slice(startIndex, startIndex + logosPerPage);

  return (
    <>
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h1>Hakkımızda</h1>
            <p>Nova Banyo olarak, yenilikçi çözümlerimizle banyolarınıza hem estetik hem de işlevsellik katıyoruz. Yılların getirdiği tecrübemiz ve uzman kadromuzla, müşteri memnuniyetini en üst seviyede tutmayı hedefliyoruz. Geniş ürün yelpazemiz ve modern tasarımlarımızla, banyonuzda hayal ettiğiniz konforu ve şıklığı sunuyoruz.

Misyonumuz, siz değerli müşterilerimize en kaliteli ürün ve hizmetleri sunarak, yaşam alanlarınızı daha da güzelleştirmek. Vizyonumuz ise, sektörde yenilikçi yaklaşımımızla öncü bir marka olarak tanınmaktır.

Nova Banyo ailesi olarak, sürekli gelişim ve yeniliklerle sizlere en iyi hizmeti sunmaktan gurur duyuyoruz. </p>
          </div>
          <div className="about-image">
            <img src={companyImage} alt="Company" />
          </div>
        </div>
      </section>
      <section className="references-section">
        <h2>Referanslar</h2>
        <div className="reference-logos-container">
          <button className="nav-button" onClick={handlePrevClick} disabled={referenceLogos.length <= logosPerPage}>
            <FaArrowLeft className="arrow-icon" />
          </button>
          <div className="reference-logos">
            {visibleLogos.map((logo, index) => (
              <img key={index} src={logo} alt={`Reference ${index + 1}`} className="reference-logo" />
            ))}
          </div>
          <button className="nav-button" onClick={handleNextClick} disabled={referenceLogos.length <= logosPerPage}>
            <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      </section>
    </>
  );
};

export default About;
