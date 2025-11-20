import { useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute } from 'three';

interface StarFieldProps {
  count?: number;
  radius?: number;
  size?: number;
  color?: string;
}

export default function Starfield({
  count = 2000,
  radius = 1000,
  size = 0.5,
  color = 'white',
}: StarFieldProps) {
  const stars = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.random() * Math.PI * 2; // angle around Y
      const costheta = Math.random() * 2 - 1; // from -1 to 1
      const u = Math.random(); // random radius distribution

      const theta = Math.acos(costheta);
      const r = radius * Math.cbrt(u); // cube root for uniform distribution

      positions.push(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta),
      );
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    return geometry;
  }, [count, radius]);

  return (
    <points geometry={stars}>
      <pointsMaterial color={color} size={size} sizeAttenuation />
    </points>
  );
}
