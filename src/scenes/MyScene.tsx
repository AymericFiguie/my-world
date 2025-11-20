import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PlanetRing } from '../components/PlanetRing';
import Orbiter from '../components/Orbiter';
import { PlanetDoubleRing } from '../components/PlanetDoubleRing';
import Starfield from '../components/Starfield';
import Lights from '../components/Lights';
import CameraController from '../controllers/CameraController';
import PlanetAndShip from '../components/PlanetAndShip';

const SCROLL_MAX = 3150;
const SCROLL_TAKE_OFF = 3500;

export default function MyScene() {
  // const ref = useRef();
  const shipRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 50, 70] }}
        style={{
          background: 'black',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        <CameraController
          shipRef={shipRef}
          scrollY={scrollY}
          camX={0}
          camY={30}
          camZ={40}
          targetX={0}
          targetY={25}
          targetZ={0}
          scrollTakeOff={SCROLL_TAKE_OFF}
        />
        <Suspense fallback={null}>
          <Starfield count={3000} radius={2000} size={3} color="white" />
          <Lights />
          {/* <Astronaut position={[0, 18.7, 0]} scale={2.1}/> */}
          <PlanetAndShip
            shipRef={shipRef}
            scrollMax={SCROLL_MAX}
            scrollTakeOff={SCROLL_TAKE_OFF}
            scrollY={scrollY}
          />
          <Orbiter radius={100} speed={0.3} axis={[0, 1, 0]} initialAngle={0}>
            <PlanetRing />
          </Orbiter>
          <Orbiter radius={100} speed={0.2} axis={[1, 1, 0]} initialAngle={0}>
            <PlanetDoubleRing />
          </Orbiter>
          {/* <OrbitControls ref={ref} target={[0, 0, 0]} /> */}
        </Suspense>
      </Canvas>
      <div style={{ height: '20000px' }} />
      <div>test</div>
    </>
  );
}
