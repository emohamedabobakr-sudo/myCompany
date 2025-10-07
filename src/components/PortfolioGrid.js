import React, { useEffect, useState } from "react";
import "../App.css";

const PortfolioGrid = ({ setSelectedProject }) => {
  const [projects, setProjects] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState({});

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data?.projects) {
          setProjects(data.projects);

          const initialIndexes = {};
          data.projects.forEach((p) => {
            if (p.images?.length > 0) {
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
      [id]: (prev[id] + 1) % imagesLength,
    }));
  };

  const prevSlide = (id, imagesLength) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + imagesLength) % imagesLength,
    }));
  };

  return (
    <div className="portfolio-container">
      {projects?.map((project) => (
        <div
          key={project.id}
          className="portfolio-card"
          onClick={() => setSelectedProject(project)} // ✅ فتح المشروع عند الضغط
          style={{ cursor: "pointer" }}
        >
          {/* Slider */}
          <div className="slider">
            {project.images?.length > 0 ? (
              <>
                <button
                  className="arrow left"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ علشان الضغط على الزر ما يفتحش المشروع
                    prevSlide(project.id, project.images.length);
                  }}
                >
                  ❮
                </button>

                <img
                  src={project.images[currentIndexes[project.id]]}
                  alt={project.title}
                />

                <button
                  className="arrow right"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide(project.id, project.images.length);
                  }}
                >
                  ❯
                </button>

                {/* Dots */}
                <div className="dots" onClick={(e) => e.stopPropagation()}>
                  {project.images.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${
                        currentIndexes[project.id] === index ? "active" : ""
                      }`}
                      onClick={() =>
                        setCurrentIndexes((prev) => ({
                          ...prev,
                          [project.id]: index,
                        }))
                      }
                    ></span>
                  ))}
                </div>
              </>
            ) : (
              <p className="no-images">No images available</p>
            )}
          </div>

          <h3>{project.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid;
