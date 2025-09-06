import { Container } from "react-bootstrap";
import HeroSection from "./HeroText";
import SentenceBoxes from "./IntroText";
// import NewIntro from "./NewIntroText";
import NewIntro from "./DraggableIntroText";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isBottom, setIsBottom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.innerHeight + window.scrollY;
      const isAtBottom = scrollPos >= document.body.offsetHeight - 50;
      setIsBottom(isAtBottom);
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    if (isBottom) {
      navigate("/about");
    }
  };

  return (
    <>
      <div style={{ cursor: "none" }}> {/* nasconde sempre il cursore nativo */}
        <Container
          fluid
          className="text-light"
          style={{ marginTop: "25vh"}}//, pointerEvents: "none" }} 
          // così gli elementi sotto non interferiscono con i click
        >
          <HeroSection />
          {/* <SentenceBoxes /> */}
          <NewIntro/>
        </Container>
      </div>

      {/* cursore custom */}
      <div
        onClick={handleClick}
        style={{
          position: "fixed",
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          textAlign: "center",
          pointerEvents: isBottom ? "auto" : "none", // cliccabile solo quando è in fondo
          cursor: "none", // mai mostrare la mano del browser
        }}
      >
        {isBottom ? (
          <div style={{ color: "white", fontSize: "14px" }}>
            <div style={{ fontSize: "24px" }}>➔</div>
            <div>About</div>
          </div>
        ) : (
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "white",
            }}
          />
        )}
      </div>
    </>
  );
}

export default Home;
