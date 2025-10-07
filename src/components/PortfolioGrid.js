import React, { useEffect, useState } from "react";
import "../App.css";

const resolveAsset = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${process.env.PUBLIC_URL}${cleaned}`;
};

const PortfolioGrid = ({ setSelectedProject }) => {
  const [projects, setProjects] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState({});

  // ✅ تحميل الداتا مرة واحدة فقط
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.projects) {
          const fixedProjects = data.projects.map((p) => ({
            ...p,
            images: p.images?.map((img) => resolveAsset(img)) || [],
          }));
          setProjects(fixedProjects);

          // ضبط البداية لكل مشروع على أول صورة
          const initIndexes = {};
          fixedProjects.forEach((p) => {
            if (p.images.length > 0) initIndexes[p.id] = 0;
          });
          setCurrentIndexes(initIndexes);
        }
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  // ✅ وظائف السلايدر
  const nextSlide = (id, len, e) => {
    e.stopPropagation();
    setCurrentIndexes((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) + 1) % len,
    }));
  };

  const prevSlide = (id, len, e) => {
    e.stopPropagation();
    setCurrentIndexes((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) - 1 + len) % len,
    }));
  };

  return (
    <div className="portfolio-container">
      {projects.map((project) => {
        const images = project.images || [];
        const idx = currentIndexes[project.id] ?? 0;

        return (
          <div
            key={project.id}
            className="portfolio-card"
            onClick={() => setSelectedProject(project)}
            style={{ cursor: "pointer" }}
          >
            {images.length > 0 ? (
              <div className="slider">
                {/* الصورة الحالية */}
                <img
                  src={images[idx]}
                  alt={project.title}
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />

                {/* الأسهم */}
                {images.length > 1 && (
                  <>
                    <button
                      className="arrow left"
                      onClick={(e) => prevSlide(project.id, images.length, e)}
                    >
                      ❮
                    </button>

                    <button
                      className="arrow right"
                      onClick={(e) => nextSlide(project.id, images.length, e)}
                    >
                      ❯
                    </button>
                  </>
                )}

                {/* النقاط */}
                <div className="dots" onClick={(e) => e.stopPropagation()}>
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`dot ${idx === i ? "active" : ""}`}
                      onClick={() =>
                        setCurrentIndexes((prev) => ({
                          ...prev,
                          [project.id]: i,
                        }))
                      }
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p>No images</p>
            )}

            <h3>{project.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioGrid;
/*---------------------*/