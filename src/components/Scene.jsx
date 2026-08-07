import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const GlowingHeadset = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      
      // Mouse Parallax Effect
      const targetRotationX = (state.pointer.y * Math.PI) / 8;
      const targetRotationY = (state.pointer.x * Math.PI) / 8;
      
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * delta * 5;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * delta * 5;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Headset Strap - Wireframe */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -1]}>
        <torusGeometry args={[1.8, 0.15, 8, 48]} />
        <meshBasicMaterial color="#0055ff" wireframe={true} transparent opacity={0.3} />
      </mesh>
      {/* Headset Strap - Solid Core to block back lines */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -1]}>
        <torusGeometry args={[1.8, 0.14, 8, 48]} />
        <meshBasicMaterial color="#040a18" />
      </mesh>

      {/* Headset Visor Body - Wireframe */}
      <RoundedBox args={[3.5, 1.6, 1.2]} radius={0.6} smoothness={3}>
        <meshStandardMaterial 
          color="#00d2ff" 
          emissive="#00d2ff" 
          emissiveIntensity={0.8} 
          wireframe={true} 
          transparent={true}
          opacity={0.45}
        />
      </RoundedBox>
      
      {/* Inner solid body to block back-facing lines and make it clean! */}
      <RoundedBox args={[3.45, 1.55, 1.15]} radius={0.58} smoothness={3}>
        <meshBasicMaterial 
          color="#040a18" // Match background color
        />
      </RoundedBox>

      {/* Quest 3 Sensor Array (Front Face) */}
      <group position={[0, 0, 0.65]}>
        <SensorNode position={[-0.7, 0, 0]} />
        <SensorNode position={[0, 0, 0]} />
        <SensorNode position={[0.7, 0, 0]} />
      </group>
    </group>
  );
};

const SensorNode = ({ position }) => {
  return (
    <group position={position}>
      {/* Solid Housing Core */}
      <mesh rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.2, 0.5, 16, 16]} />
        <meshBasicMaterial color="#040a18" />
      </mesh>
      
      {/* Wireframe outline for housing */}
      <mesh rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.21, 0.51, 8, 12]} />
        <meshBasicMaterial color="#00d2ff" wireframe={true} transparent opacity={0.6} />
      </mesh>
      
      {/* Magenta Camera Lens / Dot */}
      <mesh position={[0, 0, 0.22]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#ff00ff" 
          emissive="#ff00ff" 
          emissiveIntensity={4} // High intensity for bloom
          toneMapped={false} // Crucial for post-processing bloom
        />
      </mesh>
    </group>
  );
};

const BrightParticles = () => {
  const count = 400;
  const mesh = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      // Make particles fly faster at the edges for a warp effect
      const speed = 0.05 + Math.random() * 0.2;
      const scale = 0.5 + Math.random() * 1.5;
      temp.push({ x, y, z, speed, scale });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    particles.forEach((particle, i) => {
      particle.z += particle.speed;
      if (particle.z > 20) particle.z = -20;
      
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.rotation.x += delta;
      dummy.rotation.y += delta;
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    
    const targetRotationX = (state.pointer.y * Math.PI) / 16;
    const targetRotationY = (state.pointer.x * Math.PI) / 16;
    mesh.current.rotation.x += (targetRotationX - mesh.current.rotation.x) * delta * 2;
    mesh.current.rotation.y += (targetRotationY - mesh.current.rotation.y) * delta * 2;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      {/* Box geometry creates the diamond/square particles */}
      <boxGeometry args={[0.02, 0.02, 0.02]} />
      <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={1.5} toneMapped={false} />
    </instancedMesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#00d2ff" />
      <pointLight position={[0, 0, 2]} intensity={2} color="#00d2ff" distance={5} />
      
      {/* Background Particles (Bright Blue Diamonds) */}
      <BrightParticles />
      
      {/* Main 3D Object */}
      <GlowingHeadset />

      {/* Intense Bloom for the high-tech sci-fi look */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={2} />
      </EffectComposer>

      {/* Controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={false}
        enableRotate={false} 
      />
    </>
  );
};

export default Scene;
