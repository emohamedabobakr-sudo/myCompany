import React, { useState, useEffect } from "react";

function ImageSlider({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // هنا بنجمع أول صورة من كل مشروع
  const sliderImages = projects
    .map((p) => (p.images?.length > 0 ? p.images[0] : null))
    .filter((img) => img !== null);

  useEffect(() => {
    if (sliderImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [sliderImages.length]);

  if (sliderImages.length === 0) return null;

  return (
    <div className="slider-container">
      <button
        className="prev"
        onClick={() =>
          setCurrentIndex(
            (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
          )
        }
      >
        ❮
      </button>

      <img
        src={sliderImages[currentIndex]}
        alt={`slide-${currentIndex}`}
        className="slider-image"
      />

      <button
        className="next"
        onClick={() =>
          setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
        }
      >
        ❯
      </button>
    </div>
  );
}

export default ImageSlider;
