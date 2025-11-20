import { useGLTF } from '@react-three/drei';

export default function Planet(props) {
  const { nodes, materials } = useGLTF('./Planet.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Planet_6.geometry}
        material={materials.Atlas}
        scale={1000}
        // scale={100}
      />
    </group>
  );
}

useGLTF.preload('/Planet.glb');
