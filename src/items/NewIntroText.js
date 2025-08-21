import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const sentences = [
  { text: "This site is your gateway to learn more about me. Explore About, Resume, Projects, and Contact.", span: 3 },
  { text: "Each section tells a piece of my story, from my background and experiences to the projects that inspire me.", span: 1 },
  { text: "Take your time to navigate through the pages — every click connects the dots and reveals more about my journey.", span: 2 },
  { text: "Whether you’re curious about my work, my skills, or just want to see what I’m passionate about, there’s something here for you to explore.", span: 1 },
  { text: "I invite you to dive in, interact, and uncover the story behind the ideas, the code, and the creativity that shape my world.", span: 3 }
];

function getGridPosition(span) {
  if (span === 3) return "1 / span 3";
  if (span === 2) return Math.random() > 0.5 ? "1 / span 2" : "2 / span 2";
  if (span === 1) return `${[1,2,3][Math.floor(Math.random()*3)]} / span 1`;
}

export function getFontSize(span) {
  switch(span) {
    case 3: return "4rem";
    case 2: return "3rem";
    case 1: return "1.5rem";
    case 'a': return "1.5rem";
    case 'b': return "2rem";
    case 'c': return "2.5rem";
    default: return "1.5rem";
  }
}


// allineamenti box e testo
export function getAlignment() {
  const options = [
    { alignItems: "flex-start", justifyContent: "flex-start", textAlign: "left" },   // top-left
    { alignItems: "flex-start", justifyContent: "flex-end", textAlign: "right" },    // top-right
    { alignItems: "flex-end", justifyContent: "flex-start", textAlign: "left" },     // bottom-left
    { alignItems: "flex-end", justifyContent: "flex-end", textAlign: "right" },      // bottom-right
    { alignItems: "center", justifyContent: "center", textAlign: "center" }          // center
  ];
  return options[Math.floor(Math.random()*options.length)];
}

export default function NewIntro() {
  const [positions] = useState(() => sentences.map(s => getGridPosition(s.span)));
  const [alignments] = useState(() => sentences.map(() => getAlignment()));

  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      <div
        className="container-fluid p-0"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "minmax(200px, auto)",
          gap: "0px"
        }}
      >
        {sentences.map((s, i) => (
          <div
            key={i}
            style={{
              
              minHeight: s.span === 1 ? "30vh" : "70vh", // esempio: testi piccoli box più bassi
              gridColumn: positions[i],
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: "0",
              padding: alignments[i].alignItems === "center" ? "1.5rem" : "0", // padding solo se centrato
              display: "flex",
              alignItems: alignments[i].alignItems,
              justifyContent: alignments[i].justifyContent,
              textAlign: alignments[i].textAlign,
              fontSize: getFontSize(s.span),
              lineHeight: "1.5"
            }}
          >
            <p style={{ margin: 0 , pagging: 0}}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
