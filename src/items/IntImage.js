import React, { useState } from 'react';
import miaFoto from '../imgs/mypic.jpg';

function ImmagineInterattiva({ miaFoto }) {
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left; // posizione X nel contenitore
    const y = e.clientY - bounds.top;  // posizione Y nel contenitore
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // massimo 10 gradi
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle({
      transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({ transform: 'rotateX(0deg) rotateY(0deg)', transition: 'transform 0.3s ease-in' });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px', width: '300px', height: '300px' }}
    >
      <img
        src={miaFoto}
        alt="Lorenzo Fezza"
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '4px solid #FFF',
          ...transformStyle
        }}
      />
    </div>
  );
}

export default ImmagineInterattiva;
