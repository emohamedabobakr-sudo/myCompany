import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PortfolioGrid from "./components/PortfolioGrid";
import ImageSlider from "./components/ImageSlider"; // ✅ السلايدر
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data?.projects) setProjects(data.projects);
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  // ✅ لو المستخدم اختار مشروع معين
  if (selectedProject) {
    return (
      <div>
        <Navbar setPage={setPage} />
        <div className="project-details">
          <button className="back-btn" onClick={() => setSelectedProject(null)}>
            ⬅ Back
          </button>

          <h2 className="cjdic">{selectedProject.title}</h2>
          <p className="cjdic">{selectedProject.description}</p>
          {selectedProject.location && (
            <p className="cjdic">
              <strong >Location:</strong> {selectedProject.location}
            </p>
          )}
          {selectedProject.category && (
            <p className="cjdic">
              <strong>Category:</strong> {selectedProject.category}
            </p>
          )}
          {selectedProject.year && (
            <p className="cjdic">
              <strong>Year:</strong> {selectedProject.year}
            </p>
          )}

          <div className="project-images">
            {selectedProject.images?.map((img, index) => (
              <img className="vive" key={index} src={img} alt={`project-${index}`} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ الصفحة العادية (Home + باقي الصفحات)
  return (
    <div>
      <Navbar setPage={setPage} />

      {page === "home" && (
        <div>
          {/* ✅ السلايدر فوق */}
          <ImageSlider projects={projects} />

          {/* ✅ الجريد تحت */}
          <div className="home-gallery">
            {projects.map((project) =>
              project.images?.length > 0 ? (
                <img
                  key={project.id}
                  src={project.images[0]} // أول صورة فقط
                  alt={project.title}
                  className="home-image"
                  onClick={() => setSelectedProject(project)} // ✅ فتح التفاصيل عند الضغط
                />
              ) : null
            )}
          </div>
        </div>
      )}

      {page === "about" && <About />}
      {page === "portfolio" && (
  <PortfolioGrid setSelectedProject={setSelectedProject} />
)}

      {page === "contact" && <Contact />}

      <Footer />
    </div>
  );
}

export default App;
