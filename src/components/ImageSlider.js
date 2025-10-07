import React, { useEffect, useState } from "react";

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState([]);

  // ✅ نجيب الصور من data.json من مجلد public
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data.json`);
        const data = await response.json();

        if (Array.isArray(data.projects)) {
          const imgs = data.projects
            .flatMap((p) => (Array.isArray(p.images) ? p.images : []))
            .map((img) =>
              img.startsWith("http")
                ? img
                : `${process.env.PUBLIC_URL}${img.startsWith("/") ? img : "/" + img}`
            )
            .filter(Boolean);

          setSliderImages(imgs);
        }
      } catch (err) {
        console.error("❌ Error fetching images:", err);
      }
    };

    fetchImages();
  }, []);

  // ✅ نغير الصورة كل 3 ثواني
  useEffect(() => {
    if (sliderImages.length === 0) return;
    const id = setInterval(() => {
      setCurrentIndex((s) => (s + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [sliderImages]);

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
