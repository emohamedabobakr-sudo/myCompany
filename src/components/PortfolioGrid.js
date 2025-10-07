// src/components/PortfolioGrid.jsx
import React, { useEffect, useState } from "react";
import "../App.css";

const resolveAsset = (p) => {
  if (!p) return "";
  if (p.startsWith("http")) return p;
  const cleaned = p.startsWith("/") ? p : `/${p}`;
  return `${process.env.PUBLIC_URL}${cleaned}`;
};

const PortfolioGrid = ({ setSelectedProject }) => {
  const [projects, setProjects] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState({});

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.projects) {
          setProjects(data.projects);
          const initialIndexes = {};
          data.projects.forEach((p) => {
            if (Array.isArray(p.images) && p.images.length > 0) {
              initialIndexes[p.id] = 0;
            }
          });
          setCurrentIndexes(initialIndexes);
        }
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  const nextSlide = (id, imagesLength) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) + 1) % imagesLength,
    }));
  };

  const prevSlide = (id, imagesLength) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) - 1 + imagesLength) % imagesLength,
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
            <div className="slider">
              {images.length > 0 ? (
                <>
                  <button
                    className="arrow left"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide(project.id, images.length);
                    }}
                  >
                    ❮
                  </button>

                  <img
                    src={resolveAsset(images[idx])}
                    alt={project.title}
                    style={{ width: "100%", height: "250px", objectFit: "cover" }}
                  />

                  <button
                    className="arrow right"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide(project.id, images.length);
                    }}
                  >
                    ❯
                  </button>

                  <div className="dots" onClick={(e) => e.stopPropagation()}>
                    {images.map((_, i) => (
                      <span
                        key={i}
                        className={`dot ${idx === i ? "active" : ""}`}
                        onClick={() =>
                          setCurrentIndexes((prev) => ({ ...prev, [project.id]: i }))
                        }
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p>No images</p>
              )}
            </div>

            <h3>{project.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioGrid;
