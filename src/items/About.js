import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Container } from "react-bootstrap";
import RightSentenceBoxes from "./RightSentenceBoxes";

// Coordinate
const ortona = [42.35, 14.4];
const torino = [45.07, 7.69];

// Emoji marker icons
function useEmojiIcon(emoji) {
  return useMemo(
    () =>
      L.divIcon({
        html: `<div style="font-size:24px; line-height:24px">${emoji}</div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    [emoji]
  );
}

// Linear interpolation
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Curva parabola verso il basso tra due punti
function parabola(a, b, t, height = 2) {
  const x = lerp(a[1], b[1], t); // lng
  const y = lerp(a[0], b[0], t); // lat
  // parabola offset
  const offset = -4 * height * (t - 0.5) ** 2 + height;
  return [y + offset, x];
}

// Hook per aggiornare centro e zoom
function AnimateMap({ t }) {
  const map = useMap();
  const current = parabola(ortona, torino, t, 2); // lat,lng
  const zoom = lerp(8, 10, t); // da Ortona a Torino più zoom
  useEffect(() => {
    map.setView(current, zoom, { animate: false });
  }, [current, zoom, map]);
  return null;
}

function ScrollMap() {
  const homeIcon = useEmojiIcon("🏠");
  const pinIcon = useEmojiIcon("📍");
  const [t, setT] = useState(0);

  // Leggi scroll verticale e converti in t (0-1)
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      setT(Math.min(1, Math.max(0, scrollPos / maxScroll)));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Genera parabola per polyline
  const points = useMemo(() => {
    const steps = 50;
    const arr = [];
    const maxStep = Math.round(steps * t); // massimo step da disegnare
    for (let i = 0; i <= maxStep; i++) {
        arr.push(parabola(ortona, torino, i / steps, 2));
    }
    return arr;
    }, [t]);


  return (
    <>
      {/* Piccola pagina con un po’ di scroll */}
      <div>
        <div
          style={{
            position: "fixed",
            // top: 20,
            // right: 20,
            width: "100vh",
            height: "50vh",
            border: "2px solid #333",
            zIndex: 999,
          }}
        >
          <MapContainer
            center={ortona}
            zoom={8}
            style={{ width: "100%", height: "100%" }}
            dragging={false}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            attributionControl={false}
          >
            <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            />

            <AnimateMap t={t} />
            <Marker position={ortona} icon={homeIcon} />
            <Marker position={torino} icon={pinIcon} />
            <Polyline
              positions={points}
              pathOptions={{ color: "red", weight: 3, dashArray: "10,8" }}
            />
          </MapContainer>
        </div>
      </div>
    </>
  );
}

function About() {
    return (
        <>
        <Container fluid className="text-light" style={{ marginTop: "15vh", display: "flex" }}>
            <div style={{ width: "400px", position: "fixed" }}>
                <ScrollMap />
            </div>
            <div style={{ flex: 1, marginLeft: "420px" }}>
                <RightSentenceBoxes />
            </div>
        </Container>
        </>
    );
}

export default About