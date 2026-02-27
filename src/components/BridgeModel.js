import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/* =========================
   SENSOR POINT COMPONENT
========================= */
const SensorPoint = ({ position, sensorData, sensorType, onSensorClick }) => {
  const meshRef = useRef();
  
  // Determine color based on sensor value and threshold
  const getColor = () => {
    const { value, threshold } = sensorData;
    if (value > threshold) return "#ff3b30"; // Red - critical
    if (value > threshold * 0.7) return "#ff9500"; // Orange - warning
    return "#34c759"; // Green - normal
  };

  const handleClick = () => {
    onSensorClick({ ...sensorData, sensorType, position });
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerEnter={() => {
        if (meshRef.current) meshRef.current.scale.set(1.3, 1.3, 1.3);
      }}
      onPointerLeave={() => {
        if (meshRef.current) meshRef.current.scale.set(1, 1, 1);
      }}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color={getColor()}
        emissive={getColor()}
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

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
const BridgeStructure = ({ riskScore = 0, vibration, load, crack, temperature, onSensorClick }) => {
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

      {/* SENSOR POINTS ON BRIDGE */}
      {/* Vibration Sensors - Multiple points along bridge */}
      <SensorPoint
        position={[-8, 2, 0]}
        sensorData={{ value: vibration, threshold: 70, unit: "m/s²" }}
        sensorType="Vibration"
        onSensorClick={onSensorClick}
      />
      <SensorPoint
        position={[0, 2, 0]}
        sensorData={{ value: vibration, threshold: 70, unit: "m/s²" }}
        sensorType="Vibration"
        onSensorClick={onSensorClick}
      />
      <SensorPoint
        position={[8, 2, 0]}
        sensorData={{ value: vibration, threshold: 70, unit: "m/s²" }}
        sensorType="Vibration"
        onSensorClick={onSensorClick}
      />

      {/* Load Stress Sensors - On sidewalls */}
      <SensorPoint
        position={[-6, 2, 1.3]}
        sensorData={{ value: load, threshold: 80, unit: "MN" }}
        sensorType="Load Stress"
        onSensorClick={onSensorClick}
      />
      <SensorPoint
        position={[6, 2, 1.3]}
        sensorData={{ value: load, threshold: 80, unit: "MN" }}
        sensorType="Load Stress"
        onSensorClick={onSensorClick}
      />

      {/* Temperature Sensors - On deck */}
      <SensorPoint
        position={[-10, 1.2, 0]}
        sensorData={{ value: temperature, threshold: 35, unit: "°C" }}
        sensorType="Temperature"
        onSensorClick={onSensorClick}
      />
      <SensorPoint
        position={[10, 1.2, 0]}
        sensorData={{ value: temperature, threshold: 35, unit: "°C" }}
        sensorType="Temperature"
        onSensorClick={onSensorClick}
      />

      {/* Crack Width Sensors - On structural points */}
      <SensorPoint
        position={[-4, 4.2, 0]}
        sensorData={{ value: crack, threshold: 15, unit: "mm" }}
        sensorType="Crack Width"
        onSensorClick={onSensorClick}
      />
      <SensorPoint
        position={[4, 4.2, 0]}
        sensorData={{ value: crack, threshold: 15, unit: "mm" }}
        sensorType="Crack Width"
        onSensorClick={onSensorClick}
      />
    </group>
  );
};

/* =========================
   FINAL MODEL EXPORT
========================= */
const BridgeModel = ({ riskScore, vibration, load, crack, temperature }) => {
  const [selectedSensor, setSelectedSensor] = useState(null);

  const handleSensorClick = (sensor) => {
    setSelectedSensor(sensor);
  };

  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [18, 10, 18], fov: 50 }}
        style={{ background: "#0b1120" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[15, 20, 10]} intensity={1.2} />

        <gridHelper args={[100, 100, "#1e293b", "#1e293b"]} />

        <BridgeStructure
          riskScore={riskScore}
          vibration={vibration}
          load={load}
          crack={crack}
          temperature={temperature}
          onSensorClick={handleSensorClick}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={10}
          maxDistance={50}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Sensor Detail Panel - Bottom Left */}
      {selectedSensor && (
        <div className="absolute bottom-4 left-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500 rounded-lg p-4 shadow-2xl max-w-xs">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Sensor Data</p>
              <p className="text-xl font-bold text-blue-400">{selectedSensor.sensorType}</p>
            </div>
            <button
              onClick={() => setSelectedSensor(null)}
              className="text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            {/* Sensor Value */}
            <div className="bg-slate-700 bg-opacity-50 rounded-lg p-3 border border-blue-500 border-opacity-20">
              <p className="text-xs text-gray-400 mb-1">Current Value</p>
              <p className="text-2xl font-bold text-blue-400">
                {selectedSensor.value.toFixed(1)}{selectedSensor.unit}
              </p>
            </div>

            {/* Threshold */}
            <div className="bg-slate-700 bg-opacity-50 rounded-lg p-3 border border-purple-500 border-opacity-20">
              <p className="text-xs text-gray-400 mb-1">Threshold</p>
              <p className="text-lg font-bold text-purple-400">
                {selectedSensor.threshold}{selectedSensor.unit}
              </p>
            </div>

            {/* Status */}
            <div className="bg-slate-700 bg-opacity-50 rounded-lg p-3 border border-green-500 border-opacity-20">
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <p className={`text-lg font-bold ${
                selectedSensor.value > selectedSensor.threshold
                  ? "text-red-400"
                  : selectedSensor.value > selectedSensor.threshold * 0.7
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}>
                {selectedSensor.value > selectedSensor.threshold
                  ? "🔴 Critical"
                  : selectedSensor.value > selectedSensor.threshold * 0.7
                  ? "🟡 Warning"
                  : "🟢 Normal"}
              </p>
            </div>

            {/* Position */}
            <div className="bg-slate-700 bg-opacity-50 rounded-lg p-3 border border-orange-500 border-opacity-20">
              <p className="text-xs text-gray-400 mb-1">Position</p>
              <p className="text-sm text-orange-300 font-mono">
                ({selectedSensor.position[0].toFixed(1)}, {selectedSensor.position[1].toFixed(1)}, {selectedSensor.position[2].toFixed(1)})
              </p>
            </div>

            {/* Recommendation */}
            <div className="bg-slate-700 bg-opacity-50 rounded-lg p-3 border border-indigo-500 border-opacity-20">
              <p className="text-xs text-gray-400 mb-1">Action</p>
              <p className="text-sm text-indigo-300">
                {selectedSensor.value > selectedSensor.threshold
                  ? "⚠️ Immediate inspection needed"
                  : selectedSensor.value > selectedSensor.threshold * 0.7
                  ? "📋 Schedule maintenance"
                  : "✅ Normal operation"}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3 text-center">Click to close or select another sensor</p>
        </div>
      )}

      {/* Instructions - Top Right */}
      <div className="absolute top-4 right-4 bg-slate-900 bg-opacity-80 border border-blue-500 border-opacity-30 rounded-lg p-3 shadow-lg max-w-xs">
        <p className="text-xs text-gray-400 mb-2"><strong>🎯 Interactive Bridge Model</strong></p>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>🖱️ <strong>Click sensors</strong> to view details</li>
          <li>🔴 Red = Critical | 🟡 Orange = Warning | 🟢 Green = Normal</li>
          <li>🔍 <strong>Drag to rotate</strong> | <strong>Scroll to zoom</strong></li>
          <li>📍 8 total sensors across bridge</li>
        </ul>
      </div>
    </div>
  );
};

export default BridgeModel;