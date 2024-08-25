import React, { useState, useEffect } from 'react';
import '../Css/Products.css';
import ProductDetail from './ProductDetail';

const Products = ({ selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error('Veri alınamadı, lütfen tekrar deneyin.');
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setCurrentCategory(selectedCategory);
      setSelectedSubcategory(null);
      setSelectedProduct(null);
    } else {
      setCurrentCategory(null);
      setSelectedSubcategory(null);
      setSelectedProduct(null);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setSelectedSubcategory(null);
    setSelectedProduct(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSelectedProduct(null);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    } else if (selectedSubcategory) {
      setSelectedSubcategory(null);
    } else {
      setCurrentCategory(null);
    }
  };

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="products-section" id="products">
      <div className="products-header">
        <h2>Ürünler</h2>
      </div>

      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={handleBackClick} />
      ) : selectedSubcategory ? (
        <>
          <button onClick={handleBackClick} className="back-button">
            Geri Dön
          </button>
          <div className="products-grid">
            {selectedSubcategory.products.map((product, index) => (
              <div className="product" key={index} onClick={() => handleProductClick(product)}>
                <div className="product-content">
                  <div className="product-text">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : currentCategory ? (
        <>
          <button onClick={handleBackClick} className="back-button">
            Geri Dön
          </button>
          <div className="products-grid">
            {currentCategory.subcategories ? (
              currentCategory.subcategories.map((subcategory, index) => (
                <div className="product" key={index} onClick={() => handleSubcategoryClick(subcategory)}>
                  <div className="product-content">
                    <div className="product-text">
                      <h2>{subcategory.name}</h2>
                      <p>{subcategory.description}</p>
                    </div>
                    <div className="product-image">
                      <img src={subcategory.image} alt={subcategory.name} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              currentCategory.products.map((product, index) => (
                <div className="product" key={index} onClick={() => handleProductClick(product)}>
                  <div className="product-content">
                    <div className="product-text">
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                    </div>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="products-grid">
          {categories.map((category, index) => (
            <div className="product" key={index} onClick={() => handleCategoryClick(category)}>
              <div className="product-content">
                <div className="product-text">
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </div>
                <div className="product-image">
                  <img src={category.image} alt={category.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
