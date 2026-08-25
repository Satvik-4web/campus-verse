import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Edges, Environment, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom, Glitch, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/** Eased 0..1 ramp between two scroll positions. Every phase below uses this,
 *  which is what keeps the whole sequence on one clock. */
const ramp = (x, a, b) => {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

const BurstParticles = ({ smoothScroll }) => {
  const count = 320;
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Pre-calculate random spherical directions and speeds
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      const speed = 0.5 + Math.random() * 2.5;
      const scale = Math.random() * 0.2 + 0.05;
      temp.push({ dir: new THREE.Vector3(x, y, z), speed, scale });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!mesh.current || !smoothScroll) return;
    const p = smoothScroll.get();
    
    // Runs with the shell dissolve rather than after it, so the headset comes
    // apart into motes instead of detonating.
    const burstProgress = ramp(p, 0.54, 0.86);
    
    // Ease out explosion
    const easeOut = 1 - Math.pow(1 - burstProgress, 4);
    
    particles.forEach((particle, i) => {
      // Particles travel outward based on their unique speed
      const dist = easeOut * 5.5 * particle.speed;
      dummy.position.copy(particle.dir).multiplyScalar(dist);
      
      // Scale up rapidly then shrink away smoothly
      const currentScale = burstProgress === 0 ? 0 : particle.scale * 0.55 * Math.sin(burstProgress * Math.PI);
      dummy.scale.set(currentScale, currentScale, currentScale);
      
      // Orient the streak along its direction vector to look like a warp-speed light streak
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), particle.dir.clone().normalize());
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Fade out material globally as the burst dissipates
    mesh.current.material.opacity = burstProgress === 0 ? 0 : Math.max(0, 1 - burstProgress) * 0.7;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      {/* Short mote rather than a warp streak — drifting, not shrapnel */}
      <boxGeometry args={[0.03, 0.03, 0.22]} />
      <meshStandardMaterial 
        color="#38bdf8" 
        emissive="#38bdf8" 
        emissiveIntensity={4} 
        transparent 
        depthWrite={false} 
        toneMapped={false} 
        envMapIntensity={0}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};

const RecursiveModel = ({ node, isWireframe }) => {
  if (!node) return null;
  const lowerName = node.name ? node.name.toLowerCase() : '';
  if (
    lowerName.includes('strap') || 
    lowerName.includes('headband') || 
    lowerName.includes('lens') || 
    lowerName.includes('eye') || 
    lowerName.includes('screen') || 
    lowerName.includes('glass') || 
    lowerName.includes('internal') ||
    lowerName.includes('inner')
  ) return null;

  return (
    <group position={node.position} rotation={node.rotation} scale={node.scale}>
      {node.isMesh && (
        isWireframe ? (
          <mesh geometry={node.geometry}>
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} wireframe transparent opacity={0.8} toneMapped={false} />
          </mesh>
        ) : (
          <mesh geometry={node.geometry}>
            {/* Was a flat basic material, which gave the silhouette no form at
                all. A physical shell still occludes the interior edges (so the
                blueprint look survives) but now catches the rim lights and the
                environment, so the body reads as a machined object. */}
            <meshPhysicalMaterial
              color="#060d1c"
              roughness={0.44}
              metalness={0.6}
              clearcoat={0.85}
              clearcoatRoughness={0.22}
              emissive="#0a2540"
              emissiveIntensity={0.35}
              envMapIntensity={0.9}
            />
            <Edges color="#7dd3fc" threshold={35} />
          </mesh>
        )
      )}
      {node.children && node.children.map((child, i) => (
        <RecursiveModel key={i} node={child} isWireframe={isWireframe} />
      ))}
    </group>
  );
};

/**
 * Expanding ring left behind by the burst. Camera-facing, additive and
 * depth-write-free so it reads as light rather than as a disc of geometry.
 */
const ShockwaveRing = ({ smoothScroll, start, span, maxScale, thickness }) => {
  const ref = useRef();
  const matRef = useRef();

  useFrame(() => {
    if (!ref.current || !smoothScroll) return;
    const p = smoothScroll.get();
    const t = p <= start ? 0 : Math.min((p - start) / span, 1);

    // Fast out of the gate, coasting at the end.
    const ease = 1 - Math.pow(1 - t, 3);
    const scale = 0.15 + ease * maxScale;
    ref.current.scale.set(scale, scale, scale);

    // Invisible before it fires and once it has fully dissipated.
    matRef.current.opacity = t <= 0 || t >= 1 ? 0 : Math.pow(1 - t, 2.2) * 0.34;
  });

  return (
    <mesh ref={ref} scale={0}>
      <ringGeometry args={[1 - thickness, 1, 128]} />
      <meshBasicMaterial
        ref={matRef}
        color="#7dd3fc"
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

/** Resting size of the headset. Owned here because useFrame writes scale every
 *  frame, so a JSX scale prop would fight it on every re-render. */
const BASE_SCALE = 1.12;

const GlowingHeadset = ({ smoothScroll, isTransitioning }) => {
  const groupRef = useRef();
  const bodyRef = useRef();
  const fadePrepped = useRef(false);
  
  const { scene } = useGLTF('/meta-quest-3/source/Quest3.glb');

  const centeredModel = useMemo(() => {
    const cloned = scene.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.set(-center.x, -center.y, -center.z);
    return cloned;
  }, [scene]);

  useFrame((state, delta) => {
    if (!smoothScroll) return;
    const p = smoothScroll.get();

    // Materials have to opt into transparency before they can be faded, and
    // flipping it needs a shader recompile — so do it once, not every frame.
    if (bodyRef.current && !fadePrepped.current) {
      bodyRef.current.traverse((child) => {
        if (child.material) {
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
      fadePrepped.current = true;
    }

    // ONE ramp drives the whole hand-off. Everything below is a phase of it, so
    // the headset leaving and the panels arriving are the same gesture rather
    // than two animations that happen to be near each other.
    const handoff = ramp(p, 0.34, 0.78);
    const dissolve = ramp(p, 0.52, 0.82);

    if (groupRef.current) {
      // Pointer parallax, which relaxes to a fixed presentation angle as the
      // headset stops being the thing you are looking at.
      const maxRot = Math.PI / 8;
      const pointerX = THREE.MathUtils.clamp((state.pointer.y * Math.PI) / 8, -maxRot, maxRot);
      const pointerY = THREE.MathUtils.clamp((state.pointer.x * Math.PI) / 8, -maxRot, maxRot);
      // damp() instead of lerp(x, y, delta * 5): that factor goes above 1 on any
      // long frame (tab refocus, GC pause) and lerp then overshoots wildly.
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x, THREE.MathUtils.lerp(pointerX, -0.12, handoff), 5, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y, THREE.MathUtils.lerp(pointerY, 0.42, handoff), 5, delta);

      // Idle hover, then a lift-and-recede: it withdraws upstage to clear the
      // frame for the panels instead of shrinking to nothing on the spot.
      const idleFloat = 0.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      const restY = THREE.MathUtils.lerp(idleFloat, 0, Math.min(p * 3, 1));
      
      // Responsive scaling: reduce size slightly on portrait screens (kiosks/mobile)
      const aspect = state.viewport.width / state.viewport.height;
      const scaleMultiplier = aspect < 1 ? 0.48 : 1.0;
      const currentBaseScale = BASE_SCALE * scaleMultiplier;

      groupRef.current.position.y = THREE.MathUtils.lerp(restY, 1.05, handoff);
      groupRef.current.position.z = THREE.MathUtils.lerp(0, -3.4, handoff);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(currentBaseScale, currentBaseScale * 0.62, handoff));
    }

    if (bodyRef.current) {
      // Derived from scroll position, never accumulated. An accumulator only
      // ever counts up, so scrolling back up left the headset parked at
      // whatever angle it had reached — facing away. As a function of handoff
      // it unwinds exactly the way it wound on.
      bodyRef.current.rotation.y = handoff * Math.PI * 0.9;

      // Dematerialise: the shell and its edges fade together while the motes
      // drift off, so there is no moment where it simply vanishes.
      const opacity = 1 - dissolve;
      bodyRef.current.visible = opacity > 0.002;
      bodyRef.current.traverse((child) => {
        if (child.material) {
          child.material.opacity = opacity;
          child.material.depthWrite = opacity > 0.9;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>

      {/* The shell itself */}
      <group ref={bodyRef}>
        <group scale={20}>
          <RecursiveModel node={centeredModel} isWireframe={isTransitioning} />
        </group>
      </group>

      {/* Motes it comes apart into, plus the ring that marks the hand-off */}
      <BurstParticles smoothScroll={smoothScroll} />
      <ShockwaveRing smoothScroll={smoothScroll} start={0.56} span={0.34} maxScale={9} thickness={0.012} />
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
      const speed = 0.05 + Math.random() * 0.2;
      const scale = 0.5 + Math.random() * 1.5;
      temp.push({ x, y, z, speed, scale });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
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
    // Same overshoot hazard as the headset — damp so a long frame can't fling
    // the whole starfield sideways.
    mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, targetRotationX, 2, delta);
    mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, targetRotationY, 2, delta);
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial 
        color="#38bdf8" 
        emissive="#38bdf8" 
        emissiveIntensity={1.5} 
        transparent 
        opacity={0.6}
        depthWrite={false}
        envMapIntensity={0}
        blending={THREE.AdditiveBlending}
        toneMapped={false} 
      />
    </instancedMesh>
  );
};

const Scene = ({ smoothScroll, isTransitioning }) => {
  const lightRef = useRef();

  useFrame((state, delta) => {
    if (lightRef.current) {
      lightRef.current.intensity = 3 + Math.sin(state.clock.elapsedTime * 2) * 2;
    }

    // Camera leans in through the charge-up and pulls back out for the cards,
    // so the burst happens at the closest point instead of at a fixed distance.
    if (smoothScroll) {
      const p = Math.min(smoothScroll.get(), 1);
      const targetZ = 8 - Math.sin(p * Math.PI) * 1.15;
      state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} color="#132a4d" />
      {/* Back glow that separates the headset from the navy background */}
      <pointLight ref={lightRef} position={[0, 0, -1]} color="#0ea5e9" intensity={5} />
      {/* Cool key from upper-left + warm-white kicker from the right, so the
          shell has a readable light direction instead of flat ambient. */}
      <spotLight position={[-6, 5, 4]} angle={0.6} penumbra={1} intensity={120} color="#7dd3fc" />
      <spotLight position={[6, -2, 3]} angle={0.7} penumbra={1} intensity={35} color="#7dd3fc" />

      {/* Reflections without a downloaded HDR: lightformers are rendered into a
          small cube map once, so metalness/clearcoat have something to mirror. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#7dd3fc" position={[-5, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#1e6fd9" position={[5, -1, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={0.85} color="#9fd4ff" position={[0, 6, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 10, 1]} />
        <Lightformer form="ring" intensity={4} color="#38bdf8" position={[0, 0, -6]} scale={6} />
      </Environment>
      
      {/* Background Deep Space Particles */}
      <BrightParticles />
      
      {/* The Central Animated Headset Sequence */}
      <GlowingHeadset smoothScroll={smoothScroll} isTransitioning={isTransitioning} />

      {/* Intense Bloom, Glitch & Vignette Post-Processing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur={true} intensity={1.2} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        {isTransitioning && (
           <>
             <Glitch 
               delay={[0.1, 0.5]}
               duration={[0.1, 0.3]}
               strength={[0.1, 0.5]}
               active={isTransitioning} 
               ratio={0.8}
             />
             <ChromaticAberration offset={[0.02, 0.002]} />
           </>
        )}
      </EffectComposer>

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
useGLTF.preload('/meta-quest-3/source/Quest3.glb');