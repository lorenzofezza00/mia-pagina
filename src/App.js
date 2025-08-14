// import MyNav from "./items/MyNav";
// import Welcome from "./items/Welcome";
// import About from "./items/About";
// import "./App.css";
// import { Col, Container } from 'react-bootstrap';
// import ProjectsCarousel from "./items/ProjectsCarousel";
// import randPic from "./imgs/pngegg.png"

// export default function MyApp() {
//   return (
//     <div className="App" style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
//       {/* Background image */}
//       <img 
//         src={randPic}
//         alt="Background decoration"
//         className="background-image"
//       />

//       {/* Content */}
//       <div className="content-layer">
//         <section id="welcome" style={{ minHeight: "100vh" }}>
//           <div style={{ height: "10vh", color: "white" }}>
//             <MyNav/>
//           </div>
//           <div style={{ height: "90vh", color: "white" }}>
//             <Container className="d-flex justify-content-center align-items-center h-100">
//               <Welcome/>  
//             </Container>
//           </div>
//         </section>
//         <section id="about" style={{ minHeight: "100vh" }}>
//           <div style={{ height: "90vh", color: "white" }}>
//             <Container className="d-flex justify-content-center align-items-center h-100">
//               <About/>
//             </Container>
//           </div>
//         </section>
//         <section id="projects" style={{ minHeight: "100vh" }}>
//           <div style={{ height: "90vh", color: "white" }}>
//               <Container className="d-flex justify-content-center align-items-center h-100">
//                 <Col>
//                   <h1>Projects</h1>
//                   <ProjectsCarousel/>
//                 </Col>  
//               </Container>
//           </div>  
//         </section>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           paddingTop: '8rem'
//         }}>
//         </div>
//       </div>
//     </div>
//   );
// }

// MyApp.jsx

import MyNav from "./items/MyNav";
import Welcome from "./items/Welcome";
import About from "./items/About";
import ProjectsCarousel from "./items/ProjectsCarousel";
import { Col, Container } from "react-bootstrap";
import randPic from "./imgs/pngegg.png";
import "./App.css";

// Componenti helper per sezioni
function Section({ id, children }) {
  return (
    <section id={id} className="app-section">
      <Container className="d-flex justify-content-center align-items-center h-100">
        {children}
      </Container>
    </section>
  );
}

export default function MyApp() {
  return (
    <div className="App">
      {/* Background */}
      <img src={randPic} alt="Background decoration" className="background-image" />

      {/* Overlay contenuti */}
      <div className="content-layer">
        {/* Navbar persistente */}
        <header className="nav-wrapper">
          <MyNav />
        </header>

        {/* Sezioni */}
        <Section id="welcome">
          <Welcome />
        </Section>

        <Section id="about">
          <About />
        </Section>

        <Section id="projects">
          <Col>
            <h1>Projects</h1>
            <ProjectsCarousel />
          </Col>
        </Section>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '8rem'
      }}>
      </div>
    </div>
  );
}
