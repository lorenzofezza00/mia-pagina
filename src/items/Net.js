import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock U-Net
const unetStructure = [
  { name: "encoder1", H: 128, W: 128, featureMaps: 4 },
  { name: "encoder2", H: 64, W: 64, featureMaps: 6 },
  { name: "encoder3", H: 32, W: 32, featureMaps: 8 },
  { name: "bottleneck", H: 16, W: 16, featureMaps: 10 },
  { name: "decoder3", H: 32, W: 32, featureMaps: 8 },
  { name: "decoder2", H: 64, W: 64, featureMaps: 6 },
  { name: "decoder1", H: 128, W: 128, featureMaps: 4 },
];

// Singola feature map, allineata verso X–Y (nessuna rotazione)
function FeatureMap({ layerIndex, mapIndex, layer, activeMapIndex, highlight }) {
  const scaleFactor = 0.02;
  const spacing = 0.35; // distanza tra feature maps

  // Opacità: attive → trasparente, inattive → più alta
  const opacity = mapIndex <= activeMapIndex ? 0.2 : 0.6;

  return (
    <mesh
      position={[layerIndex * 4 - 12, 0, -mapIndex * spacing]} // allineamento lungo Z
      rotation={[0, Math.PI / 2, 0]} // ruotato di 90° verso sinistra
    >
      <planeGeometry args={[layer.W * scaleFactor, layer.H * scaleFactor]} />
      <meshStandardMaterial
        color={
          highlight?.layer === layer.name && highlight?.tensor === mapIndex
            ? "red"
            : "white"
        }
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}


// Layer con stack di feature maps allineate
function FeatureLayer({ layerIndex, layer, activeMapIndex, highlight, layerSpacing }) {
  const scaleFactor = 0.02;
  const spacing = 0.35; // spazio tra feature map all'interno del layer

  return (
    <group
      position={[layerIndex * layerSpacing, 0, 0]} // layer in coda lungo X
      rotation={[0, Math.PI / 2, 0]} // ruotato di 90° verso sinistra
    >
      {Array.from({ length: layer.featureMaps }).map((_, i) => {
        const opacity = i <= activeMapIndex ? 0.2 : 0.6;
        return (
          <mesh
            key={i}
            position={[0, 0, -i * spacing]} // feature maps in coda lungo Z locale
          >
            <planeGeometry args={[layer.W * scaleFactor, layer.H * scaleFactor]} />
            <meshStandardMaterial
              color={
                highlight?.layer === layer.name && highlight?.tensor === i
                  ? "red"
                  : "white"
              }
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </group>
  );
}


export default function UNet3DVisualizer() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [activeMapIndex, setActiveMapIndex] = useState(0);
  const [highlight, setHighlight] = useState({ layer: null, tensor: null, bit: null });

  return (
    <Container fluid className="vh-100 vw-100 p-0">
      <Row className="h-100 w-100 m-0">
        {/* Sidebar */}
        <Col xs={3} md={2} className="bg-dark text-white p-3">
          <h4>Fault Injection</h4>

          <Form.Group className="mb-3">
            <Form.Label>Layer</Form.Label>
            <Form.Select
              onChange={(e) =>
                setHighlight((h) => ({ ...h, layer: e.target.value || null }))
              }
            >
              <option value="">Select Layer</option>
              {unetStructure.map((layer) => (
                <option key={layer.name} value={layer.name}>
                  {layer.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tensor ID</Form.Label>
            <Form.Control
              type="number"
              min="0"
              onChange={(e) =>
                setHighlight((h) => ({
                  ...h,
                  tensor: e.target.value !== "" ? Number(e.target.value) : null,
                }))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bit</Form.Label>
            <Form.Select
              onChange={(e) =>
                setHighlight((h) => ({
                  ...h,
                  bit: e.target.value !== "" ? Number(e.target.value) : null,
                }))
              }
            >
              <option value="">Select Bit</option>
              {[...Array(8)].map((_, i) => (
                <option key={i} value={i}>
                  Bit {i}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Canvas 3D */}
        <Col xs={9} md={10} className="p-0 position-relative">
          <Canvas camera={{ position: [0, 0, 25] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            {/* Group principale che ruota tutta la rete lungo la bisettrice XY */}
            <group rotation={[0, 0, -Math.PI / 4]}> {/* -45° sul piano XY */}
                {unetStructure.map((layer, i) => (
                <FeatureLayer
                    key={layer.name}
                    layerIndex={i}
                    layer={layer}
                    activeMapIndex={i === activeLayerIndex ? activeMapIndex : -1}
                    highlight={highlight}
                    layerSpacing={2} // distanza tra layer
                />
                ))}
            </group>

            <OrbitControls />
            </Canvas>


          {/* Slider: feature map e layer */}
          <Card
            className="position-absolute bottom-3 start-50 translate-middle-x px-4 py-3 shadow-lg"
            style={{ minWidth: "300px", borderRadius: "1rem" }}
          >
            <Form.Label>Feature Map (layer {activeLayerIndex})</Form.Label>
            <Form.Range
              min={0}
              max={unetStructure[activeLayerIndex].featureMaps - 1}
              value={activeMapIndex}
              onChange={(e) => setActiveMapIndex(Number(e.target.value))}
            />
            <Form.Label className="mt-2">Layer</Form.Label>
            <Form.Range
              min={0}
              max={unetStructure.length - 1}
              value={activeLayerIndex}
              onChange={(e) => setActiveLayerIndex(Number(e.target.value))}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
