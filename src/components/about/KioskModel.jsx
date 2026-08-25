import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, RoundedBox, Float, ContactShadows, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { drawFront, drawLeft, drawRight, makePanelTexture } from './panelArt';

/**
 * The Campus Verse kiosk, modelled against the physical unit.
 *
 * Panel artwork is drawn to canvas textures (see panelArt.js) rather than
 * assembled from floating <Text> meshes, which is what made the previous
 * version's graphics drift out of alignment with the faces they sat on.
 */

// Names printed on the left panel. Kept from the existing model — the
// reference photo is too low-resolution to re-read them reliably.
const MINDS = [
  'Rehajpreet Kaur',
  'Sachi',
  'Diya Duneja',
  'Chirag Sood',
  'Harkaranvir Singh',
  'Vaibhav Jain',
  'Satvik Ganda',
  'Rhythmpreet Singh',
];

// Cabinet
const BODY_W = 2.3;
const BODY_H = 2.75;
const BODY_D = 1.05;
const BODY_Y = 1.5;
const FRONT_Z = BODY_D / 2;

// Screen mast, which on the real unit is a narrow panel set at the back
const MAST_W = 1.18;
const MAST_H = 3.35;
const MAST_D = 0.17;
const MAST_Y = BODY_Y + BODY_H / 2 + MAST_H / 2 - 0.12;
const MAST_Z = -BODY_D / 2 + MAST_D / 2 + 0.06;

const SHELL = '#f6f7f9';

const Shell = (props) => (
  <meshStandardMaterial color={SHELL} roughness={0.35} metalness={0.05} {...props} />
);

/** Quest-style headset resting on the shelf. */
const VRHeadset = ({ position }) => {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.6) * 0.012;
  });

  return (
    <group ref={group} position={position}>
      <RoundedBox args={[0.62, 0.3, 0.34]} radius={0.11} smoothness={5}>
        <meshStandardMaterial color="#fbfbfc" roughness={0.3} metalness={0.05} />
      </RoundedBox>
      {/* Dark visor face */}
      <RoundedBox args={[0.54, 0.22, 0.05]} radius={0.05} smoothness={4} position={[0, 0.01, 0.17]}>
        <meshStandardMaterial color="#15171c" roughness={0.25} metalness={0.6} />
      </RoundedBox>
      {/* Facial interface */}
      <RoundedBox args={[0.44, 0.2, 0.12]} radius={0.06} smoothness={4} position={[0, -0.02, -0.16]}>
        <meshStandardMaterial color="#2b2f38" roughness={0.85} />
      </RoundedBox>
      {/* Strap */}
      <mesh position={[0, 0.02, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.028, 12, 40, Math.PI * 1.1]} />
        <meshStandardMaterial color="#e9eaee" roughness={0.7} />
      </mesh>
    </group>
  );
};

/** The small square AR / VR badges flanking the headset. */
const ModeBadge = ({ position, label }) => (
  <group position={position} rotation={[-0.32, 0, 0]}>
    <RoundedBox args={[0.3, 0.3, 0.035]} radius={0.05} smoothness={4}>
      <meshStandardMaterial color="#111318" roughness={0.4} metalness={0.3} />
    </RoundedBox>
    <mesh position={[0, 0, 0.021]}>
      <planeGeometry args={[0.24, 0.24]} />
      <meshBasicMaterial map={useMemo(() => {
        const c = document.createElement('canvas');
        c.width = 128; c.height = 128;
        const g = c.getContext('2d');
        g.fillStyle = '#111318';
        g.fillRect(0, 0, 128, 128);
        g.fillStyle = '#fff';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.font = '700 46px Inter, Arial, sans-serif';
        g.fillText('C', 64, 44);
        g.font = '700 40px Inter, Arial, sans-serif';
        g.fillText(label, 64, 90);
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        return t;
      }, [label])} toneMapped={false} />
    </mesh>
  </group>
);

/** Wedge filling the gap between the tall mast and the lower front lip. */
const SideWedge = ({ x }) => {
  const geometry = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(BODY_D * 0.62, 0);
    s.lineTo(0, 0.62);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: false });
  }, []);

  return (
    <mesh
      geometry={geometry}
      position={[x, BODY_Y + BODY_H / 2, -BODY_D / 2 + 0.08]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <Shell />
    </mesh>
  );
};

const Kiosk = () => {
  const frontTex = useMemo(() => makePanelTexture(drawFront, 1024, 1200), []);
  const leftTex = useMemo(() => makePanelTexture(drawLeft, 900, 1400, MINDS), []);
  const rightTex = useMemo(() => makePanelTexture(drawRight, 900, 1400), []);

  return (
    <group>
      {/* Cabinet */}
      <RoundedBox args={[BODY_W, BODY_H, BODY_D]} radius={0.05} smoothness={4} position={[0, BODY_Y, 0]}>
        <Shell />
      </RoundedBox>

      {/* Feet */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz]) => (
        <mesh key={`${sx}${sz}`} position={[sx * (BODY_W / 2 - 0.16), 0.06, sz * (BODY_D / 2 - 0.16)]}>
          <cylinderGeometry args={[0.05, 0.06, 0.12, 20]} />
          <meshStandardMaterial color="#15171c" roughness={0.6} />
        </mesh>
      ))}

      {/* Screen mast */}
      <RoundedBox args={[MAST_W, MAST_H, MAST_D]} radius={0.05} smoothness={4} position={[0, MAST_Y, MAST_Z]}>
        <Shell />
      </RoundedBox>

      {/* Portrait display */}
      <RoundedBox
        args={[MAST_W * 0.8, MAST_H * 0.78, 0.03]}
        radius={0.03}
        smoothness={4}
        position={[0, MAST_Y + 0.06, MAST_Z + MAST_D / 2 + 0.005]}
      >
        <meshStandardMaterial color="#0a0b0e" roughness={0.15} metalness={0.55} />
      </RoundedBox>

      <SideWedge x={-MAST_W / 2 - 0.03} />
      <SideWedge x={MAST_W / 2 - 0.02} />

      {/* Shelf furniture */}
      <VRHeadset position={[0, BODY_Y + BODY_H / 2 + 0.2, 0.16]} />
      <ModeBadge position={[-0.72, BODY_Y + BODY_H / 2 + 0.12, 0.2]} label="AR" />
      <ModeBadge position={[0.72, BODY_Y + BODY_H / 2 + 0.12, 0.2]} label="VR" />

      {/* Printed panels */}
      <mesh position={[0, BODY_Y - 0.03, FRONT_Z + 0.001]}>
        <planeGeometry args={[BODY_W * 0.97, BODY_H * 0.95]} />
        <meshBasicMaterial map={frontTex} toneMapped={false} />
      </mesh>

      <mesh position={[-BODY_W / 2 - 0.001, BODY_Y, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[BODY_D * 0.94, BODY_H * 0.95]} />
        <meshBasicMaterial map={leftTex} toneMapped={false} />
      </mesh>

      <mesh position={[BODY_W / 2 + 0.001, BODY_Y, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[BODY_D * 0.94, BODY_H * 0.95]} />
        <meshBasicMaterial map={rightTex} toneMapped={false} />
      </mesh>
    </group>
  );
};

const KioskScene = () => {
  const { viewport } = useThree();
  const scale = viewport.width / viewport.height < 1 ? 1.15 : 1.0;

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 8, 6]} intensity={1.6} />
      <directionalLight position={[-6, 4, 2]} intensity={0.5} color="#9ecbff" />
      <pointLight position={[0, 2.5, 3]} intensity={12} color="#38bdf8" distance={12} />

      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 6, 3]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 10, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#9ecbff" position={[-6, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[8, 8, 1]} />
      </Environment>

      <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.35} floatingRange={[-0.06, 0.06]}>
        <group position={[0, -2.6 * scale, 0]} scale={scale}>
          <Kiosk />
        </group>
      </Float>

      <ContactShadows position={[0, -2.6 * scale, 0]} opacity={0.5} scale={12 * scale} blur={2.6} far={5} color="#000" />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.1} />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.9}
        minAzimuthAngle={-0.7}
        maxAzimuthAngle={0.7}
      />
    </>
  );
};

const KioskModel = () => (
  <div className="h-full w-full">
    <Canvas camera={{ position: [3.6, 3.6, 6.2], fov: 42 }} gl={{ alpha: true, antialias: true }}>
      <KioskScene />
    </Canvas>
  </div>
);

export default KioskModel;
