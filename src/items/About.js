import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Container } from "react-bootstrap";
import RightSentenceBoxes from './RightSentenceBoxes'
import { FiHome, FiMapPin } from "react-icons/fi";
import { renderToString } from "react-dom/server";


// Coordinate
const ortona = [42.35, 14.4];
const torino = [45.07, 7.69];
const laCoruna = [43.3623, -8.4115];
const edinburgh = [55.9533, -3.1883];

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
  const offset = -4 * height * (t - 0.5) ** 2 + height;
  return [y + offset, x];
}

// Animazione parabola Ortona → Torino
function AnimateMap({ t }) {
  const map = useMap();
  const current = parabola(ortona, torino, t, 2);
  const zoom = lerp(8, 10, t);
  useEffect(() => {
    map.setView(current, zoom, { animate: false });
  }, [current, zoom, map]);
  return null;
}

// Animazione zoom out verso La Coruña e Edimburgo
function AnimateMapZoomOut({ t }) {
  const map = useMap();
  const centerLat = lerp(torino[0], (laCoruna[0] + edinburgh[0]) / 2, t);
  const centerLng = lerp(torino[1], (laCoruna[1] + edinburgh[1]) / 2, t);
  const zoom = lerp(10, 3, t);
  useEffect(() => {
    map.setView([centerLat, centerLng], zoom, { animate: false });
  }, [centerLat, centerLng, zoom, map]);
  return null;
}

function useReactIcon(IconComponent) {
  return useMemo(
    () =>
      L.divIcon({
        html: `<div style="font-size:24px; color:white;">${renderToString(<IconComponent />)}</div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 24], // punta alla base dell'icona
      }),
    [IconComponent]
  );
}



function ScrollMap({ sentence3Ref }) {
  // const homeIcon = useEmojiIcon("🏠");
  // const pinIcon = useEmojiIcon("📍");
  const homeIcon = useReactIcon(FiHome);
  const pinIcon = useReactIcon(FiMapPin);

  const [t, setT] = useState(0);
  const [scrollRange, setScrollRange] = useState(null);

  const [tZoomOut, setTZoomOut] = useState(0);
  const [scrollRangeZoomOut, setScrollRangeZoomOut] = useState(null);

  const [torinoHold, setTorinoHold] = useState(false);
  const [scrollRangeHold, setScrollRangeHold] = useState(null);

  // Calcola intervalli scroll
  useEffect(() => {
    if (sentence3Ref?.current) {
      const el = sentence3Ref.current.getSentenceRef(2);
      if (el) {
        const offset = 400;
        const start = Math.max(0, el.offsetTop - offset);
        const end = el.offsetTop + el.offsetHeight - 600;
        setScrollRange({ start, end });

        // Fase di “fermo su Torino” subito dopo parabola
        const holdStart = end + 50;
        const holdEnd = holdStart + 300; // durata fase ferma
        setScrollRangeHold({ start: holdStart, end: holdEnd });

        // Intervallo zoom out subito dopo fase ferma
        const zoomStart = holdEnd // + 50;
        const zoomEnd = zoomStart + 300;
        setScrollRangeZoomOut({ start: zoomStart, end: zoomEnd });
      }
    }
  }, [sentence3Ref]);

  // Gestione scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      // Parabola Ortona → Torino
      if (scrollRange) {
        if (scrollPos <= scrollRange.start) setT(0);
        else if (scrollPos >= scrollRange.end) setT(1);
        else {
          const relativeScroll = scrollPos - scrollRange.start;
          const availableScroll = scrollRange.end - scrollRange.start;
          setT(relativeScroll / availableScroll);
        }
      }

      // Fase ferma su Torino
      if (scrollRangeHold) {
        if (scrollPos <= scrollRangeHold.start) setTorinoHold(false);
        else if (scrollPos >= scrollRangeHold.start && scrollPos <= scrollRangeHold.end) setTorinoHold(true);
        else setTorinoHold(false);
      }

      // Zoom out verso La Coruña + Edimburgo
      if (scrollRangeZoomOut) {
        if (scrollPos <= scrollRangeZoomOut.start) setTZoomOut(0);
        else if (scrollPos >= scrollRangeZoomOut.end) setTZoomOut(1);
        else {
          const relativeScroll = scrollPos - scrollRangeZoomOut.start;
          const availableScroll = scrollRangeZoomOut.end - scrollRangeZoomOut.start;
          setTZoomOut(relativeScroll / availableScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollRange, scrollRangeHold, scrollRangeZoomOut]);

  // Polyline parabola
  const points = useMemo(() => {
    const steps = 50;
    const arr = [];
    const maxStep = Math.round(steps * t);
    for (let i = 0; i <= maxStep; i++) {
      arr.push(parabola(ortona, torino, i / steps, 2));
    }
    return arr;
  }, [t]);

  // Render map
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768 && window.innerHeight > window.innerWidth);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "10vh",
        width: isMobile ? "100%" : "50vw",
        height: isMobile ? "60vh" : "80vh",
        zIndex: 999,
        overflow: "hidden",
        WebkitMaskImage: `
          linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
          linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
        `,
        WebkitMaskComposite: "destination-in",
        maskComposite: "intersect",
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
        {!torinoHold && <AnimateMap t={t} />}
        {torinoHold && <AnimateMap t={1} />} {/* fermo su Torino */}
        <AnimateMapZoomOut t={tZoomOut} />

        <Marker position={ortona} icon={homeIcon} />
        <Marker position={torino} icon={pinIcon} />
        {tZoomOut > 0 && <Marker position={laCoruna} icon={pinIcon} />}
        {tZoomOut > 0 && <Marker position={edinburgh} icon={pinIcon} />}
        <Polyline positions={points} pathOptions={{ color: "red", weight: 3, dashArray: "10,8" }} />
      </MapContainer>
    </div>
  );
}


function About() {
  const rightBoxesRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0); // forza lo scroll in alto
  }, []);

  return (
    <Container 
      fluid 
      className="text-light about-layout"
    >
      <div className="map-container">
        <ScrollMap sentence3Ref={rightBoxesRef} />
      </div>
      <div className="boxes-container">
        <RightSentenceBoxes ref={rightBoxesRef} />
      </div>
    </Container>
  );
}


export default About