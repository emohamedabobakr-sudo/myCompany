import React, { useEffect, useState } from "react";

// تم إزالة الوظيفة resolveAsset من هنا
// تم إزالة useEffect الخاص بتحميل data.json من هنا

export default function ImageSlider({ projects }) { // 👈 استلام المشاريع كـ prop
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ دمج صور جميع المشاريع التي تم تصحيح مساراتها مسبقاً
  const sliderImages = projects
    .flatMap((p) => (Array.isArray(p.images) ? p.images : []))
    .filter(Boolean);

  // ✅ نفس useEffect لتغيير الصور كل 3 ثواني
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
      {/* باقي عناصر السلايدر (الأزرار وعلامة img) */}
      <button className="prev"
        // ... (كود الزر السابق)
      >
        ❮
      </button>

      <img
        className="slider-image" 
        src={sliderImages[currentIndex]} // 👈 استخدام المسارات الصحيحة الجاهزة
        alt={`Slide ${currentIndex + 1}`}
      />

      <button className="next"
        // ... (كود الزر التالي)
      >
        ❯
      </button>
    </div>
  );
}