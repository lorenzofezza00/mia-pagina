// import React, { useEffect, useRef } from "react";
// import { tsParticles } from "tsparticles-engine";
// import { loadFull } from "tsparticles";

// export default function BackgroundNetwork() {
//   const particlesRef = useRef(null);

//   useEffect(() => {
//     const initParticles = async () => {
//       await loadFull(tsParticles);
//       tsParticles.load(particlesRef.current.id, {
//         background: { color: "#121212" },
//         // background: { color: "transparent" },
//         particles: {
//           number: { value: 50, density: { enable: true, area: 800 } },
//           color: { value: "#ffffff" },
//           shape: { type: "circle" },
//           opacity: { value: 0.7 },
//           size: { value: 3 },
//           links: {
//             enable: true,
//             distance: 150,
//             color: "#ffffff",
//             opacity: 0.2,
//             width: 1
//           },
//           move: {
//             enable: true,
//             speed: 0.3,
//             direction: "none",
//             outModes: { default: "out" }
//           }
//         }
//       });
//     };

//     initParticles();
//   }, []);

//   return (
//     <div
//     id="tsparticles"
//     ref={particlesRef}
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: `${document.body.scrollHeight}px`, // altezza reale del body
//       zIndex: 0,
//     }}
//   />

//   );
// }

// src/components/layout/BackgroundNetwork.js
import React, { useEffect, useRef } from "react";

export default function BackgroundNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- CONFIGURAZIONE POTENZIATA ---
    const particleCount = 180;        // Più pallini (da 120 a 180)
    const connectionDist = 350;       // Linee più lunghe (da 300 a 350)
    const baseParticleSize = 3.5;     // Pallini più grandi (da 2.5 a 3.5)
    
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 2000,
    }));

    let animationFrameId;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity += delta * 0.8; 
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    const draw = () => {
      ctx.fillStyle = "#121212";
      ctx.fillRect(0, 0, width, height);

      scrollVelocity *= 0.92; 
      const totalSpeed = 1.5 + scrollVelocity;

      const cx = width / 2;
      const cy = height / 2;

      // 1. Aggiorna posizioni 3D
      particles.forEach((p) => {
        p.z -= totalSpeed;
        if (p.z < 1) {
          p.z = 2000;
          p.x = (Math.random() - 0.5) * 2000;
          p.y = (Math.random() - 0.5) * 2000;
        } else if (p.z > 2000) {
          p.z = 1;
        }
      });

      // 2. Disegna Collegamenti (Linee più visibili)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectionDist * connectionDist) {
            const dist = Math.sqrt(distSq);
            const x1 = cx + (p1.x / p1.z) * 1000;
            const y1 = cy + (p1.y / p1.z) * 1000;
            const x2 = cx + (p2.x / p2.z) * 1000;
            const y2 = cy + (p2.y / p2.z) * 1000;

            // Opacità aumentata per rendere le linee più presenti
            const opacity = (1 - dist / connectionDist) * (1 - p1.z / 2000) * 0.7;

            if (opacity > 0.05) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.lineWidth = 1.2; // Linee leggermente più spesse
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
          }
        }
      }

      // 3. Disegna Particelle (Pallini più visibili)
      particles.forEach((p) => {
        const sx = cx + (p.x / p.z) * 1000;
        const sy = cy + (p.y / p.z) * 1000;
        // Rendiamo i pallini visibili più a lungo nella profondità
        const opacity = Math.max(0, 1 - p.z / 1800); 

        if (opacity > 0) {
          ctx.beginPath();
          // Aggiungiamo un leggero bagliore ai pallini vicini
          if (p.z < 500) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white";
          } else {
            ctx.shadowBlur = 0;
          }
          
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          const r = (1 - p.z / 2000) * baseParticleSize;
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      // Resettiamo il shadowBlur per non appesantire il ciclo successivo
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "#121212",
      }}
    />
  );
}