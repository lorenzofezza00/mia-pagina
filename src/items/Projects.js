import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import HEZW from '../imgs/HomeEZW.png';
import SMPR from '../imgs/SMPR.jpg'
import DA from '../imgs/DA.png'
import TMMA from '../imgs/TMMA.png'
import HOP from '../imgs/hopper.jpg'
import BD from '../imgs/fig_5_state.png'
import APSS from '../imgs/APSS.png'
import { FiMinus, FiSquare, FiX } from 'react-icons/fi'; // import icone

const projects = [
  {
    title: "EZWallet",
    description: "EZWallet is a web application designed to help individuals and families keep track of their expenses. Users can enter and categorize their expenses, allowing them to quickly see where their money is going. EZWallet is a powerful tool for those looking to take control of their finances and make informed decisions about their spending.",
    image: HEZW,
    // link: "#/project/3.1"
    link: "https://github.com/lorenzofezza00/EZWallet"
  },
  {
    title: "Screenshot Multi‑platform Application",
    description: "A cross-platform screen capture utility in Rust for Windows, macOS, and Linux. Capture custom screen areas with an intuitive interface, use customizable hotkeys, save in multiple formats (.png, .jpg, .gif) or copy to the clipboard. Includes annotation tools, a delay timer, configurable save locations, and multi-monitor support.",
    image: SMPR,
    // link: "#/project/3.2"
    link: "https://github.com/lorenzofezza00/Screenshot-Application"
  },
  {
    title: "Real Time Domain Adaptation For Semantic Segmentation",
    description: "This project investigates advanced techniques such as adversarial learning, data augmentation, FDA, and self-supervised strategies to reduce the domain gap and improve model performance.",
    // This project explores the challenges of real-time Semantic Segmentation and how Domain Adaptation can help bridge the gap between different datasets. By combining adversarial training, data augmentation, image-to-image translation (FDA), and self-supervised learning, we aim to improve model generalization across domains. The work highlights both the progress achieved and the remaining challenges in closing the domain shift.
    image: DA,
    link: "https://github.com/lorenzofezza00/DA_Semantic_Segmentation"
  },
  {
    title: "Exploring Sim‑to‑Real Transfer with Domain Randomization",
    description: "This project explores Proximal Policy Optimization (PPO) applied to custom Hopper environments, addressing the domain shift challenge in Reinforcement Learning. By testing policies across multiple domains and applying Domain Randomization techniques, the work investigates how to improve generalization in sim-to-real adaptation.",
    image: HOP,
    link: "https://github.com/lorenzofezza00/project-sim2real-lorenzo-fezza"
  },
  {
    title: "Computational Intelligence",
    description: "This project implements the Quixo board game with a minimax-based strategy, exploring optimizations to balance computational cost and performance. The player consistently beats a random opponent but struggles against itself due to the depth–completeness trade-off: deeper searches are more accurate but computationally expensive, while shallower ones are faster but suboptimal.",
    image: BD,
    link: "https://github.com/lorenzofezza00/CI_LABS"
  },
  {
    title: "Team Management Mobile Application",
    description: "A complete task and team management platform featuring personal and team task tracking with progress bars, calendars, file sharing, comments, and history logs. The application offers smooth animations, a modern and intuitive interface, and camera support. Teams can manage members, share via links, track performance with analytics, and communicate seamlessly through the integrated group chat.",
    image: TMMA,
    link: "https://github.com/lorenzofezza00/Team-Management-Mobile-Application-public"
  },
  {
    title: "APSS Metrics for Fault Detection",
    description: "This work investigates the reliability of neural networks under hardware-induced faults in image segmentation tasks. A novel detection method is proposed, based on four pixel-level metrics analyzing prediction patterns. Validated through fault injection on Fast-SCNN trained on Cityscapes, the approach achieves over 99% accuracy, matching state-of-the-art methods while removing the need for a golden mask.",
    image: APSS,
    link: "https://www.dfts.org/program.htm"
  },
  {
    title: "Temporal Diversity",
    description: "Upcoming",
    image: null,//"https://via.placeholder.com/300x200",
    link: "#"
  },
  {
    title: "Multiple Fault Injection",
    description: "Upcoming",
    image: null,
    link: "#"
  },
  {
    title: "Event Based Cameras",
    description: "Upcoming",
    image: null,
    link: "#"
  },
  
  
];


const getRandomOffset = () => {
  const maxX = window.innerWidth / 3;
  const maxY = window.innerHeight / 3;
  return {
    x: Math.random() * 2 * maxX - maxX,
    y: Math.random() * 2 * maxY - maxY,
    scale: 0.7 + Math.random() * 0.3
  };
};


const ProjectCard = ({ project, isActive, offset }) => {
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      setIsVertical(ratio < 1.2);
    };
    img.src = project.image;
  }, [project.image]);

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
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'absolute',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.3)',
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: 'blur(8px)',
        padding: '1rem',
        paddingTop: '3rem', // aggiunto per far spazio alla topbar
        color: 'white',
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 'auto',
        height: 'auto',
        maxWidth: '45vw',
        maxHeight: "60vh"
      }}
    >
      {/* Top bar con icone in alto a destra */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '2rem', // altezza fissa
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center', // centra verticalmente
        padding: '0 0.5rem',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        zIndex: 200
      }}>
        <FiMinus color="white" size={18} style={{ cursor: 'pointer' }} />
        <FiSquare color="white" size={18} style={{ cursor: 'pointer' }} />
        <FiX color="white" size={18} style={{ cursor: 'pointer' }} />
      </div>
      {/* Image */}
      <div style={{
        flexShrink: 0,
        display: project.description === "Upcoming" ? "none" : "flex",
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: isVertical ? '1rem' : '0',
        marginBottom: isVertical ? '0' : '1rem'
      }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: isVertical ? 'auto' : '100%',
            height: isVertical ? '100%' : 'auto',
            maxHeight: isVertical ? '40vh' : 'none',
            maxWidth: isVertical ? 'none' : '40vw',
            objectFit: 'contain',
            borderRadius: project.image === HEZW ? '14px' : '0',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: '1 1 auto', minWidth: 0, marginTop: '1.5rem' }}>
        <h3>{project.title}</h3>
        {project.description !== "Upcoming" ? (
          <>
            <p>{project.description}</p>
            <Button variant="primary" href={project.link} target="_blank">
              Visualize
            </Button>
          </>
        ) : (
          <span style={{
            display: "inline-block",
            padding: "0.4rem 0.8rem",
            backgroundColor: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "12px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            color: "white"
          }}>
            🚧 Coming Soon
          </span>
        )}
      </div>
    </motion.div>
  );
};



const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsets, setOffsets] = useState(projects.map(() => ({ x: 0, y: 0, scale: 0.9 })));

  // Per desktop
  let accumulatedDelta = 0;
  const SCROLL_STEP = 200;

  const handleWheel = (e) => {
    accumulatedDelta += e.deltaY;

    if (Math.abs(accumulatedDelta) >= SCROLL_STEP) {
      const nextIndex = accumulatedDelta > 0
        ? (currentIndex + 1) % projects.length
        : (currentIndex - 1 + projects.length) % projects.length;

      setCurrentIndex(nextIndex);
      setOffsets(projects.map(() => getRandomOffset()));

      accumulatedDelta = 0;
    }
  };

  // Per mobile / touch
  let touchStartY = null;

  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (touchStartY === null) return;

    const touchEndY = e.touches[0].clientY;
    const delta = touchStartY - touchEndY;

    if (Math.abs(delta) > SCROLL_STEP / 2) { // soglia swipe più sensibile
      const nextIndex = delta > 0
        ? (currentIndex + 1) % projects.length
        : (currentIndex - 1 + projects.length) % projects.length;

      setCurrentIndex(nextIndex);
      setOffsets(projects.map(() => getRandomOffset()));

      touchStartY = null; // reset per prossimo swipe
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentIndex]);

  return (
    <Container
      fluid
      style={{
        position: 'relative',
        height: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          isActive={index === currentIndex}
          offset={offsets[index]}
        />
      ))}

      {/* Pallini */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 500
      }}>
        {projects.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default Projects;