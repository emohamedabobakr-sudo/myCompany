import React, { useEffect, useState } from "react";

const resolveAsset = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${process.env.PUBLIC_URL}${cleaned}`;
};

export default function ImageSlider({ projects }) {
  const sliderImages = projects
    .flatMap((p) => (Array.isArray(p.images) ? p.images : []))
    .map((img) => resolveAsset(img));

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
        onClick={() =>
          setCurrentIndex((s) => (s - 1 + sliderImages.length) % sliderImages.length)
        }
      >
        ❮
      </button>

      <img
        className="slider-image"
        src={sliderImages[currentIndex]}
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
