import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Elegant floating particles - mix of gold and red
const ElegantParticles = () => {
  const goldParticlesRef = useRef<THREE.Points>(null);
  const redParticlesRef = useRef<THREE.Points>(null);
  
  const goldPositions = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    
    return positions;
  }, []);

  const redPositions = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (goldParticlesRef.current) {
      goldParticlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
    if (redParticlesRef.current) {
      redParticlesRef.current.rotation.y = -state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <>
      {/* Gold particles */}
      <points ref={goldParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={goldPositions}
            count={goldPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#e8b84a"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      
      {/* Red particles */}
      <points ref={redParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={redPositions}
            count={redPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#cc4455"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </>
  );
};

// Decorative rings - gold and red
const DecorativeRings = () => {
  const goldRingRef = useRef<THREE.Mesh>(null);
  const redRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (goldRingRef.current) {
      goldRingRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      goldRingRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (redRingRef.current) {
      redRingRef.current.rotation.z = -state.clock.elapsedTime * 0.03;
      redRingRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.08) * 0.1;
    }
  });

  return (
    <>
      {/* Gold ring */}
      <mesh ref={goldRingRef} position={[0, 0, -15]}>
        <torusGeometry args={[12, 0.03, 16, 100]} />
        <meshBasicMaterial color="#e8b84a" transparent opacity={0.3} />
      </mesh>
      
      {/* Red ring */}
      <mesh ref={redRingRef} position={[0, 0, -18]}>
        <torusGeometry args={[15, 0.02, 16, 100]} />
        <meshBasicMaterial color="#cc4455" transparent opacity={0.2} />
      </mesh>
    </>
  );
};

// Floating decorative orbs
const FloatingOrbs = () => {
  const orbs = useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 45,
          (Math.random() - 0.5) * 28,
          (Math.random() - 0.5) * 20 - 8
        ] as [number, number, number],
        scale: Math.random() * 0.4 + 0.15,
        isGold: i % 3 !== 0, // 2/3 gold, 1/3 red
      });
    }
    return items;
  }, []);

  return (
    <group>
      {orbs.map((orb, i) => (
        <Float key={i} speed={0.4} rotationIntensity={0.15} floatIntensity={0.4}>
          <mesh position={orb.position} scale={orb.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color={orb.isGold ? "#e8b84a" : "#cc4455"}
              transparent
              opacity={0.12}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const PremiumBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Dark red-tinted background */}
        <color attach="background" args={['#1a0a0a']} />
        <fog attach="fog" args={['#1a0a0a', 15, 60]} />
        
        <ElegantParticles />
        <DecorativeRings />
        <FloatingOrbs />
        
        <ambientLight intensity={0.08} />
      </Canvas>
      
      {/* Ambient glow - red and gold */}
      <div className="ambient-glow" />
      
      {/* Subtle vignette with red tint */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(0 30% 6% / 0.85) 100%)'
        }}
      />
    </div>
  );
};

export default PremiumBackground;
