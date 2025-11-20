import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

function Orbiter({ radius, speed, color, size }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.z = Math.sin(t) * radius;
  });

  return (
    <Sphere ref={meshRef} args={[size, 32, 32]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
}

export default function OrbitScene() {
  return (
    <Canvas camera={{ position: [0, 20, 50], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} />

      {/* Central object */}
      <Sphere args={[3, 32, 32]}>
        <meshStandardMaterial color="orange" />
      </Sphere>

      {/* Orbiting objects */}
      <Orbiter radius={10} speed={1} color="blue" size={1} />
      <Orbiter radius={15} speed={0.7} color="green" size={1.2} />
      <Orbiter radius={20} speed={0.4} color="red" size={0.8} />
    </Canvas>
  );
}
