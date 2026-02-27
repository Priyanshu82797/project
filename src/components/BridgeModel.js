import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/* =========================
   TRUSS SECTION
========================= */
const TrussSection = ({ position }) => {
  return (
    <group position={position}>
      {/* Vertical Beam */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.25, 4, 0.25]} />
        <meshStandardMaterial color="#cfd8dc" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* X Bracing */}
      <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 2, 0]}>
        <boxGeometry args={[0.2, 4.8, 0.2]} />
        <meshStandardMaterial color="#b0bec5" metalness={0.8} />
      </mesh>

      <mesh rotation={[0, 0, -Math.PI / 4]} position={[0, 2, 0]}>
        <boxGeometry args={[0.2, 4.8, 0.2]} />
        <meshStandardMaterial color="#b0bec5" metalness={0.8} />
      </mesh>
    </group>
  );
};

/* =========================
   BRIDGE STRUCTURE
========================= */
const BridgeStructure = ({ riskScore = 0 }) => {
  const bridgeRef = useRef();
  const sections = 8;
  const spacing = 4;

  const bridgeColor =
    riskScore > 75
      ? "#ff3b30"
      : riskScore > 50
      ? "#ff9500"
      : "#90a4ae";

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (bridgeRef.current) {
      bridgeRef.current.position.y =
        Math.sin(time * 4) * (riskScore / 300);
    }
  });

  return (
    <group ref={bridgeRef}>
      {/* Bottom Beam */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[sections * spacing, 0.5, 2]} />
        <meshStandardMaterial
          color={bridgeColor}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Deck */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[sections * spacing, 0.3, 2.5]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>

      {/* Top Beam */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[sections * spacing, 0.4, 0.4]} />
        <meshStandardMaterial color="#eceff1" />
      </mesh>

      {/* Side Beams */}
      <mesh position={[0, 2, 1]}>
        <boxGeometry args={[sections * spacing, 0.2, 0.2]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>

      <mesh position={[0, 2, -1]}>
        <boxGeometry args={[sections * spacing, 0.2, 0.2]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>

      {/* Railings */}
      <mesh position={[0, 4.5, 1.2]}>
        <boxGeometry args={[sections * spacing, 0.15, 0.15]} />
        <meshStandardMaterial color="#ff7043" />
      </mesh>

      <mesh position={[0, 4.5, -1.2]}>
        <boxGeometry args={[sections * spacing, 0.15, 0.15]} />
        <meshStandardMaterial color="#ff7043" />
      </mesh>

      {/* Truss Sections */}
      {Array.from({ length: sections }).map((_, i) => (
        <TrussSection
          key={i}
          position={[
            -((sections - 1) * spacing) / 2 + i * spacing,
            0,
            0,
          ]}
        />
      ))}
    </group>
  );
};

/* =========================
   FINAL MODEL EXPORT
========================= */
const BridgeModel = ({ riskScore }) => {
  return (
    <Canvas
      camera={{ position: [18, 10, 18], fov: 50 }}
      style={{ background: "#0b1120" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[15, 20, 10]} intensity={1.2} />

      <gridHelper args={[100, 100, "#1e293b", "#1e293b"]} />

      <BridgeStructure riskScore={riskScore} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={10}
        maxDistance={50}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default BridgeModel;