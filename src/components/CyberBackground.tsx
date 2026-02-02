import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
const FloatingHexagons = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const hexagons = useMemo(() => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15 - 5
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {hexagons.map((hex, i) => (
        <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={hex.position} scale={hex.scale}>
            <cylinderGeometry args={[1, 1, 0.1, 6]} />
            <meshBasicMaterial
              color="#00d4ff"
              transparent
              opacity={0.15}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Data streams / particles flowing
const DataParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, velocities } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      velocities[i] = Math.random() * 0.02 + 0.01;
    }
    
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= velocities[i];
        if (pos[i * 3 + 1] < -15) {
          pos[i * 3 + 1] = 15;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.05}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Grid plane
const CyberGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
    }
  });

  return (
    <group position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[100, 50, '#00d4ff', '#004466']}
      />
    </group>
  );
};

// Central rotating ring
const HoloRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -10]}>
      <torusGeometry args={[8, 0.05, 16, 100]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
    </mesh>
  );
};

const CyberBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050a12']} />
        <fog attach="fog" args={['#050a12', 10, 50]} />
        
        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={4}
          saturation={0.5}
          fade
          speed={0.5}
        />
        
        <FloatingHexagons />
        <DataParticles />
        <CyberGrid />
        <HoloRing />
        
        <ambientLight intensity={0.1} />
      </Canvas>
      
      {/* Scanlines overlay */}
      <div className="scanlines" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent pointer-events-none" />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(220 40% 4% / 0.8) 100%)'
        }}
      />
    </div>
  );
};

export default CyberBackground;
