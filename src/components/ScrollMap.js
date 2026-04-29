import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FiHome, FiMapPin, FiX, FiChevronLeft, FiChevronRight, FiRotateCw } from "react-icons/fi";
import { renderToString } from "react-dom/server";

// Coordinates
const ortona = [42.35, 14.4];
const torino = [45.07, 7.69];
const laCoruna = [43.3623, -8.4115];
const edinburgh = [55.9533, -3.1883];
const barcelona = [41.3851, 2.1734];
const valfrejus = [45.1667, 6.6500];
const bolzano = [46.4983, 11.3548];
const milano = [45.4642, 9.1900];
const firenze = [43.7696, 11.2558];
const roma = [41.9028, 12.4964];
const matera = [40.6664, 16.6043];
const lecce = [40.3515, 18.1750];

// Gallery Data
const galleriesData = {
  ortona: { title: "Abruzzo", photos: ["https://picsum.photos/seed/ort1/800/600", "https://picsum.photos/seed/ort2/800/600"] },
  torino: { title: "Turin, PoliTO", photos: ["https://picsum.photos/seed/tor/800/600"] },
  laCoruna: { title: "La Coruña, Spain", photos: ["https://picsum.photos/seed/cor1/800/600", "https://picsum.photos/seed/cor2/800/600"] },
  edinburgh: { title: "Edinburgh, Scotland", photos: ["https://picsum.photos/seed/edi/800/600"] },
  barcelona: { title: "Barcelona, Spain", photos: ["https://picsum.photos/seed/bcn/800/600"] },
  valfrejus: { title: "Valfréjus, France", photos: ["https://picsum.photos/seed/val/800/600"] },
  bolzano: { title: "Bolzano, Italy", photos: ["https://picsum.photos/seed/bol/800/600"] },
  milano: { title: "Milan, Italy", photos: ["https://picsum.photos/seed/mil/800/600"] },
  firenze: { title: "Florence, Italy", photos: ["https://picsum.photos/seed/fir/800/600"] },
  roma: { title: "Rome, Italy", photos: ["https://picsum.photos/seed/rom/800/600", "https://picsum.photos/seed/rom2/800/600"] },
  matera: { title: "Matera, Italy", photos: ["https://picsum.photos/seed/mat/800/600"] },
  lecce: { title: "Lecce, Italy", photos: ["https://picsum.photos/seed/lec/800/600"] }
};

// Interpolation
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function parabola(a, b, t, height = 2) {
  const x = lerp(a[1], b[1], t); 
  const y = lerp(a[0], b[0], t); 
  const offset = -4 * height * (t - 0.5) ** 2 + height;
  return [y + offset, x];
}

// Camera Controller
function CameraController({ t, torinoHold, tZoomOut }) {
  const map = useMap();

  useEffect(() => {
    if (tZoomOut > 0) {
      const centerLat = lerp(torino[0], 45.0, tZoomOut);
      const centerLng = lerp(torino[1], 7.0, tZoomOut);
      const zoom = lerp(10, 4.2, tZoomOut);
      map.setView([centerLat, centerLng], zoom, { animate: false });
    } else if (torinoHold) {
      map.setView(torino, 10, { animate: false });
    } else {
      const current = parabola(ortona, torino, t, 2);
      const zoom = lerp(8, 10, t);
      map.setView(current, zoom, { animate: false });
    }
  }, [t, torinoHold, tZoomOut, map]);

  return null;
}

// Icon Generator
function useReactIcon(IconComponent, size = 24) {
  return useMemo(
    () =>
      L.divIcon({
        html: `
          <div style="font-size:${size}px; color:white; filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.8)); cursor: pointer; transition: transform 0.2s;">
            ${renderToString(<IconComponent />)}
          </div>
        `,
        className: "interactive-pin",
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
      }),
    [IconComponent, size]
  );
}

export default function ScrollMap({ sentence3Ref }) {
  const homeIcon = useReactIcon(FiHome, 28);
  const pinIconLarge = useReactIcon(FiMapPin, 28);
  const pinIconSmall = useReactIcon(FiMapPin, 16);

  const [activeGallery, setActiveGallery] = useState(null); 
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [needsRotation, setNeedsRotation] = useState(false);

  // Orientation Check
  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmallScreen = window.innerWidth < 1024;
      setNeedsRotation(isSmallScreen && isPortrait);
    };

    window.addEventListener("resize", checkOrientation);
    checkOrientation();
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  const openGallery = (placeId) => {
    setActiveGallery(placeId);
    setCurrentImgIndex(0);
    document.body.style.overflow = "hidden";
    const textContainer = document.querySelector('.boxes-container');
    if (textContainer) {
      textContainer.style.visibility = "hidden";
      textContainer.style.opacity = "0";
    }
  };

  const closeGallery = () => {
    setActiveGallery(null);
    document.body.style.overflow = "auto";
    const textContainer = document.querySelector('.boxes-container');
    if (textContainer) {
      textContainer.style.visibility = "visible";
      textContainer.style.opacity = "1";
    }
  };

  const nextImg = (e) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % galleriesData[activeGallery].photos.length);
  };

  const prevImg = (e) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + galleriesData[activeGallery].photos.length) % galleriesData[activeGallery].photos.length);
  };

  let touchStartX = 0;
  const handleTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) nextImg(); 
    if (touchStartX - touchEndX < -50) prevImg(); 
  };

  const [t, setT] = useState(0);
  const [scrollRange, setScrollRange] = useState(null);
  const [tZoomOut, setTZoomOut] = useState(0);
  const [scrollRangeZoomOut, setScrollRangeZoomOut] = useState(null);
  const [torinoHold, setTorinoHold] = useState(false);
  const [scrollRangeHold, setScrollRangeHold] = useState(null);

  useEffect(() => {
    if (sentence3Ref?.current) {
      const elTorino = sentence3Ref.current.getSentenceRef(2); 
      const elTravel = sentence3Ref.current.getSentenceRef(3); 

      if (elTorino && elTravel) {
        const wh = window.innerHeight;
        const start = elTorino.offsetTop - wh + 100;
        const end = elTorino.offsetTop - (wh / 3);
        setScrollRange({ start, end });
        const holdStart = end;
        const holdEnd = elTravel.offsetTop - wh + 200;
        setScrollRangeHold({ start: holdStart, end: holdEnd });
        const zoomStart = holdEnd;
        const zoomEnd = elTravel.offsetTop - (wh / 3);
        setScrollRangeZoomOut({ start: zoomStart, end: zoomEnd });
      }
    }
  }, [sentence3Ref]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollRange) {
        if (scrollPos <= scrollRange.start) setT(0);
        else if (scrollPos >= scrollRange.end) setT(1);
        else setT((scrollPos - scrollRange.start) / (scrollRange.end - scrollRange.start));
      }
      if (scrollRangeHold) {
        setTorinoHold(scrollPos >= scrollRangeHold.start && scrollPos <= scrollRangeHold.end);
      }
      if (scrollRangeZoomOut) {
        if (scrollPos <= scrollRangeZoomOut.start) setTZoomOut(0);
        else if (scrollPos >= scrollRangeZoomOut.end) setTZoomOut(1); 
        else setTZoomOut((scrollPos - scrollRangeZoomOut.start) / (scrollRangeZoomOut.end - scrollRangeZoomOut.start));
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollRange, scrollRangeHold, scrollRangeZoomOut]);

  const points = useMemo(() => {
    const steps = 50;
    const arr = [];
    const maxStep = Math.round(steps * t);
    for (let i = 0; i <= maxStep; i++) {
      arr.push(parabola(ortona, torino, i / steps, 2));
    }
    return arr;
  }, [t]);

  return (
    <>
      <style>
        {`
          @keyframes march { to { stroke-dashoffset: -16; } }
          .animated-dash-line { animation: march 1s linear infinite; }
          .interactive-pin:hover { transform: scale(1.2) translateY(-2px); }
          .boxes-container { transition: opacity 0.3s ease, visibility 0.3s ease; }

          @keyframes rotatePhone {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(90deg); }
            50% { transform: rotate(90deg); }
            75% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
          }
          .rotate-icon { animation: rotatePhone 2.5s ease-in-out infinite; font-size: 60px; color: #fff; margin-bottom: 20px; }

          .rotate-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: #121212; color: white; display: flex; flex-direction: column;
            justify-content: center; align-items: center; z-index: 9999999;
            text-align: center; padding: 30px; font-family: sans-serif;
          }

          .gallery-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: rgba(10, 10, 10, 0.98); z-index: 2147483647 !important;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            color: white; animation: fadeIn 0.3s ease;
          }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .gallery-img { max-width: 90vw; max-height: 70vh; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,1); object-fit: contain; position: relative; z-index: 2147483647; }
          .gallery-btn { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 50%; width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; cursor: pointer; pointer-events: auto; color: white; }
          .gallery-close { position: absolute; top: 2rem; right: 2rem; cursor: pointer; z-index: 2147483647; }
        `}
      </style>

      {/* ROTATION OVERLAY */}
      {needsRotation && (
        <div className="rotate-overlay">
          <FiRotateCw className="rotate-icon" />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Please rotate your device</h2>
          <p style={{ opacity: 0.7 }}>This experience is optimized for landscape mode.</p>
        </div>
      )}

      {/* GALLERY OVERLAY */}
      {activeGallery && galleriesData[activeGallery] && createPortal(
        <div className="gallery-overlay" onClick={closeGallery}>
          <div className="gallery-close" onClick={closeGallery}>
            <FiX size={36} />
          </div>
          <h2 style={{ position: "absolute", top: "2rem", margin: 0, zIndex: 2147483647 }}>
            {galleriesData[activeGallery].title}
          </h2>
          <div 
            className="gallery-content" 
            onClick={(e) => e.stopPropagation()} 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", zIndex: 2147483647 }}
          >
            {galleriesData[activeGallery].photos.length > 1 && (
              <div style={{ position: "absolute", width: "100%", display: "flex", justifyContent: "space-between", padding: "0 2rem", pointerEvents: "none" }}>
                <div className="gallery-btn" onClick={prevImg} style={{pointerEvents: "auto"}}><FiChevronLeft size={28} /></div>
                <div className="gallery-btn" onClick={nextImg} style={{pointerEvents: "auto"}}><FiChevronRight size={28} /></div>
              </div>
            )}
            <img src={galleriesData[activeGallery].photos[currentImgIndex]} alt={galleriesData[activeGallery].title} className="gallery-img" />
          </div>
          <div style={{ position: "absolute", bottom: "3rem", fontSize: "1.2rem", zIndex: 2147483647 }}>
            {currentImgIndex + 1} / {galleriesData[activeGallery].photos.length}
          </div>
        </div>,
        document.body
      )}

      {/* MAP */}
      <div
        style={{
          position: "fixed",
          top: "10vh",
          width: "50vw",
          height: "80vh",
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
          style={{ width: "100%", height: "100%", backgroundColor: "#121212" }}
          dragging={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />
          <CameraController t={t} torinoHold={torinoHold} tZoomOut={tZoomOut} />
          <Marker position={ortona} icon={homeIcon} eventHandlers={{ click: () => openGallery("ortona") }} />
          {t > 0 && <Marker position={torino} icon={pinIconLarge} eventHandlers={{ click: () => openGallery("torino") }} />}
          {tZoomOut > 0 && (
            <>
              <Marker position={laCoruna} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("laCoruna") }} />
              <Marker position={edinburgh} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("edinburgh") }} />
              <Marker position={barcelona} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("barcelona") }} />
              <Marker position={valfrejus} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("valfrejus") }} />
              <Marker position={bolzano} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("bolzano") }} />
              <Marker position={milano} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("milano") }} />
              <Marker position={firenze} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("firenze") }} />
              <Marker position={roma} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("roma") }} />
              <Marker position={matera} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("matera") }} />
              <Marker position={lecce} icon={pinIconSmall} eventHandlers={{ click: () => openGallery("lecce") }} />
            </>
          )}
          {tZoomOut === 0 && (
            <Polyline 
              positions={points} 
              pathOptions={{ color: "#D44638", weight: 3, dashArray: "8, 8", className: "animated-dash-line", lineCap: "round" }} 
            />
          )}
        </MapContainer>
      </div>
    </>
  );
}