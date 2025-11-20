import { useGLTF } from '@react-three/drei';
import { forwardRef } from 'react';

const SpaceShip = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('./Spaceship.glb');
  return (
    <group
      ref={ref} // attach ref here
      {...props}
      dispose={null}
      rotation={[Math.PI / 2, 0.12, -Math.PI / 1.5]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Spaceship_BarbaraTheBee.geometry}
        material={materials.Atlas}
        scale={100}
      />
    </group>
  );
});
//
export default SpaceShip;

useGLTF.preload('./Spaceship.glb');
