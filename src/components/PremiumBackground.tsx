import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Elegant floating particles
const ElegantParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, sizes } = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#d4a84b"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

// Subtle decorative ring
const GoldenRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -15]}>
      <torusGeometry args={[12, 0.02, 16, 100]} />
      <meshBasicMaterial color="#d4a84b" transparent opacity={0.2} />
    </mesh>
  );
};

// Floating decorative elements
const FloatingOrbs = () => {
  const orbs = useMemo(() => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 20 - 8
        ] as [number, number, number],
        scale: Math.random() * 0.3 + 0.1,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {orbs.map((orb, i) => (
        <Float key={i} speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={orb.position} scale={orb.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#d4a84b" : "#8b2942"}
              transparent
              opacity={0.08}
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
        <color attach="background" args={['#0d0808']} />
        <fog attach="fog" args={['#0d0808', 15, 60]} />
        
        <ElegantParticles />
        <GoldenRing />
        <FloatingOrbs />
        
        <ambientLight intensity={0.05} />
      </Canvas>
      
      {/* Ambient glow */}
      <div className="ambient-glow" />
      
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(0 15% 5% / 0.9) 100%)'
        }}
      />
    </div>
  );
};

export default PremiumBackground;
