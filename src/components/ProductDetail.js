import React, { useEffect, useMemo, useState } from 'react';
import '../Css/ProductDetail.css';
import Products from './Products';

const ProductDetail = ({ product, onBack, selectedCategory }) => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showBackButton, setShowBackButton] = useState(false);
    const [photosLoaded, setPhotosLoaded] = useState(false);
    const [options, setOptions] = useState(null);
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [error, setError] = useState(null);

    const getThreshold = () => window.innerWidth < 768 ? 0.05 : 0.13;

    const observer = useMemo(() => {
        return new IntersectionObserver(
            ([entry]) => {
                setShowBackButton(entry.isIntersecting && photosLoaded);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: getThreshold()
            }
        );
    }, [photosLoaded]);

    useEffect(() => {
        const productsSection = document.querySelector('.products-section');
        if (!productsSection) return;

        observer.observe(productsSection);
        return () => observer.unobserve(productsSection);
    }, [observer]);

    useEffect(() => {
        const fetchOptions = async () => {
            setLoadingOptions(true);
            setError(null);
            try {
                const response = await fetch('/data/productOptions.json');
                if (!response.ok) {
                    throw new Error('Ürün seçenekleri alınamadı.');
                }
                const data = await response.json();
                if (product?.category === 'dusakabin') {
                    setOptions(data.dusakabin);
                }
            } catch (error) {
                console.error('JSON verisi çekilirken hata oluştu:', error);
                setError(error.message);
            } finally {
                setLoadingOptions(false);
            }
        };

        fetchOptions();
    }, [product]);

    useEffect(() => {
        setCurrentCategory(selectedCategory);
        console.log(selectedCategory)
    }, [selectedCategory]);

    const handleImageLoad = () => setPhotosLoaded(true);

    const splitMeasurements = (measurements) => {
        if (!measurements) return [[], []];
        const measurementsArray = measurements.split('\n');
        const middleIndex = Math.ceil(measurementsArray.length / 2);
        const firstColumn = measurementsArray.slice(0, middleIndex);
        const secondColumn = measurementsArray.slice(middleIndex);
        return [firstColumn, secondColumn];
    };

    return (
        <div className="products-section">
            <div className="product-detail-container">
                <button className={`back-button-detail ${showBackButton ? 'show' : ''}`} onClick={onBack}>
                    &larr; Geri Dön
                </button>

                {currentCategory ? (
                    <Products selectedCategory={currentCategory} />
                ) : product?.category === 'dusakabin' ? (
                    <>
                        <div className="product-text"><h2>{product?.name}</h2></div>
                        <div className="big-photo">
                            <img src={product?.bigPhotoUrl} alt="Büyük Ürün Fotoğrafı" onLoad={handleImageLoad} loading="lazy" />
                        </div>

                        <div className="horizontal-photos">
                            <img src={product?.horizontalPhoto1Url} alt="Ürün Fotoğrafı 1" onLoad={handleImageLoad} loading="lazy" />
                            <img src={product?.horizontalPhoto2Url} alt="Ürün Fotoğrafı 2" onLoad={handleImageLoad} loading="lazy" />
                        </div>

                        <div className="photo-and-description">
                            <img src={product?.photoAndDescriptionPhotoUrl} alt="Ürün Açıklama Fotoğrafı" onLoad={handleImageLoad} loading="lazy" />
                            <div className="description">
                                <p>{product?.description2}</p>
                            </div>
                        </div>

                        {loadingOptions ? (
                            <p>Yükleniyor...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : options ? (
                            <ProductOptions options={options} />
                        ) : (
                            <p>Seçenek bulunamadı.</p>
                        )}
                    </>
                ) : product?.category === 'küvet' || product?.category === 'tekne' ? (
                    <>
                        <div className="product-text"><h2>{product?.name}</h2></div>
                        <div className="photo-and-description">
                            <img src={product?.image} alt="Ürün Açıklama Fotoğrafı" onLoad={handleImageLoad} loading="lazy" />
                            <div className="measurements">
                                <h3 className='measurements-header'>Ölçüler:</h3>
                                <div className="measurements-columns">
                                    {splitMeasurements(product?.measurements).map((column, colIndex) => (
                                        <div className="measurements-column" key={colIndex}>
                                            {column.map((measurement, index) => (
                                                <p key={index}>{measurement}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="description">
                            <p>{product?.description}</p>
                        </div>
                    </>
                ):(
                    <div className="other-category-design">
                        <div className="product-text"><h2>{product?.name}</h2></div>
                        <div className="big-photo">
                            <img src={product?.bigPhotoUrl} alt="Büyük Ürün Fotoğrafı" onLoad={handleImageLoad} loading="lazy" />
                        </div>

                        <div className="photo-and-description">
                            <div className="description">
                                <p>{product?.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductOptions = ({ options }) => {
    const optionCategories = [
        { title: 'Profil Renk Seçenekleri', key: 'profilRenkleri', link: '../catalog.pdf' },
        { title: 'Cam Renk Seçenekleri', key: 'camRenkleri', link: '../catalog.pdf' },
        { title: 'Cam Desen Seçenekleri', key: 'camDesenleri', link: '../catalog.pdf' },
        { title: 'Dijital Desen Seçenekleri', key: 'camDijitalDesenleri', link: '../catalog.pdf' }
    ];

    return (
        <>
            {optionCategories.map((category, index) => (
                <div className="options" key={index}>
                    <h3>{category.title}</h3>
                    <div className="option-items">
                        {options[category.key]?.map((item, idx) => (
                            <div className="option-item" key={idx}>
                                <img src={item.imgUrl} alt={item.title} loading="lazy" />
                                <p>{item.title}</p>
                            </div>
                        ))}
                    </div>

                    <a href={category.link} target="_blank" rel="noopener noreferrer">Tüm seçeneklere bakmak için tıklayınız</a>
                </div>
            ))}
        </>
    );
};

export default ProductDetail;
