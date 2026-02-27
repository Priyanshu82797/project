import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Bridge component that renders the 3D structure
const Bridge = ({ vibration, load }) => {
  const groupRef = useRef(null);
  const deckRef = useRef(null);
  const leftPillarRef = useRef(null);
  const rightPillarRef = useRef(null);
  const deckMaterialRef = useRef(null);
  const leftPillarMaterialRef = useRef(null);
  const rightPillarMaterialRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  // Get color based on load percentage
  const getLoadColor = (loadValue) => {
    if (loadValue < 70) {
      return new THREE.Color('#bfbfbf'); // Normal gray
    } else if (loadValue < 90) {
      return new THREE.Color('#ff9900'); // Orange warning
    } else {
      return new THREE.Color('#ff0000'); // Red critical
    }
  };

  useFrame(() => {
    const elapsed = clockRef.current.getElapsedTime();

    // ===== VIBRATION ANIMATION ON DECK =====
    if (deckRef.current) {
      deckRef.current.position.y = 3.5 + Math.sin(elapsed * 4) * (vibration * 0.002);
    }

    // ===== LOAD-BASED PILLAR COLOR CHANGE =====
    const targetColor = getLoadColor(load);

    if (leftPillarMaterialRef.current) {
      leftPillarMaterialRef.current.color.lerp(targetColor, 0.1);
    }
    if (rightPillarMaterialRef.current) {
      rightPillarMaterialRef.current.color.lerp(targetColor, 0.1);
    }

    // ===== SUBTLE CAMERA AUTO-ROTATION =====
    if (groupRef.current) {
      const angle = elapsed * 0.05; // Very slow rotation speed
      groupRef.current.rotation.y = angle;
    }
  });

  return (
    <group ref={groupRef}>
      {/* ===== GROUND PLANE ===== */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial
          color={0x2a2a3e}
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* ===== LEFT PILLAR ===== */}
      <mesh
        ref={leftPillarRef}
        castShadow
        receiveShadow
        position={[-5.5, 1.5, 0]}
      >
        <boxGeometry args={[0.6, 3, 0.6]} />
        <meshStandardMaterial
          ref={leftPillarMaterialRef}
          color={0xbfbfbf}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* ===== RIGHT PILLAR ===== */}
      <mesh
        ref={rightPillarRef}
        castShadow
        receiveShadow
        position={[5.5, 1.5, 0]}
      >
        <boxGeometry args={[0.6, 3, 0.6]} />
        <meshStandardMaterial
          ref={rightPillarMaterialRef}
          color={0xbfbfbf}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* ===== LEFT SUPPORT BEAM ===== */}
      <mesh castShadow receiveShadow position={[-2.5, 2.8, 0]}>
        <boxGeometry args={[5.5, 0.3, 0.4]} />
        <meshStandardMaterial
          color={0x444444}
          roughness={0.6}
          metalness={0.5}
        />
      </mesh>

      {/* ===== RIGHT SUPPORT BEAM ===== */}
      <mesh castShadow receiveShadow position={[2.5, 2.8, 0]}>
        <boxGeometry args={[5.5, 0.3, 0.4]} />
        <meshStandardMaterial
          color={0x444444}
          roughness={0.6}
          metalness={0.5}
        />
      </mesh>

      {/* ===== BRIDGE DECK ===== */}
      <mesh
        ref={deckRef}
        castShadow
        receiveShadow
        position={[0, 3.5, 0]}
      >
        <boxGeometry args={[14, 0.5, 2]} />
        <meshStandardMaterial
          ref={deckMaterialRef}
          color={0x666666}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* ===== LEFT RAILING ===== */}
      <mesh
        castShadow
        receiveShadow
        position={[-7.2, 4.2, 0.95]}
      >
        <boxGeometry args={[14, 0.8, 0.08]} />
        <meshStandardMaterial
          color={0xcccccc}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* ===== RIGHT RAILING ===== */}
      <mesh
        castShadow
        receiveShadow
        position={[-7.2, 4.2, -0.95]}
      >
        <boxGeometry args={[14, 0.8, 0.08]} />
        <meshStandardMaterial
          color={0xcccccc}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

// Scene component with lighting and camera
const Scene = ({ vibration, load }) => {
  const cameraRef = useRef(null);

  useEffect(() => {
    if (cameraRef.current) {
      // Ensure camera is set to correct position
      cameraRef.current.position.set(10, 7, 15);
      cameraRef.current.fov = 45;
      cameraRef.current.updateProjectionMatrix();
    }
  }, []);

  return (
    <>
      {/* ===== CAMERA ===== */}
      <perspectiveCamera
        ref={cameraRef}
        position={[10, 7, 15]}
        fov={45}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
      />

      {/* ===== LIGHTING ===== */}
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.4} color={0xffffff} />

      {/* Main directional light from top-front */}
      <directionalLight
        position={[10, 12, 8]}
        intensity={1.0}
        color={0xffffff}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-5}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
      />

      {/* Fill light from left side */}
      <directionalLight
        position={[-8, 6, 5]}
        intensity={0.3}
        color={0x99bbff}
      />

      {/* ===== BRIDGE ===== */}
      <Bridge vibration={vibration} load={load} />
    </>
  );
};

// Main BridgeModel component
const BridgeModel = ({ vibration = 0, load = 0, crack = 0, temperature = 0, riskScore = 0 }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        style={{ background: '#1a1a2e' }}
        shadows
        dpr={1}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <color attach="background" args={['#1a1a2e']} />
        <fog attach="fog" args={['#1a1a2e', 15, 50]} />
        <Scene vibration={vibration} load={load} />
      </Canvas>
    </div>
  );
};

export default BridgeModel;
