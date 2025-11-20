import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function PlanetRing(props) {
  const { nodes, materials } = useGLTF('./PlanetRing.glb');

  const groupRef = useRef();

  // Rotate the group on each frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6; // Adjust speed here
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null} /* position={[60, 80, -200]} */>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Planet_10.geometry}
        material={materials.Atlas}
        scale={600}
      />
    </group>
  );
}

useGLTF.preload('/PlanetRing.glb');
