import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, RoundedBox, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Stylized VR Headset Component
const VRHeadset = (props) => {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 2) * 0.02 + 2.82;
  });

  return (
    <group ref={group} {...props}>
      <RoundedBox args={[0.5, 0.25, 0.3]} radius={0.05} smoothness={4} position={[0, 0, 0.1]}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </RoundedBox>
      <RoundedBox args={[0.45, 0.2, 0.05]} radius={0.02} smoothness={4} position={[0, 0, 0.26]}>
        <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.8} />
      </RoundedBox>
      <mesh position={[0, 0, -0.15]}>
        <torusGeometry args={[0.25, 0.04, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#dddddd" roughness={0.8} />
      </mesh>
    </group>
  );
};

const TriangleWing = ({ position, rotation }) => {
  const shape = React.useMemo(() => {
    const s = new THREE.Shape();
    // Drawn such that local X maps to -Z after rotation.
    // Local X=0 is front (height 0), Local X=1.0 is back (height 1.6).
    s.moveTo(0, 0);       
    s.lineTo(1.0, 0);     
    s.lineTo(1.0, 1.6);     
    s.lineTo(0, 0);
    return s;
  }, []);

  return (
    <mesh position={position} rotation={rotation}>
      <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.01, bevelThickness: 0.01 }]} />
      <meshStandardMaterial color="#f4f6f8" roughness={0.2} metalness={0.1} />
    </mesh>
  );
};

const QRCodeGrid = ({ position }) => {
  // Simple geometric approximation of a QR code
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[0.6, 0.6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.15, 0.15, 0.01]}>
        <planeGeometry args={[0.15, 0.15]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 0.15, 0.01]}>
        <planeGeometry args={[0.15, 0.15]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.15, -0.15, 0.01]}>
        <planeGeometry args={[0.15, 0.15]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Random small blocks to look like QR */}
      <mesh position={[0.1, -0.1, 0.01]}>
        <planeGeometry args={[0.08, 0.08]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, -0.2, 0.01]}>
        <planeGeometry args={[0.08, 0.08]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[0.1, 0.1]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

const Kiosk = (props) => {
  const group = useRef();

  return (
    <group ref={group} {...props} dispose={null}>
      {/* --- Main Structural Body --- */}
      
      {/* Lower Base Cabinet (White) - Back is flush at Z=0.0 */}
      <RoundedBox args={[2.4, 2.8, 1.0]} radius={0.08} smoothness={4} position={[0, 1.4, 0.5]}>
        <meshStandardMaterial color="#f4f6f8" roughness={0.2} metalness={0.1} />
      </RoundedBox>
      
      {/* 4 Black Feet */}
      <mesh position={[-1.1, 0, 0.1]}><cylinderGeometry args={[0.04, 0.04, 0.1]} /><meshStandardMaterial color="#111" /></mesh>
      <mesh position={[1.1, 0, 0.1]}><cylinderGeometry args={[0.04, 0.04, 0.1]} /><meshStandardMaterial color="#111" /></mesh>
      <mesh position={[-1.1, 0, 0.9]}><cylinderGeometry args={[0.04, 0.04, 0.1]} /><meshStandardMaterial color="#111" /></mesh>
      <mesh position={[1.1, 0, 0.9]}><cylinderGeometry args={[0.04, 0.04, 0.1]} /><meshStandardMaterial color="#111" /></mesh>

      {/* Top Pillar (White) - Flush at Z=0.0 (center Z=0.2 for depth 0.4) */}
      <RoundedBox args={[2.4, 4.0, 0.4]} radius={0.08} smoothness={4} position={[0, 4.8, 0.2]}>
        <meshStandardMaterial color="#f4f6f8" roughness={0.2} metalness={0.1} />
      </RoundedBox>

      {/* Connecting Shelf (Fills gap from Z=0.4 to Z=1.0) */}
      <mesh position={[0, 2.75, 0.7]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[2.2, 0.08, 0.6]} />
        <meshStandardMaterial color="#f4f6f8" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Triangular Side Wings - Spans from Front Z=1.0 to Back Z=0.0 */}
      <TriangleWing position={[-1.2, 2.8, 1.0]} rotation={[0, Math.PI / 2, 0]} />
      <TriangleWing position={[1.1, 2.8, 1.0]} rotation={[0, Math.PI / 2, 0]} />

      {/* Massive Black Touch Screen (Front of Pillar is Z=0.4, Screen at Z=0.41) */}
      <RoundedBox args={[2.0, 3.6, 0.05]} radius={0.02} smoothness={2} position={[0, 4.8, 0.41]}>
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
      </RoundedBox>

      {/* Screen Glow / Reflection highlight */}
      <mesh position={[0, 4.8, 0.44]}>
        <planeGeometry args={[1.9, 3.5]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.03} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Side Scanners / Speakers (Centered on Top Pillar depth) */}
      <RoundedBox args={[0.25, 1.8, 0.3]} radius={0.05} smoothness={4} position={[1.25, 4.5, 0.2]}>
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8} />
      </RoundedBox>
      <RoundedBox args={[0.25, 1.8, 0.3]} radius={0.05} smoothness={4} position={[-1.25, 4.5, 0.2]}>
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8} />
      </RoundedBox>

      {/* C AR / C VR Black Circular Badges on front lip */}
      <group position={[-0.9, 2.85, 0.8]} rotation={[-0.1, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
          <meshStandardMaterial color="#111" roughness={0.4} />
        </mesh>
        <Text position={[0, 0.03, 0.03]} fontSize={0.08} color="#fff" rotation={[-Math.PI/2, 0, 0]}>C</Text>
        <Text position={[0, 0.03, -0.07]} fontSize={0.06} color="#fff" rotation={[-Math.PI/2, 0, 0]}>AR</Text>
      </group>
      
      <group position={[0.9, 2.85, 0.8]} rotation={[-0.1, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
          <meshStandardMaterial color="#111" roughness={0.4} />
        </mesh>
        <Text position={[0, 0.03, 0.03]} fontSize={0.08} color="#fff" rotation={[-Math.PI/2, 0, 0]}>C</Text>
        <Text position={[0, 0.03, -0.07]} fontSize={0.06} color="#fff" rotation={[-Math.PI/2, 0, 0]}>VR</Text>
      </group>

      {/* VR Headset */}
      <VRHeadset rotation={[0, Math.PI, 0]} scale={0.7} />


      {/* ==================================================== */}
      {/* --- Front Face Graphics (Z = 1.01) --- */}
      {/* ==================================================== */}
      <group position={[0, 0, 1.01]}>
        
        {/* CAMPUS Verse Logo Section */}
        <group position={[0, 2.3, 0]}>
          <Text position={[-0.2, 0, 0]} fontSize={0.16} color="#003399" fontStyle="normal">
            CAMPUS
          </Text>
          <Text position={[0.35, 0, 0]} fontSize={0.20} color="#6699ff" fontStyle="italic">
            Verse
          </Text>
          {/* Cloud logo icon next to CAMPUS */}
          <group position={[-0.7, 0, 0]}>
            <mesh position={[0, 0, 0]}><circleGeometry args={[0.04, 32]} /><meshBasicMaterial color="#0033cc" /></mesh>
            <mesh position={[0.04, 0.02, 0]}><circleGeometry args={[0.05, 32]} /><meshBasicMaterial color="#0033cc" /></mesh>
            <mesh position={[0.08, -0.01, 0]}><circleGeometry args={[0.04, 32]} /><meshBasicMaterial color="#6699ff" /></mesh>
          </group>
        </group>

        {/* Subtitle Text */}
        <Text position={[0, 2.05, 0]} fontSize={0.04} color="#555" letterSpacing={0.05}>Explore Experience Discover</Text>
        <Text position={[0, 1.95, 0]} fontSize={0.03} color="#888">An ELC Initiative</Text>

        {/* Logos (TIET Red, ELC Blue) */}
        <group position={[0, 1.7, 0]}>
          <mesh position={[-0.5, 0, 0]}><planeGeometry args={[0.1, 0.1]} /><meshBasicMaterial color="#d11111" /></mesh>
          <Text position={[-0.2, 0.02, 0]} fontSize={0.03} color="#111" anchorX="center">THAPAR INSTITUTE OF</Text>
          <Text position={[-0.2, -0.03, 0]} fontSize={0.03} color="#111" anchorX="center">ENGINEERING & TECHNOLOGY</Text>
          
          <mesh position={[0.5, 0, 0]}><planeGeometry args={[0.4, 0.15]} /><meshBasicMaterial color="#000" /></mesh>
          <Text position={[0.5, 0, 0.01]} fontSize={0.08} color="#fff">ELC</Text>
          <Text position={[0.5, -0.12, 0]} fontSize={0.02} color="#cc0000">EXPERIENTIAL LEARNING CENTRE</Text>
        </group>

        {/* Action Buttons (1, 2, 3) */}
        {[ 
          { id: '1', text: 'GRAB YOUR GEAR', y: 1.3 },
          { id: '2', text: 'CHOOSE YOUR QUEST', y: 1.05 },
          { id: '3', text: 'LOOK - MOVE - DISCOVER', y: 0.8 }
        ].map((btn) => (
          <group key={btn.id} position={[0, btn.y, 0]}>
            <mesh position={[-0.4, 0, 0]}><circleGeometry args={[0.08, 32]} /><meshBasicMaterial color="#003399" /></mesh>
            <Text position={[-0.4, 0, 0.01]} fontSize={0.06} color="#fff">{btn.id}</Text>
            
            <mesh position={[0.15, 0, 0]}><planeGeometry args={[0.8, 0.15]} /><meshBasicMaterial color="#003399" /></mesh>
            <Text position={[0.15, 0, 0.01]} fontSize={0.05} color="#fff">{btn.text}</Text>
          </group>
        ))}

        {/* Email Footer */}
        <Text position={[0, 0.5, 0]} fontSize={0.04} color="#333">FOR ANY QUERIES:</Text>
        <mesh position={[0, 0.3, 0]}><planeGeometry args={[0.8, 0.15]} /><meshBasicMaterial color="#003399" /></mesh>
        <Text position={[0, 0.3, 0.01]} fontSize={0.05} color="#fff">campusverse.info@gmail.com</Text>
      </group>


      {/* ==================================================== */}
      {/* --- Left Face Graphics (X = -1.21) --- */}
      {/* ==================================================== */}
      <group position={[-1.21, 0, 0.5]} rotation={[0, -Math.PI / 2, 0]}>
        
        {/* Placeholder Graphic for VR Person Outline */}
        <group position={[0, 2.0, 0]}>
          {/* Abstract representation of the VR person graphic */}
          <mesh position={[0, 0.2, 0]}><circleGeometry args={[0.2, 32]} /><meshBasicMaterial color="#003399" /></mesh>
          <mesh position={[0, 0.2, 0.01]}><circleGeometry args={[0.18, 32]} /><meshBasicMaterial color="#f4f6f8" /></mesh>
          <mesh position={[0.05, 0.2, 0.02]}><planeGeometry args={[0.15, 0.08]} /><meshBasicMaterial color="#003399" /></mesh>
          <Text position={[0, -0.15, 0]} fontSize={0.04} color="#003399">VR EXPERIENCE</Text>
        </group>

        {/* Text Section */}
        <Text position={[0, 1.4, 0]} fontSize={0.04} color="#333">AN ELC INITIATIVE</Text>
        <Text position={[0, 1.3, 0]} fontSize={0.04} color="#333">UNDER THE GUIDANCE OF</Text>
        <mesh position={[0, 1.2, 0]}><planeGeometry args={[1.2, 0.01]} /><meshBasicMaterial color="#ccc" /></mesh>

        <Text position={[-0.3, 1.05, 0]} fontSize={0.04} color="#111" anchorX="center">Dr. Surbhi Sharma</Text>
        <Text position={[-0.3, 0.95, 0]} fontSize={0.03} color="#555" anchorX="center">Professor, DECE</Text>

        <Text position={[0.3, 1.05, 0]} fontSize={0.04} color="#111" anchorX="center">Dr. Kulbir Singh</Text>
        <Text position={[0.3, 0.95, 0]} fontSize={0.03} color="#555" anchorX="center">Head, DECE</Text>

        <mesh position={[0, 0.8, 0]}><planeGeometry args={[1.2, 0.01]} /><meshBasicMaterial color="#ccc" /></mesh>
        <Text position={[0, 0.7, 0]} fontSize={0.05} color="#333">THE MINDS BEHIND</Text>
        <mesh position={[0, 0.6, 0]}><planeGeometry args={[1.2, 0.01]} /><meshBasicMaterial color="#ccc" /></mesh>

        {/* Student Names (Placeholder layout) */}
        <group position={[0, 0.4, 0]}>
          <Text position={[-0.3, 0, 0]} fontSize={0.03} color="#555" anchorX="center">Prabhjot Kaur</Text>
          <Text position={[-0.3, -0.1, 0]} fontSize={0.03} color="#555" anchorX="center">Aman</Text>
          <Text position={[-0.3, -0.2, 0]} fontSize={0.03} color="#555" anchorX="center">Diya Duneja</Text>
          <Text position={[-0.3, -0.3, 0]} fontSize={0.03} color="#555" anchorX="center">Chirag Sood</Text>

          <Text position={[0.3, 0, 0]} fontSize={0.03} color="#555" anchorX="center">Harkamal Singh</Text>
          <Text position={[0.3, -0.1, 0]} fontSize={0.03} color="#555" anchorX="center">Vaibhav Jain</Text>
          <Text position={[0.3, -0.2, 0]} fontSize={0.03} color="#555" anchorX="center">Satvik Ganda</Text>
          <Text position={[0.3, -0.3, 0]} fontSize={0.03} color="#555" anchorX="center">Rhythmpreet Singh</Text>
        </group>
      </group>


      {/* ==================================================== */}
      {/* --- Right Face Graphics (X = 1.21) --- */}
      {/* ==================================================== */}
      <group position={[1.21, 0, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        
        {/* Features List */}
        <group position={[0, 2.2, 0]}>
          <mesh position={[-0.3, 0, 0]}><circleGeometry args={[0.08, 32]} /><meshBasicMaterial color="#ccc" /></mesh>
          <Text position={[-0.3, 0, 0.01]} fontSize={0.08} color="#003399">B</Text>
          <Text position={[0.1, 0.03, 0]} fontSize={0.06} color="#111" anchorX="left">Branch ELC</Text>
          <Text position={[0.1, -0.04, 0]} fontSize={0.03} color="#555" anchorX="left">Discover Every ELC Wing</Text>
        </group>

        <group position={[0, 1.8, 0]}>
          <mesh position={[-0.3, 0, 0]}><planeGeometry args={[0.15, 0.1]} /><meshBasicMaterial color="#000" /></mesh>
          <Text position={[-0.3, 0, 0.01]} fontSize={0.04} color="#fff">ELC</Text>
          <Text position={[0.1, 0.03, 0]} fontSize={0.06} color="#111" anchorX="left">Summer ELC</Text>
          <Text position={[0.1, -0.04, 0]} fontSize={0.03} color="#555" anchorX="left">Hands-on Learning & Innovation</Text>
        </group>

        <group position={[0, 1.4, 0]}>
          <mesh position={[-0.3, 0, 0]}><circleGeometry args={[0.08, 32]} /><meshBasicMaterial color="#003399" /></mesh>
          <Text position={[0.1, 0.03, 0]} fontSize={0.06} color="#111" anchorX="left">VR Tour</Text>
          <Text position={[0.1, -0.04, 0]} fontSize={0.03} color="#555" anchorX="left">Explore the campus freely in VR</Text>
        </group>

        {/* QR Code Section */}
        <Text position={[0, 0.9, 0]} fontSize={0.06} color="#333">SCAN TO</Text>
        <QRCodeGrid position={[0, 0.5, 0.01]} />
        <Text position={[0, 0.1, 0]} fontSize={0.06} color="#333">SHARE YOUR FEEDBACK</Text>

      </group>

    </group>
  );
};

const KioskModel = () => {
  return (
    <div className="w-full h-full min-h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [4.5, 4, 7], fov: 45 }}>
        {/* Cinematic Lighting for the Model */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#00d2ff" />
        <spotLight position={[0, 8, 4]} angle={0.5} penumbra={1} intensity={3} castShadow />

        <React.Suspense fallback={null}>
          <group position={[0, -2.5, 0]}>
            <Kiosk />
          </group>
        </React.Suspense>

        {/* Controls to rotate around the kiosk */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default KioskModel;
