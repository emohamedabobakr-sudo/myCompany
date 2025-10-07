import React, { useState, useEffect } from "react";
import "../App.css";

// 🧩 دالة لتصحيح المسارات
const resolveAsset = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${process.env.PUBLIC_URL}${cleaned}`;
};

const ImageSlider = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState([]);

  // ✅ تجهيز الصور من كل المشاريع
  useEffect(() => {
    if (projects.length > 0) {
      const allImages = projects
        .flatMap((p) => p.images || [])
        .map((img) => resolveAsset(img));
      setSliderImages(allImages);
    }
  }, [projects]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  if (sliderImages.length === 0) return null;

  return (
    <div className="slider-container">
      <div className="slider">
        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>
        <img
          src={sliderImages[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="slider-image"
        />
        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>
      </div>

      <div className="dots">
        {sliderImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
