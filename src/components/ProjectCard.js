// src/components/ProjectCard.js
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiMinus, FiSquare, FiX } from 'react-icons/fi';

const ProjectCard = ({ project, isActive, offset }) => {
  const [isVertical, setIsVertical] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isComingSoon = project.description === "Upcoming";

  useEffect(() => {
    if (project.image) {
      const img = new Image();
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        setIsVertical(ratio < 1.2);
      };
      img.src = project.image;
    }

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [project.image]);

  const handleToggleExpand = () => {
    if (isMobile && !isComingSoon) {
      setIsExpanded(!isExpanded);
    }
  };

  if (!isMobile) {
    return (
      <motion.div
        layout
        drag={isActive ? "x,y" : false}
        dragElastic={0.2}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileDrag={{ scale: 1.05 }}
        animate={{
          x: isActive ? 0 : offset.x,
          y: isActive ? 0 : offset.y,
          scale: isActive ? 1 : offset.scale,
          opacity: isActive ? 1 : 0.2,
          zIndex: isActive ? 100 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: "absolute",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.3)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(8px)",
          padding: "1rem",
          paddingTop: "3rem",
          color: "white",
          display: "flex",
          flexDirection: isVertical ? "row" : "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "auto",
          height: "auto",
          maxWidth: "45vw",
          maxHeight: "60vh"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "2rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 0.5rem",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
            zIndex: 200
          }}
        >
          <FiMinus color="white" size={18} style={{ cursor: "pointer" }} />
          <FiSquare color="white" size={18} style={{ cursor: "pointer" }} />
          <FiX color="white" size={18} style={{ cursor: "pointer" }} />
        </div>

        <div
          style={{
            flexShrink: 0,
            display: isComingSoon ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            marginRight: isVertical ? "1rem" : "0",
            marginBottom: isVertical ? "0" : "1rem"
          }}
        >
          {!isComingSoon && (
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: isVertical ? "auto" : "100%",
                height: isVertical ? "100%" : "auto",
                maxHeight: isVertical ? "40vh" : "none",
                maxWidth: isVertical ? "none" : "40vw",
                objectFit: "contain"
              }}
            />
          )}
        </div>

        <div style={{ flex: "1 1 auto", minWidth: 0, marginTop: "1.5rem" }}>
          <h3>{project.title}</h3>
          {!isComingSoon ? (
            <>
              <p>{project.description}</p>
              <Button variant="primary" href={project.link} target="_blank">
                Visualize
              </Button>
            </>
          ) : (
            <span
              style={{
                display: "inline-block",
                padding: "0.4rem 0.8rem",
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                color: "white"
              }}
            >
              🚧 Coming Soon
            </span>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      onClick={handleToggleExpand}
      drag={false}
      animate={{
        x: isActive ? 0 : offset.x,
        y: isActive ? 0 : offset.y,
        scale: isActive ? 1 : offset.scale,
        opacity: isActive ? 1 : 0.2,
        zIndex: isActive ? 100 : 0
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "absolute",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.3)",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(8px)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        width: "90%",
        maxWidth: "95vw",
        height: "auto",
        maxHeight: isComingSoon ? "25vh" : isExpanded ? "85vh" : "30vh",
        transition: "max-height 0.4s ease, transform 0.3s ease",
        cursor: isComingSoon ? "default" : "pointer"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "2rem",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 0.5rem",
          backgroundColor: "rgba(0,0,0,0.25)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          zIndex: 200
        }}
      >
        <FiMinus color="white" size={18} style={{ cursor: "pointer", marginRight: "8px" }} />
        <FiSquare color="white" size={18} style={{ cursor: "pointer", marginRight: "8px" }} />
        <FiX color="white" size={18} style={{ cursor: "pointer" }} />
      </div>

      {isComingSoon ? (
        <div className="flex flex-col items-center justify-center p-4">
          <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>{project.title}</h3>
          <span
            style={{
              display: "inline-block",
              padding: "0.4rem 0.8rem",
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "12px",
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "white"
            }}
          >
            🚧 Coming Soon
          </span>
        </div>
      ) : (
        <>
          {!isExpanded ? (
            <div className="flex flex-col items-center p-3">
              <h3 style={{ marginBottom: "0.5rem", textAlign: "center" }}>{project.title}</h3>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
            </div>
          ) : (
            <>
              <div
                style={{
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  padding: "1rem"
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    maxHeight: "40vh",
                    objectFit: "contain",
                    borderRadius: "8px"
                  }}
                />
              </div>
              <div style={{ flex: "1 1 auto", minWidth: 0, padding: "0 1rem 1rem 1rem" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>{project.title}</h3>
                <p style={{ marginBottom: "1rem" }}>{project.description}</p>
                <Button variant="primary" href={project.link} target="_blank">
                  Visualize
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </motion.div>
  );
};

export default ProjectCard;