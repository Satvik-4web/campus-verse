import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleWave = () => {
  const pointsRef = useRef();
  
  const count = 80; // 80x80 grid = 6400 points
  const separation = 0.6;
  
  // Generate initial grid positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    let i = 0;
    for (let ix = 0; ix < count; ix++) {
      for (let iy = 0; iy < count; iy++) {
        pos[i] = ix * separation - ((count * separation) / 2); // x
        pos[i + 1] = 0; // y
        pos[i + 2] = iy * separation - ((count * separation) / 2); // z
        i += 3;
      }
    }
    return pos;
  }, [count, separation]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position.array;
    
    // Map mouse pointer to 3D space roughly
    const mouseX = (state.pointer.x * 20);
    const mouseZ = -(state.pointer.y * 20);

    let i = 0;
    for (let ix = 0; ix < count; ix++) {
      for (let iy = 0; iy < count; iy++) {
        const x = ix * separation - ((count * separation) / 2);
        const z = iy * separation - ((count * separation) / 2);
        
        // Calculate distance to mouse
        const distToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(z - mouseZ, 2));
        
        // Lift effect around the mouse
        let mouseLift = 0;
        if (distToMouse < 6) {
          mouseLift = (6 - distToMouse) * 0.4;
        }

        // Double sine wave math
        const wave1 = Math.sin((ix * 0.3) + time) * 0.5;
        const wave2 = Math.cos((iy * 0.2) + time) * 0.5;
        
        posArray[i + 1] = wave1 + wave2 + mouseLift;
        i += 3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.05) * 0.2;
  });

  return (
    <points ref={pointsRef} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#14D8FF"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#020308]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0a1128_0%,_#020308_100%)]" />
      <Canvas camera={{ position: [0, 4, 12], fov: 60 }} className="absolute inset-0">
        <fog attach="fog" args={['#020308', 5, 25]} />
        <Suspense fallback={null}>
          <ParticleWave />
        </Suspense>
      </Canvas>
    </div>
  );
}
