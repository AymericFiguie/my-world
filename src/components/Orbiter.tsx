import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';

const Orbiter = ({
  radius = 10,
  speed = 1,
  center = [0, 0, 0],
  initialAngle = 0,
  axis = [0, 1, 0], // default Y-axis
  children,
}) => {
  const groupRef = useRef();
  const axisVec = new Vector3(...axis).normalize();
  const tempVec = new Vector3();
  const perpVec = new Vector3();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + initialAngle;

    // Create an arbitrary perpendicular vector to the axis
    if (axisVec.x === 0 && axisVec.z === 0) {
      // axis is vertical, use X as perpendicular
      perpVec.set(1, 0, 0);
    } else {
      // any other axis, cross with Y to get perpendicular
      perpVec.set(0, 1, 0).cross(axisVec).normalize();
    }

    // Rotate the perpendicular vector around the axis by angle t
    tempVec.copy(perpVec).applyAxisAngle(axisVec, t).multiplyScalar(radius);

    // Position relative to center
    groupRef.current.position.set(
      center[0] + tempVec.x,
      center[1] + tempVec.y,
      center[2] + tempVec.z,
    );
  });

  return <group ref={groupRef}>{children}</group>;
};

export default Orbiter;
