import { Container, Row } from "react-bootstrap";
import HeroSection from "./HeroText";
import { useState, useLayoutEffect } from "react";
import SentenceBoxes from "./IntroText";


function Home() {
    return (
    <>
        <Container fluid className="text-light" style={{marginTop:"25vh"}}>
            <HeroSection/>
            <SentenceBoxes/>
        </Container>
    </>
    );
}

export default Home;
