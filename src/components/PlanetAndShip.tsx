import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';
import Planet from './Planet';
import SpaceShip from './SpaceShip';

interface PlanetAndShipProps {
  shipRef: any;
  scrollMax: number;
  scrollTakeOff: number;
  scrollY: number;
}

const PlanetAndShip = ({ shipRef, scrollMax, scrollTakeOff, scrollY }: PlanetAndShipProps) => {
  const planetShipGroup = useRef(null);

  const axis = new Vector3(1, 0, 1).normalize();
  const speed = 0.001;
  const takeOffSpeed = 0.02; // how fast the ship rises
  const shipStartPosition = new Vector3(1, -21.1, 1);

  useFrame(() => {
    if (!planetShipGroup.current || !shipRef.current) return;

    if (scrollY < scrollMax) {
      // Phase 1
      const angle = scrollY * speed;

      planetShipGroup.current.setRotationFromAxisAngle(axis, angle);

      shipRef.current.position.set(shipStartPosition.x, shipStartPosition.y, shipStartPosition.z);
    } else if (scrollY > scrollTakeOff) {
      // Phase 2
      // Freeze planet rotation at last angle
      const finalAngle = scrollMax * speed;
      planetShipGroup.current.setRotationFromAxisAngle(axis, finalAngle);

      // Calculate extra scroll past threshold
      //   const extra = scrollY - maxScroll;
      const extra = scrollY - scrollTakeOff; // start counting takeoff from takeOffScroll

      // Move ship upward along visual up
      const takeOffPos = shipStartPosition.clone();
      //   takeOffPos.y += Math.abs(extra * takeOffSpeed); // always rises
      takeOffPos.y = shipStartPosition.y - extra * takeOffSpeed;
      shipRef.current.position.copy(takeOffPos);
    }
  });

  return (
    <group ref={planetShipGroup} /* position={[0, 0, 0]} */>
      <SpaceShip ref={shipRef} />
      <Planet />
    </group>
  );
};

export default PlanetAndShip;
