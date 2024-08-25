import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <Navbar onCategoryClick={handleCategoryClick}/>
      <div className="main-content">
        <Home />
        <About />
        <Products selectedCategory={selectedCategory}/>
        <Contact />
      </div>
      <ScrollToTop />
    </div>
  );
}

export default App;
