import React, { useEffect, useRef } from "react";

const TrailSquares = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const squares = [];

    const getRandomColor = () =>
      `hsl(${Math.random() * 360}, 70%, 60%)`;

    const getRandomSize = () =>
      Math.random() * 10 + 3; // 3-13px, più piccoli

    const handleMouseMove = (e) => {
      if (Math.random() < 0.3) { // 30% di probabilità
        squares.push({
          x: e.clientX,
          y: e.clientY,
          size: getRandomSize(),
          color: getRandomColor(),
          life: 30,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = squares.length - 1; i >= 0; i--) {
        const s = squares[i];
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x, s.y, s.size, s.size);
        s.life -= 1;
        if (s.life <= 0) squares.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default TrailSquares;
