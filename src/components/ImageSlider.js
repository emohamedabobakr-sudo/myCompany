import React, { useEffect, useState } from "react";

export default function ImageSlider({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState([]);

  // ✅ نجمع كل الصور من المشاريع اللي جاية من App.js (اللي فيها المسارات الصحيحة)
  useEffect(() => {
    if (projects && projects.length > 0) {
      const imgs = projects
        .flatMap((p) => (Array.isArray(p.images) ? p.images : []))
        .map((img) =>
          img.startsWith("http")
            ? img
            : `${process.env.PUBLIC_URL}${img.startsWith("/") ? img : "/" + img}`
        )
        .filter(Boolean);

      setSliderImages(imgs);
    }
  }, [projects]);

  // ✅ نغير الصورة كل 3 ثواني تلقائيًا
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
          setCurrentIndex(
            (s) => (s - 1 + sliderImages.length) % sliderImages.length
          )
        }
      >
        ❮
      </button>

      <img
        className="slider-image"
        src={sliderImages[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
      />

      <button
        className="next"
        onClick={() =>
          setCurrentIndex((s) => (s + 1) % sliderImages.length)
        }
      >
        ❯
      </button>
    </div>
  );
}
