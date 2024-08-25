import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Home.css';

// Yerel görselleri içe aktarın
import firstSlide from '../assets/1.jpg';
import secondSlide from '../assets/2.jpg';
import thirdSlide from '../assets/3.jpg';

function Home() {
  return (
    <section id="home" className="home">
      <Carousel className="carousel" interval={3000} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={firstSlide}
            alt="Birinci slayt"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Kalitenin Adresi</h3>
            <p>Nova Banyo olarak sizlere en kaliteli banyo çözümlerini sunuyoruz.</p>
            <a href="#about" className="btn btn-primary">Daha Fazla Bilgi</a>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={secondSlide}
            alt="İkinci slayt"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Geniş Ürün Yelpazesi</h3>
            <p>Banyonuz için ihtiyaç duyduğunuz tüm ürünleri burada bulabilirsiniz.</p>
            <a href="#products" className="btn btn-primary">Ürünlerimizi Keşfedin</a>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={thirdSlide}
            alt="Üçüncü slayt"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Müşteri Memnuniyeti</h3>
            <p>Uzman ekibimizle her zaman yanınızdayız. İhtiyacınız olan her şey burada.</p>
            <a href="#contact" className="btn btn-primary">Bize Ulaşın</a>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default Home;
