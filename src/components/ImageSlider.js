// src/components/ImageSlider.jsx
import React, { useEffect, useState } from "react";

const resolveAsset = (p) => {
  if (!p) return "";
  if (p.startsWith("http")) return p;
  const cleaned = p.startsWith("/") ? p : `/${p}`;
  return `${process.env.PUBLIC_URL}${cleaned}`;
};

export default function ImageSlider({ projects }) {
  const sliderImages = projects
    .map((p) => (Array.isArray(p.images) && p.images.length ? p.images[0] : null))
    .filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sliderImages.length === 0) return;
    const id = setInterval(() => {
      setCurrentIndex((s) => (s + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [sliderImages.length]);

  if (sliderImages.length === 0) return null;

  return (
    <div className="slider-container">
      <button
        className="prev"
        onClick={() => setCurrentIndex((s) => (s - 1 + sliderImages.length) % sliderImages.length)}
      >
        ❮
      </button>

      <img
        className="slider-image"
        src={resolveAsset(sliderImages[currentIndex])}
        alt={`slide-${currentIndex}`}
      />

      <button
        className="next"
        onClick={() => setCurrentIndex((s) => (s + 1) % sliderImages.length)}
      >
        ❯
      </button>
    </div>
  );
}
