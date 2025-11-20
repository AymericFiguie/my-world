import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Leva, useControls } from "leva";
import * as THREE from "three";

export function PlanetRocketScene() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Leva collapsed />

      <Canvas
        camera={{ position: [3, 3, 6], fov: 60 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <PlanetWithRocket scrollY={scrollY} />
        {/* <OrbitControls /> */}
      </Canvas>

      <div style={{ height: "30000px" }} />
    </>
  );
}

function PlanetWithRocket({ scrollY }) {
  const groupRef = useRef<THREE.Group>(null);
  const rocketRef = useRef<THREE.Mesh>(null);
  const planetRadius = 1.2;

  // Leva controls for rotation axis and speed
  const { axisX, axisY, axisZ, speed, cubeX, cubeY, cubeZ } = useControls({
    axisX: { value: 1, min: -1, max: 1, step: 0.01 }, // rotation direction
    axisY: { value: 0, min: -1, max: 1, step: 0.01 },
    axisZ: { value: 1, min: -1, max: 1, step: 0.01 },
    speed: { value: 0.001, min: 0.0001, max: 0.01, step: 0.0001 },
    cubeX: { value: -1, min: -2, max: 2, step: 0.01 }, // cube relative position
    cubeY: { value: -1, min: -2, max: 2, step: 0.01 },
    cubeZ: { value: 0, min: -2, max: 2, step: 0.01 },
  });

  useFrame(() => {
    if (!groupRef.current || !rocketRef.current) return;

    // rotation axis vector
    const axis = new THREE.Vector3(axisX, axisY, axisZ).normalize();

    // rotation angle proportional to scroll
    const angle = scrollY * speed;

    // rotate the entire planet+cube group
    groupRef.current.setRotationFromAxisAngle(axis, angle);

    // cube position relative to planet
    rocketRef.current.position.set(cubeX, cubeY, cubeZ);
  });

  return (
    <group ref={groupRef}>
      {/* Sphere */}
      <Sphere args={[planetRadius, 32, 32]}>
        <meshStandardMaterial color="#4477ff" wireframe />
      </Sphere>

      {/* Cube */}
      <Box ref={rocketRef} args={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial color="#ff5533" />
      </Box>
    </group>
  );
}
