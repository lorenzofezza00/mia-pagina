import React, { useEffect, useRef } from "react";
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function BackgroundNetwork() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const initParticles = async () => {
      await loadFull(tsParticles);
      tsParticles.load(particlesRef.current.id, {
        background: { color: "transparent" },
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: 3 },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            outModes: { default: "out" }
          }
        }
      });
    };

    initParticles();
  }, []);

  return (
    <div
      id="tsparticles"
      ref={particlesRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0
      }}
    />
  );
}
