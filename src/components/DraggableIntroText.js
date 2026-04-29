import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const sentences = [
  { id: 1, text: "This site is your gateway to learn more about me. Explore About, Resume, Projects, and Contact.", span: 3 },
  { id: 2, text: "Each section tells a piece of my story, from my background and experiences to the projects that inspire me.", span: 1 },
  { id: 3, text: "Take your time to navigate through the pages — every click connects the dots and reveals more about my journey.", span: 2 },
  { id: 4, text: "Whether you’re curious about my work, my skills, or just want to see what I’m passionate about, there’s something here for you to explore.", span: 1 },
  { id: 5, text: "I invite you to dive in, interact, and uncover the story behind the ideas, the code, and the creativity that shape my world.", span: 3 }
];

function getGridPosition(span) {
  if (span === 3) return "1 / span 3";
  if (span === 2) return Math.random() > 0.5 ? "1 / span 2" : "2 / span 2";
  if (span === 1) return `${[1, 2, 3][Math.floor(Math.random() * 3)]} / span 1`;
}

export function getFontSize(span) {
  switch (span) {
    case 3: return "2.5rem";
    case 2: return "2rem";
    case 1: return "1.2rem";
    default: return "1rem";
  }
}

export function getAlignment() {
  const options = [
    { alignItems: "flex-start", justifyContent: "flex-start", textAlign: "left" },
    { alignItems: "flex-start", justifyContent: "flex-end", textAlign: "right" },
    { alignItems: "flex-end", justifyContent: "flex-start", textAlign: "left" },
    { alignItems: "flex-end", justifyContent: "flex-end", textAlign: "right" },
    { alignItems: "center", justifyContent: "center", textAlign: "center" }
  ];
  return options[Math.floor(Math.random() * options.length)];
}

export default function NewIntro() {
  const [positions] = useState(() => sentences.map(s => getGridPosition(s.span)));
  const [alignments] = useState(() => sentences.map(() => getAlignment()));
  const [offsets, setOffsets] = useState(sentences.map(() => ({ x: 0, y: 0 })));

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    const startX = e.clientX - offsets[index].x;
    const startY = e.clientY - offsets[index].y;

    const onMouseMove = (moveEvent) => {
      const newOffsets = [...offsets];
      newOffsets[index] = {
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY
      };
      setOffsets(newOffsets);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      <div
        className="container-fluid p-0"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "minmax(200px, auto)",
          position: "relative"
        }}
      >
        {sentences.map((s, i) => (
          <div
            key={i}
            onMouseDown={(e) => handleMouseDown(e, i)}
            style={{
              minHeight: s.span === 1 ? "30vh" : "60vh",
              gridColumn: positions[i],
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              padding: "1rem",
              display: "flex",
              alignItems: alignments[i].alignItems,
              justifyContent: alignments[i].justifyContent,
              textAlign: alignments[i].textAlign,
              fontSize: getFontSize(s.span),
              lineHeight: "1.4",
              position: "relative",
              cursor: "grab",
              transform: `translate(${offsets[i].x}px, ${offsets[i].y}px)`,
              zIndex: offsets[i].x !== 0 || offsets[i].y !== 0 ? 10 : 1
            }}
          >
            <p style={{ margin: 0 }}>{s.text}</p>
          </div>
        ))}
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .container-fluid {
              grid-template-columns: 1fr !important;
              grid-auto-rows: auto !important;
            }
            .container-fluid > div {
              grid-column: auto !important;
              min-height: auto !important;
              padding: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}
