import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function PlanetDoubleRing(props) {
  const { nodes, materials } = useGLTF('./PlanetDoubleRing.glb');

  const groupRef = useRef();

  // Rotate the group on each frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6; // Adjust speed here
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Planet_7.geometry}
        material={materials.Atlas}
        scale={600}
      />
    </group>
  );
}

useGLTF.preload('/PlanetDoubleRing.glb');
